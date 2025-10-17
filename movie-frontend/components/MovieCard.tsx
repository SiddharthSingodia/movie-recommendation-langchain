// "use client";
// import { useUser } from "@clerk/nextjs";
// import { addToWatchlist } from "@/utils/watchlist";
// import Image from "next/image";
// import { logInteraction } from "@/utils/interactions";

// interface MovieCardProps {
//   title: string;
//   poster: string | null;
//   movie_id?: string;
// }

// export default function MovieCard({ title, poster, movie_id }: MovieCardProps) {
//   const { user } = useUser();
//   const defaultPoster = 'https://via.placeholder.com/150x225?text=No+Poster';

//   const imageUrl = (() => {
//     if (!poster) return defaultPoster;
//     return poster.startsWith('http') ? poster : `https://image.tmdb.org/t/p/w200${poster}`;
//   })();

//   async function handleAdd(e: React.MouseEvent) {
//     e.stopPropagation(); // Prevent triggering parent click events
    
//     if (!user) {
//       alert("Please sign in to save movies.");
//       return;
//     }

//     const response = await addToWatchlist(user.id, {
//       id: Number(movie_id) || Date.now(),
//       title,
//       poster_path: poster || ''
//     });
    
//     if (response.success) alert("Added to watchlist!");
//     else alert("Failed: " + response.error);
//   }

//   const handleMovieClick = () => {
//     // Open TMDB page for this movie
//     if (movie_id) {
//       window.open(`https://www.themoviedb.org/movie/${movie_id}`, '_blank');
//     }
//   };

//   return (
//     <div 
//       className="relative group cursor-pointer overflow-hidden rounded-xl transition-all duration-300 hover:scale-105"
//       onClick={handleMovieClick}
//     >
//       <div className="aspect-[2/3] relative">
//         <Image
//           src={imageUrl}
//           alt={title}
//           fill
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//           className="object-cover rounded-xl"
//           onError={(e) => {
//             // Fallback to placeholder if image fails to load
//             const target = e.target as HTMLImageElement;
//             target.src = defaultPoster;
//           }}
//         />
//         {/* Overlay that appears on hover */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
//           <h3 className="text-lg font-semibold text-white">{title}</h3>
//           <button
//             onClick={handleAdd}
//             className="mt-2 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-medium px-3 py-1.5 rounded-md text-sm transition-colors"
//           >
//             + Add to Watchlist
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// // interface MovieCardProps {
// //   title: string;
// //   poster: string;
// // }

// // export default function MovieCard({ title, poster }: MovieCardProps) {
// //   return (
// //     <div className="flex flex-col items-center p-3">
// //       <img
// //         src={poster || "/placeholder.jpg"}
// //         alt={title}
// //         className="w-40 h-60 object-cover rounded-xl shadow-lg"
// //       />
// //       <p className="mt-2 text-center text-sm font-semibold">{title}</p>
// //     </div>
// //   );
// // }


"use client";
import { useUser } from "@clerk/nextjs";
import { addToWatchlist } from "@/utils/watchlist";
import Image from "next/image";

interface MovieCardProps {
  title: string;
  poster: string | null;
  movie_id?: string | number;
}

export default function MovieCard({ title, poster, movie_id }: MovieCardProps) {
  const { user } = useUser();
  const defaultPoster = "https://via.placeholder.com/150x225?text=No+Poster";

  const imageUrl = poster
    ? poster.startsWith("http")
      ? poster
      : `https://image.tmdb.org/t/p/w200${poster}`
    : defaultPoster;

  async function handleAdd(e: React.MouseEvent) {
    e.stopPropagation(); // prevent triggering TMDB redirect

    if (!user) {
      alert("Please sign in to save movies.");
      return;
    }

    const response = await addToWatchlist(user.id, {
      id: Number(movie_id) || Date.now(),
      title,
      poster_path: poster || "",
    });

    if (response.success) alert("Added to watchlist!");
    else alert("Failed: " + response.error);
  }

  const handleMovieClick = (e: React.MouseEvent) => {
    e.preventDefault(); // stop Next.js routing
    e.stopPropagation();

    if (!movie_id) {
      console.warn("No movie_id provided for:", title);
      return;
    }

    const tmdbUrl = `https://www.themoviedb.org/movie/${movie_id}`;
    window.open(tmdbUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="relative group cursor-pointer overflow-hidden rounded-xl transition-all duration-300 hover:scale-105"
      onClick={handleMovieClick}
    >
      <div className="aspect-[2/3] relative">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-xl"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = defaultPoster;
          }}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            onClick={handleAdd}
            className="mt-2 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-medium px-3 py-1.5 rounded-md text-sm transition-colors"
          >
            + Add to Watchlist
          </button>
        </div>
      </div>
    </div>
  );
}
