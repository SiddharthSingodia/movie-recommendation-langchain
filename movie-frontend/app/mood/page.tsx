"use client";

import { useState } from "react";
import Image from "next/image";
import { useUser, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { addToWatchlist } from "@/utils/watchlist";
import { logInteraction } from "@/utils/interactions";

// TMDB API key
const TMDB_API_KEY = "8265bd1679663a7ea12ac168da84d2e8";

export default function MoodRecommender() {
  const { user } = useUser();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch movie poster from TMDB
  async function fetchPoster(movieId: number) {
    try {
      const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`;
      const response = await fetch(url);

      if (!response.ok) throw new Error(`TMDB API error: ${response.status}`);

      const data = await response.json();
      const posterPath = data.poster_path;
      return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : null;
    } catch (error) {
      console.error(`Error fetching poster for movie ID ${movieId}:`, error);
      return null;
    }
  }

  async function handleSearch() {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/recommend/vector", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      // Fetch poster for each movie if missing
      const moviesWithPosters = await Promise.all(
        data.map(async (movie: any) => {
          if (!movie.poster_path && movie.id) {
            const posterUrl = await fetchPoster(movie.id);
            return { ...movie, poster_path: posterUrl };
          }
          return movie;
        })
      );

      setResults(moviesWithPosters);

      // Log interaction
      if (user) {
        await logInteraction(user.id, 0, "mood_search", { metadata: { query } });
      }
    } catch (error) {
      console.error("Error searching by mood:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddToWatchlist = async (movie: any) => {
    if (!user) return alert("Please sign in to save movies.");
    try {
      const response = await addToWatchlist(user.id, {
        id: movie.id || Date.now(),
        title: movie.title,
        poster_path: movie.poster_path || "",
      });
      if (response.success) alert("Added to watchlist!");
      else alert("Failed: " + response.error);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  return (
    <>
      <SignedIn>
        <main className="min-h-screen bg-gradient-to-b from-navy-base via-[#4C0519] to-[#1E1B4B] text-white">
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              🎬 Mood-based Movie Recommender
            </h1>

            <div className="max-w-3xl mx-auto bg-black/30 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/10 mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-center">Describe Your Perfect Movie Night</h2>

              <div className="flex flex-col items-center gap-4 mb-6">
                <textarea
                  className="w-full bg-white/10 border border-white/20 text-white rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-white/50 min-h-[120px]"
                  placeholder="Describe your mood or the type of movie you want to watch..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  onClick={handleSearch}
                  disabled={loading || !query.trim()}
                  className="mt-2 w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/30 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Finding Movies..." : "Find Movies"}
                </button>
              </div>
            </div>

            {results.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-6 text-center">Movies For Your Mood</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {results.map((movie) => {
  const posterUrl = movie.poster_path
    ? movie.poster_path.startsWith("http")
      ? movie.poster_path
      : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  const tmdbUrl = `https://www.themoviedb.org/movie/${movie.id}`;

  return (
    <div
      key={movie.id}
      className="relative group cursor-pointer rounded-xl overflow-hidden bg-black/20 border border-white/10 shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105"
      onClick={() => window.open(tmdbUrl, "_blank")}
    >
      <div className="aspect-[2/3] relative">
        <Image src={posterUrl} alt={movie.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent redirect when clicking the button
              handleAddToWatchlist(movie);
            }}
            className="mt-2 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-medium px-3 py-1.5 rounded-md text-sm transition-colors"
          >
            + Add to Watchlist
          </button>
        </div>
      </div>
    </div>
  );
})}

                </div>
              </div>
            )}
          </div>
        </main>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
