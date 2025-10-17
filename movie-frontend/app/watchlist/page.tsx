"use client";
import { useEffect, useState } from "react";
import { useUser, RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { getWatchlist } from "@/utils/watchlist";
import api from "@/utils/api";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function WatchlistPage() {
  const { user } = useUser();
  const router = useRouter();
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (user) {
        setIsLoading(true);
        try {
          const res = await api.get(`/watchlist/${user.id}`);
          setWatchlist(res.data.data ?? []);
        } catch (e) {
          console.error(e);
          const movies = await getWatchlist(user.id);
          setWatchlist(movies);
        } finally {
          setIsLoading(false);
        }
      }
    }
    load();
  }, [user]);

  const handleMovieClick = (movieId: string) => {
    router.push(`/movie/${movieId}`);
  };

  if (!user) return <RedirectToSignIn />;

  return (
    <>
      <SignedIn>
        <main className="min-h-screen bg-gradient-to-b from-navy-base via-[#4C0519] to-[#1E1B4B] text-white">
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              🎬 Your Watchlist
            </h1>
            
            <div className="max-w-5xl mx-auto bg-black/30 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/10">
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : watchlist.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-5xl mb-4">🍿</div>
                  <h2 className="text-2xl font-semibold mb-2">Your watchlist is empty</h2>
                  <p className="text-white/70 mb-6">Discover movies and add them to your watchlist</p>
                  <button 
                    onClick={() => router.push('/dashboard')}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/30 font-medium"
                  >
                    Explore Movies
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {watchlist.map((movie) => {
                    const defaultPoster = 'https://via.placeholder.com/150x225?text=No+Poster';
                    const poster = movie?.poster as string | null;
                    const imageUrl = poster
                      ? (poster.startsWith('http') ? poster : `https://image.tmdb.org/t/p/w200${poster}`)
                      : defaultPoster;
                    return (
                      <div 
                        key={movie.id} 
                        className="relative group cursor-pointer rounded-xl overflow-hidden bg-black/20 border border-white/10 shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105"
                        onClick={() => handleMovieClick(movie.movie_id)}
                      >
                        <div className="aspect-[2/3] relative">
                          <Image
                            src={imageUrl}
                            alt={movie.movie_title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                            <h3 className="text-lg font-semibold text-white">{movie.movie_title}</h3>
                            <p className="text-xs text-white/70 mt-1">Added to watchlist</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </main>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
