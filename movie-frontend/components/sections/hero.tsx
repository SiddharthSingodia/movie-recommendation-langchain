"use client";

import * as React from "react";
import Typewriter from "typewriter-effect";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HeroSection = () => {
  // A high-quality, fitting Unsplash image as a replacement for the background.
  const backgroundImageUrl = "https://images.unsplash.com/photo-1505881502442-53699417188e?q=80&w=2574&auto=format&fit=crop";

  return (
    <section
      className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center justify-center py-24 sm:py-32 overflow-hidden"
      style={{
        backgroundImage: `url("${backgroundImageUrl}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-navy-base/60 via-black/50 to-navy-base/80 z-10" />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <h1 className="font-display text-5xl md:text-6xl lg:text-hero-display font-extrabold text-text-primary tracking-tighter leading-tight">
              Discover
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 inline-block min-h-[1.5em]">
                <Typewriter
                  options={{
                    strings: ["Movies!", "Genres!", "Classics!", "Blockbusters!"],
                    autoStart: true,
                    loop: true,
                    wrapperClassName: "inline-block",
                    cursorClassName: "text-pink-primary text-5xl md:text-6xl lg:text-hero-display"
                  }}
                />
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-text-secondary-alt max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Get personalized movie recommendations powered by AI. Find your next favorite film based on your taste and discover hidden cinematic gems.
            </p>
          </div>

          <div className="flex-1 w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 space-y-6 border border-white/20">
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Ex: The Dark Knight, Inception, Avatar"
                  className="w-full px-4 h-12 text-base bg-white/90 text-slate-900 placeholder:text-slate-500 border-none rounded-xl focus-visible:ring-2 focus-visible:ring-pink-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition-all"
                />

                <Select defaultValue="all">
                  <SelectTrigger className="w-full px-4 h-12 text-base bg-white/20 text-white border border-white/30 rounded-xl focus:ring-2 focus:ring-pink-primary focus:ring-offset-2 focus:ring-offset-slate-900 transition-all">
                    <SelectValue placeholder="All Genres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genres</SelectItem>
                    <SelectItem value="action">Action</SelectItem>
                    <SelectItem value="comedy">Comedy</SelectItem>
                    <SelectItem value="drama">Drama</SelectItem>
                    <SelectItem value="horror">Horror</SelectItem>
                    <SelectItem value="romance">Romance</SelectItem>
                    <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                    <SelectItem value="thriller">Thriller</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="w-full h-12 text-lg font-semibold text-primary-foreground bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] shadow-lg hover:shadow-pink-500/40 focus:outline-none focus:ring-4 focus:ring-pink-500/50">
                  Search
                </Button>
              </div>

              <div className="pt-4 border-t border-white/20">
                <p className="text-sm font-medium text-white/80 mb-3">
                  Popular Genres:
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Action", "Comedy", "Drama"].map((filter) => (
                    <Button
                      key={filter}
                      variant="ghost"
                      className="px-3 py-2 h-auto bg-white/20 text-white/90 text-sm font-semibold rounded-lg transition-all duration-300 backdrop-blur-sm shadow-sm hover:shadow-md hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600"
                    >
                      {filter}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;