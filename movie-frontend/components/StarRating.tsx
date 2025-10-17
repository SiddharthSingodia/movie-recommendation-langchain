"use client";

import { useState } from "react";

export default function StarRating({ onRate }: { onRate: (rating: number) => void }) {
  const [rating, setRating] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => {
            setRating(star);
            onRate(star);
          }}
          className="text-xl"
        >
          {star <= rating ? "★" : "☆"}
        </button>
      ))}
    </div>
  );
}
