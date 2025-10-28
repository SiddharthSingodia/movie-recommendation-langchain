

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

function MovieCard({ title, overview, poster_path, id }: Movie) {
  return (
    <div className="group flex-shrink-0 w-64 md:w-72 snap-start relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-lg border border-border transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 mx-2">
      <div className="relative h-80 w-full overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          width={600}
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold font-display text-text-primary line-clamp-1">
          {title}
        </h3>
        <p className="mt-2 text-sm text-text-muted flex-grow line-clamp-2">
          {overview || "No description available."}
        </p>
        <a
          href={`https://www.themoviedb.org/movie/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full text-center py-2 px-4 text-sm font-semibold rounded-lg bg-gradient-to-r from-primary to-purple-accent text-primary-foreground shadow-md hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105"
        >
          View on TMDB
        </a>
      </div>
    </div>
  );
}

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US&page=1`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      }
    };
    fetchMovies();
  }, []);

  return (
    <section className="w-full py-20 lg:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Heading Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight text-text-primary">
            Discover{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-purple-accent text-transparent bg-clip-text">
              New Movies
            </span>
          </h2>
          <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
            Dive into a world of cinema — explore trending films, timeless
            classics, and hidden gems chosen just for you.
          </p>
        </div>

        {/* Movie Scroll Row */}
        {movies.length > 0 ? (
          <div className="flex overflow-x-auto snap-x snap-mandatory pb-6 hide-scrollbar">
            {movies.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        ) : (
          <p className="text-center text-text-muted mt-10">
            Loading latest movies...
          </p>
        )}

        {/* Footer Button */}
        <div className="mt-16 text-center">
          <button
            onClick={() => window.open("https://www.themoviedb.org/movie", "_blank")}
            className="px-8 py-3 text-base font-semibold rounded-lg bg-gradient-to-r from-primary to-purple-accent text-primary-foreground shadow-lg hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105"
          >
            Discover More Movies
          </button>
        </div>
      </div>
    </section>
  );
}
