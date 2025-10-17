"use client";
import { useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";
export default function TestSupabase() {
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("watchlists").select("*").limit(1);
      console.log("SUPABASE TEST", { data, error });
    })();
  }, []);
  return <div>Check console for Supabase test</div>;
}
