// utils/interactions.ts
import { supabase } from "./supabaseClient";

export type InteractionAction = "watchlist" | "clicked" | "rated" | string;

export interface Interaction {
  user_id: string;
  movie_id: number;
  action: InteractionAction;
  rating?: number | null;
  metadata?: Record<string, any> | null;
  created_at?: string;
}

export async function logInteraction(
  userId: string,
  movieId: number,
  action: InteractionAction,
  opts?: { rating?: number; metadata?: Record<string, any> }
) {
  try {
    const payload: Partial<Interaction> = {
      user_id: userId,
      movie_id: movieId,
      action,
      rating: opts?.rating ?? null,
      metadata: opts?.metadata ?? null,
    };

    const { data, error } = await supabase.from("user_interactions").insert([payload]);

    if (error) {
      console.error("logInteraction error:", error);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (e) {
    console.error("logInteraction exception:", e);
    return { success: false, error: e };
  }
}
