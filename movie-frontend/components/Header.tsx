"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900">Movie Recommender</Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">Dashboard</Link>
          <Link href="/watchlist" className="text-gray-700 hover:text-gray-900">Watchlist</Link>
        </nav>

        <div className="flex items-center">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in" className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm">Sign In</Link>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}


