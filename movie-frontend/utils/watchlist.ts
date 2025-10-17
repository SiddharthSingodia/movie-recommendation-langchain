import { supabase } from "./supabaseClient";

export async function addToWatchlist(userId: string, movie: { id: number; title: string; poster_path: string }) {
  const { data, error } = await supabase
    .from("watchlists")
    .insert([
      {
        user_id: userId,
        movie_id: movie.id,
        movie_title: movie.title,
        poster: movie.poster_path,
        added_at: new Date().toISOString(),
      },
    ]);

  if (error) {
    console.error("Error adding to watchlist:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function getWatchlist(userId: string) {
  const { data, error } = await supabase
    .from("watchlists")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching watchlist:", error.message);
    return [];
  }

  return data;
}

export async function removeFromWatchlist(userId: string, movieId: number) {
  const { error } = await supabase
    .from("watchlists")
    .delete()
    .eq("user_id", userId)
    .eq("movie_id", movieId);

  if (error) {
    console.error("Error removing from watchlist:", error.message);
    return { success: false, error: error.message };
  }
  return { success: true };
}
