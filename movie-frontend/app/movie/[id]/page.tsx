"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import { logInteraction } from "@/utils/interactions";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_url: string;
  release_date: string;
}

export default function MovieDetailPage() {
  const { id } = useParams();
  const { user } = useUser();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [rating, setRating] = useState<number | null>(null);

  // Fetch movie details from Flask API
  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/${id}`);
      const data = await res.json();
      setMovie(data);
    }
    fetchMovie();
  }, [id]);

  // Add to watchlist
  async function handleAddToWatchlist() {
    if (!user || !movie) return;

    const { error } = await supabase.from("watchlists").insert([
      { user_id: user.id, movie_id: movie.id },
    ]);

    if (error) console.error("Watchlist insert error:", error);

    await logInteraction(user.id, movie.id, "watchlist", {
      metadata: { source: "movie_detail" },
    });
  }

  // Rate movie
  async function handleRating(value: number) {
    setRating(value);
    if (user && movie) {
      await logInteraction(user.id, movie.id, "rated", {
        rating: value,
        metadata: { source: "movie_detail" },
      });
    }
  }

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <img
        src={movie.poster_url}
        alt={movie.title}
        className="w-60 rounded-lg shadow-lg mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <p className="text-gray-700 mb-4">{movie.overview}</p>
      <p className="text-sm text-gray-500 mb-6">
        Release Date: {movie.release_date}
      </p>

      <button
        onClick={handleAddToWatchlist}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Add to Watchlist
      </button>

      <div className="mt-6">
        <p className="font-semibold mb-2">Rate this movie:</p>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            className={`px-3 py-1 border rounded-lg mx-1 ${
              rating === n ? "bg-yellow-400" : ""
            }`}
            onClick={() => handleRating(n)}
          >
            {n}⭐
          </button>
        ))}
      </div>
    </div>
  );
}
