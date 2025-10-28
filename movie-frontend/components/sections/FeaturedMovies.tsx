"use client";

import React from 'react';
import { Button } from "@/components/ui/button";

const featuredMovies = [
  {
    title: "Inception",
    genre: "Sci-Fi, Action",
    duration: "148 min",
    rating: "8.8/10",
    image: "/inception.jpg", // You can replace with actual movie images from your project
  },
  {
    title: "The Shawshank Redemption",
    genre: "Drama",
    duration: "142 min",
    rating: "9.3/10",
    image: "https://image.tmdb.org/t/p/original/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
  },
  {
    title: "The Dark Knight",
    genre: "Action, Crime, Drama",
    duration: "152 min",
    rating: "9.0/10",
    image: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    title: "Pulp Fiction",
    genre: "Crime, Drama",
    duration: "154 min",
    rating: "8.9/10",
    image: "https://image.tmdb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg"
  },
  {
    title: "The Godfather",
    genre: "Crime, Drama",
    duration: "175 min",
    rating: "9.2/10",
    image: "https://image.tmdb.org/t/p/original/hMTncCsOwZZCNOo5SBhE1wQKpid.jpg"
  }
];

interface MovieCardProps {
  image: string;
  title: string;
  genre: string;
  duration: string;
  rating: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ image, title, genre, duration, rating }) => (
  <div className="flex-shrink-0 w-72 md:w-80 rounded-2xl overflow-hidden group transform transition-transform duration-300 hover:-translate-y-2">
    <div
      className="relative h-96 bg-cover bg-center rounded-2xl border border-border-subtle shadow-lg transition-all duration-500 ease-in-out"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent rounded-2xl" />
      <div className="absolute bottom-0 left-0 p-5 text-white w-full">
        <h3 className="text-xl font-bold font-display">{title}</h3>
        <p className="text-sm text-text-secondary mt-1">{genre}</p>
        <div className="flex justify-between items-center mt-4 pt-2 border-t border-white/10">
          <span className="text-lg font-bold text-white">{rating}</span>
          <span className="text-sm text-text-muted">{duration}</span>
        </div>
      </div>
    </div>
  </div>
);

const FeaturedMovies = () => {
    return (
        <section className="relative py-20 lg:py-24 w-full overflow-hidden bg-gradient-to-b from-[#1E1B4B] to-[#4C0519]">
            <div className="absolute inset-0 bg-navy-base opacity-40"></div>
            <div className="relative container mx-auto px-4 text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-text-primary mb-4">
                    Featured{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-light to-purple-accent">
                        Movies
                    </span>
                </h2>
                <p className="text-body-lg text-text-secondary-alt max-w-3xl mx-auto mb-12">
                    Discover our handpicked selection of critically acclaimed films for your next movie night.
                </p>

                <div className="relative -mx-4">
                    <div className="absolute left-0 top-0 bottom-8 w-16 bg-gradient-to-r from-[#1E1B4B] to-transparent z-10 pointer-events-none hidden md:block"></div>
                    <div className="absolute right-0 top-0 bottom-8 w-16 bg-gradient-to-l from-[#1E1B4B] to-transparent z-10 pointer-events-none hidden md:block"></div>
                    <div className="flex overflow-x-auto space-x-6 md:space-x-8 pb-8 px-4 sm:px-6 lg:px-8 no-scrollbar">
                        {featuredMovies.map((movie, index) => (
                            <MovieCard key={index} {...movie} />
                        ))}
                    </div>
                </div>

                <div className="mt-12">
                    <Button
                        size="lg"
                        className="btn-text bg-gradient-to-r from-pink-primary to-purple-accent text-primary-foreground rounded-full py-3 px-8 sm:py-4 sm:px-10 shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-pink-primary/20 focus:outline-none focus:ring-4 focus:ring-pink-primary/50"
                    >
                        View All Movies →
                    </Button>
                </div>
            </div>
            {/* A utility class to hide scrollbar, assuming it's defined in a global css file like globals.css */}
            <style jsx global>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .no-scrollbar {
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */
              }
            `}</style>
        </section>
    );
};

export default FeaturedMovies;