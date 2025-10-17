"use client";

import { useUser, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../utils/api";
import MovieCard from "../../components/MovieCard";
import { supabase } from "../../utils/supabaseClient";
import { logInteraction } from "../../utils/interactions";

export default function Dashboard() {
  const { user } = useUser();
  const router = useRouter();

  const [movie, setMovie] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [allMovies, setAllMovies] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    async function loadMovies() {
      try {
        const res = await api.get("/movies");
        setAllMovies(res.data.data || []);
      } catch (e) {
        console.error("Failed to load movies list", e);
      }
    }
    loadMovies();
  }, []);

  const filtered = useMemo(() => {
    const q = movie.trim().toLowerCase();
    if (!q) return allMovies;
    return allMovies.filter((m: any) => m.title.toLowerCase().includes(q));
  }, [movie, allMovies]);

  const getRecommendations = async () => {
    if (!movie || !user) return;
    setLoading(true);
    try {
      const res = await api.post("/recommend", { movie, user_id: user.id });
      setRecommendations(res.data.recommendations);
      await logInteraction(user.id, 0, "requested_recommendations", { metadata: { query: movie } });
    } catch (err) {
      console.error("Recommendation error:", err);
    }
    setLoading(false);
  };

  const addToWatchlist = async (m: any) => {
    if (!user) return;
    const { data, error } = await supabase.from("watchlists").insert([
      { user_id: user.id, movie_id: m.movie_id, movie_title: m.title, poster: m.poster, added_at: new Date().toISOString() },
    ]);
    if (error) {
      console.error("Watchlist insert error:", error);
      return;
    }
    await logInteraction(user.id, m.movie_id, "watchlist", { metadata: { source: "dashboard" } });
  };

  const handleMovieClick = async (m: any, index: number) => {
    if (user) {
      await logInteraction(user.id, m.movie_id, "clicked", { metadata: { block: "recommendations", position: index } });
    }
    router.push(`/movie/${m.movie_id}`);
  };

  return (
    <>
      <SignedIn>
        <main className="min-h-screen bg-gradient-to-b from-navy-base via-[#4C0519] to-[#1E1B4B] text-white">
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">🎬 Your Movie Dashboard</h1>
            
            <div className="max-w-3xl mx-auto bg-black/30 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/10 mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-center">Discover Your Next Favorite Movie</h2>
              
              <div className="flex flex-col items-center gap-4 mb-6 relative">
                <div className="flex flex-col sm:flex-row w-full gap-3">
                  <div className="relative flex-grow">
                    <input
                      value={movie}
                      onChange={(e) => { setMovie(e.target.value); setShowDropdown(true); }}
                      onFocus={() => setShowDropdown(true)}
                      onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                      placeholder="Enter a movie title..."
                      className="w-full bg-white/10 border border-white/20 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-white/50"
                    />
                    {showDropdown && filtered.length > 0 && (
                      <div className="absolute top-full mt-1 z-10 w-full bg-[#1E1B4B] border border-white/20 rounded-lg shadow-xl max-h-96 overflow-auto">
                        {filtered.map((m: any, i: number) => (
                          <button
                            key={`${m.movie_id}-${i}`}
                            className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors border-b border-white/10 last:border-0"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => { setMovie(m.title); setShowDropdown(false); }}
                          >
                            {m.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={getRecommendations}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/30 font-medium"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Finding Movies...
                      </span>
                    ) : "Get Recommendations"}
                  </button>
                </div>
              </div>
            </div>

            {recommendations.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-6 text-center">Recommended For You</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {recommendations.map((m, i) => (
                    // <div 
                    //   key={i} 
                    //   className="relative group cursor-pointer rounded-xl overflow-hidden bg-black/20 border border-white/10 shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105" 
                    //   onClick={() => handleMovieClick(m, i)}
                    // >
                    //   <MovieCard title={m.title} poster={m.poster} movie_id={m.movie_id?.toString?.() ?? undefined} />
                    //   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    //     <h3 className="text-lg font-semibold text-white">{m.title}</h3>
                    //     <button
                    //       onClick={(e) => { e.stopPropagation(); addToWatchlist(m); }}
                    //       className="mt-2 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-medium px-3 py-1.5 rounded-md text-sm transition-colors"
                    //     >
                    //       + Add to Watchlist
                    //     </button>
                    //   </div>
                    // </div>
                    <div 
                    className="relative group rounded-xl overflow-hidden bg-black/20 border border-white/10 shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105"
                    key={i} 
                       >
                    <MovieCard title={m.title} poster={m.poster} movie_id={m.movie_id?.toString?.() ?? undefined} />
                   </div>

                  ))}
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


