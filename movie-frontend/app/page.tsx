// "use client";

// import Link from "next/link";
// import { SignedIn, SignedOut } from "@clerk/nextjs";

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-gray-50 p-8">
//       <h1 className="text-3xl font-bold text-center mb-3 text-gray-900">🎬 Movie Recommender</h1>
//       <p className="text-center text-gray-700 mb-8">Discover movies tailored to your taste.</p>

//       <div className="flex justify-center">
//         <SignedIn>
//           <Link href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md">Go to Dashboard</Link>
//         </SignedIn>
//         <SignedOut>
//           <Link href="/sign-in" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md">Sign in to start</Link>
//         </SignedOut>
//       </div>
//     </main>
//   );
// }
import Navigation from "@/components/sections/navigation";
import HeroSection from "@/components/sections/hero";
import FeaturesSection from "@/components/sections/features";
import FeaturedMovies from "@/components/sections/FeaturedMovies";

import Testimonials from "@/components/sections/testimonials";
import CommunityForum from "@/components/sections/community-forum";
import NewMovies from "@/components/sections/NewMovies";

import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-base via-[#4C0519] to-[#1E1B4B]">
      <Navigation />
      
      <main className="pt-20">
        <HeroSection />
        
        <FeaturesSection />

        <FeaturedMovies />

        <Testimonials />
        
        <CommunityForum />

        <NewMovies />

        {/* <MoodBoardCta /> */}
      </main>
      
      <Footer />
    </div>
  );
}