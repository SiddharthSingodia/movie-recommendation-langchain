"use client";

import { useState, FC, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton, SignIn, SignUp } from "@clerk/nextjs";
import {
  ChevronDown,
  Music,
  Globe,
  Sun,
  Moon,
  Menu,
  X,
  LogIn,
} from "lucide-react";

// Data for navigation links
const bookingLinks = [
  { href: "/ticket", label: "Ticket" },
  { href: "/hotels", label: "Hotels" },
  { href: "/packages", label: "Packages" },
  { href: "/rentals", label: "Rentals" },
  { href: "/visa-checker", label: "Visa" },
  { href: "/booking-history", label: "Booking History" },
];

const supportLinks = [
  { href: "/travel-plan-generator", label: "Travel Plans" },
  { href: "/custom-itinerary", label: "Custom Travel Itinerary" },
  { href: "/guides", label: "Guide" },
  { href: "/contact", label: "Contact" },
];

const toolsLinks = [
  { href: "/packing-checklist", label: "Packing Checklist" },
  { href: "/trip-calculator", label: "Trip Expense Calculator" },
  { href: "/recommendation", label: "Travel Recommendations" },
  { href: "/enhanced-currency", label: "Enhanced Currency Converter" },
  { href: "/itinerary-map", label: "Map" },
  { href: "/mood-board", label: "AI Mood Board" },
  { href: "/ai-travel-planner", label: "AI Travel Planner" },
  { href: "/music", label: "Music" },
  { href: "/feedback", label: "Feedback" },
];

interface NavDropdownProps {
  label: string;
  links: { href: string; label: string }[];
}

const NavDropdown: FC<NavDropdownProps> = ({ label, links }) => (
  <div className="relative group">
    <button
      aria-label={label}
      className="py-1.5 px-2 text-sm font-medium rounded-sm transition-all duration-300 flex items-center gap-1 hover:text-pink-500 hover:shadow-sm text-gray-200"
    >
      {label}+
      <ChevronDown className="w-4 h-4 transition-transform duration-400 group-hover:rotate-180" />
    </button>
    <div className="absolute left-0 mt-0 top-full opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 z-50 p-2 min-w-[200px] max-w-[280px] rounded-lg shadow-lg bg-slate-800 text-white border border-slate-700">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="py-2 px-2 text-sm hover:bg-gradient-to-r from-pink-500 to-pink-600 hover:text-white block transition-all rounded-md duration-200 break-words"
        >
          {link.label}
        </Link>
      ))}
    </div>
  </div>
);

interface MobileCollapsibleProps {
    label: string;
    children: ReactNode;
}

const MobileCollapsible: FC<MobileCollapsibleProps> = ({label, children}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex flex-col">
            <button onClick={() => setIsOpen(!isOpen)} className="py-2 px-3 w-full flex justify-between items-center rounded hover:bg-pink-500/10 transition-all duration-200">
                <span className="font-medium break-words text-sm">{label}</span>
                <span className={`text-xl flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
            </button>
            {isOpen && (
                <div className="pl-6 pt-2 flex flex-col gap-2">
                    {children}
                </div>
            )}
        </div>
    )
}

const Navigation = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const pathname = "/"; // Assuming this is passed or derived from usePathname()

  return (
    <>
      <nav className="box-border w-full fixed top-0 left-0 z-50 h-20 backdrop-blur-md border-b transition-all duration-300 pr-4 sm:pr-6 pl-0 bg-navy-base/[.8] border-slate-700 text-white shadow-md">
        <div className="w-full max-w-full mx-auto flex justify-between items-center gap-6 px-2 py-4.5 h-full">
          <Link href="/" className="flex items-center gap-1 font-bold tracking-tight transition-colors duration-200 flex-shrink-0">
              <Image
                alt="TravelGrid Logo"
                className="w-7 h-7 sm:w-8 sm:h-8 mx-1 sm:mx-2 rounded-full border border-pink-300 shadow-md flex-shrink-0"
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ab61a626-fad4-4b16-bb27-262199b58876-travel-grid-vercel-app/assets/icons/logo-6.jpg?"
                width={32}
                height={32}
              />
              <span className="text-base sm:text-lg md:text-xl font-bold whitespace-nowrap">
                  MovieGrid
              </span>
          </Link>

          <div className="hidden md:flex items-center gap-1.5 flex-1 justify-center text-gray-200">
            <Link href="/" className={`py-1.5 px-2 text-sm font-medium rounded-sm hover:text-pink-500 hover:shadow-sm transition-all duration-300 ${pathname === "/" ? 'bg-gradient-to-r from-pink-700 to-pink-500 shadow-md text-white hover:text-white' : 'text-gray-200'}`}>Home</Link>
            <Link href="/dashboard" className="py-1.5 px-2 text-sm font-medium rounded-sm hover:text-pink-500 hover:shadow-sm transition-all duration-300 text-gray-200">Dashboard</Link>
            <Link href="/watchlist" className="py-1.5 px-2 text-sm font-medium rounded-sm hover:text-pink-500 hover:shadow-sm transition-all duration-300 text-gray-200">My Watchlist</Link>
            {/* <NavDropdown label="Booking" links={bookingLinks} /> */}
            {/* <NavDropdown label="Support" links={supportLinks} /> */}
            {/* <NavDropdown label="Tools" links={toolsLinks} /> */}
            <Link href="http://localhost:3000/mood" className="py-1.5 px-2 text-sm font-medium rounded-sm hover:text-pink-500 hover:shadow-sm transition-all duration-300 text-gray-200">Mood AI</Link>
          </div>
          
          <div className="hidden md:flex gap-3 items-center font-medium">
            <button className="flex items-center gap-2 px-3 py-2 backdrop-blur-sm border rounded-full transition-all duration-300 shadow-lg text-sm font-medium border-slate-700">
                <Music className="w-4 h-4 text-pink-400" />
                <div className="min-w-[80px] text-left">
                    <span className="animated-gradient-text">Set the Mood!</span>
                </div>
            </button>

            <div className="relative">
                <button className="flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 hover:bg-pink-500/20 text-gray-200 hover:text-white" aria-label="Select language">
                    <Globe className="lucide lucide-globe text-pink-500 w-4 h-4" />
                    <span className="text-lg mr-1">🇺🇸</span>
                    <span className="text-sm font-medium">English</span>
                    <ChevronDown className="lucide lucide-chevron-down w-3.5 h-3.5" />
                </button>
            </div>

            <button className="relative p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-white font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none" aria-label="Switch to light mode">
                <div className="relative w-5 h-5 flex items-center justify-center">
                    <Sun className="w-[18px] h-[18px] absolute transition-all duration-300 ease-in-out opacity-100 rotate-0 scale-100" />
                    <Moon className="w-[18px] h-[18px] absolute transition-all duration-300 ease-in-out opacity-0 -rotate-90 scale-0" />
                </div>
            </button>

             <SignedOut>
               <button onClick={() => setShowSignIn(true)} className="bg-primary hover:bg-pink-light text-primary-foreground px-3 py-2 rounded-md font-semibold hover:scale-105 transition-all text-sm whitespace-nowrap">Login</button>
               <button onClick={() => setShowSignUp(true)} className="bg-primary hover:bg-pink-light text-primary-foreground px-3 py-2 rounded-md font-semibold hover:scale-105 transition-all text-sm whitespace-nowrap">Sign Up</button>
             </SignedOut>
             <SignedIn>
               <UserButton 
                 appearance={{
                   elements: {
                     avatarBox: "w-8 h-8",
                     userButtonPopoverCard: "bg-slate-800 border-slate-700",
                     userButtonPopoverActionButton: "text-gray-200 hover:bg-pink-500/20",
                     userButtonPopoverActionButtonText: "text-gray-200",
                     userButtonPopoverFooter: "hidden"
                   }
                 }}
               />
             </SignedIn>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button className="relative p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-white font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none" aria-label="Switch to light mode">
                <div className="relative w-5 h-5 flex items-center justify-center">
                    <Sun className="w-[18px] h-[18px] absolute transition-all duration-300 ease-in-out opacity-100 rotate-0 scale-100" />
                    <Moon className="w-[18px] h-[18px] absolute transition-all duration-300 ease-in-out opacity-0 -rotate-90 scale-0" />
                </div>
            </button>
             <button onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu" className="text-pink-400 hover:text-pink-500 transition-colors duration-200 p-2 rounded-md hover:bg-pink-500/20 cursor-pointer flex-shrink-0">
                <Menu className="w-6 h-6" />
             </button>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-40 transition-opacity duration-300 md:hidden bg-black/50 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}></div>
      <div className={`fixed top-0 right-0 h-full w-[80vw] sm:w-[60vw] max-w-[320px] z-[1002] transition-transform duration-300 ease-in-out transform bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-gray-200 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 flex flex-col h-full overflow-y-auto">
            <div className="flex justify-end mb-6 border-b border-gray-600 pb-5"><button onClick={() => setIsMobileMenuOpen(false)} className="text-pink-500 hover:text-pink-400 p-1 rounded-md hover:bg-pink-500/10" aria-label="Close menu"><X className="w-6 h-6" /></button></div>
            <div className="flex flex-col gap-3 mb-6 pb-6 border-b border-gray-600">
                <div className="flex items-center justify-between px-3"><span className="text-sm font-medium text-gray-300">Mood Music</span><button className="flex items-center gap-2 px-3 py-2 backdrop-blur-sm border rounded-full transition-all duration-300 shadow-lg relative z-10 text-sm font-medium justify-center border-slate-700"><Music className="w-4 h-4 text-pink-400" /></button></div>
                <div className="flex items-center justify-between px-3"><span className="text-sm font-medium text-gray-300">Language</span><button className="flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 hover:bg-pink-500/20 text-gray-200 hover:text-white" aria-label="Select language"><Globe className="w-4 h-4 text-pink-500" /><span className="text-lg mr-1">🇺🇸</span><span className="text-sm font-medium">English</span><ChevronDown className="w-4 h-4" /></button></div>
            </div>
            <div className="flex flex-col gap-4 flex-grow">
                <Link href="/" className="py-2 px-3 font-medium rounded hover:bg-pink-500 transition-all duration-200 break-words text-sm">Home</Link>
                <Link href="/dashboard" className="py-2 px-3 font-medium rounded hover:bg-pink-500 transition-all duration-200 break-words text-sm">Dashboard</Link>
                <Link href="/watchlist" className="py-2 px-3 font-medium rounded hover:bg-pink-500 transition-all duration-200 break-words text-sm">My Watchlist</Link>
                <MobileCollapsible label="Booking">{bookingLinks.map(l => <Link key={l.href} href={l.href} className="py-1.5 px-3 text-sm rounded text-gray-300 hover:bg-pink-500/20 hover:text-white">{l.label}</Link>)}</MobileCollapsible>
                <MobileCollapsible label="Support">{supportLinks.map(l => <Link key={l.href} href={l.href} className="py-1.5 px-3 text-sm rounded text-gray-300 hover:bg-pink-500/20 hover:text-white">{l.label}</Link>)}</MobileCollapsible>
                <MobileCollapsible label="Tools">{toolsLinks.map(l => <Link key={l.href} href={l.href} className="py-1.5 px-3 text-sm rounded text-gray-300 hover:bg-pink-500/20 hover:text-white">{l.label}</Link>)}</MobileCollapsible>
                <Link href="/wishlist" className="py-2 px-3 font-medium rounded hover:bg-pink-500 transition-all duration-200 break-words text-sm">Wishlist</Link>
            </div>
            <div className="mt-6 flex flex-col gap-2">
                <SignedOut>
                  <button onClick={() => { setShowSignIn(true); setIsMobileMenuOpen(false); }} className="flex gap-2 items-center justify-center py-2 px-3 rounded font-medium hover:bg-pink-500 hover:text-white transition-all text-sm border border-pink-500 text-pink-500"><LogIn className="w-4 h-4" /> Login</button>
                  <button onClick={() => { setShowSignUp(true); setIsMobileMenuOpen(false); }} className="bg-gradient-to-b from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white py-2 px-3 rounded font-medium text-center mt-2 hover:shadow-lg hover:scale-105 transition-all text-sm">Sign Up</button>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center justify-center py-2 px-3">
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8",
                          userButtonPopoverCard: "bg-slate-800 border-slate-700",
                          userButtonPopoverActionButton: "text-gray-200 hover:bg-pink-500/20",
                          userButtonPopoverActionButtonText: "text-gray-200",
                          userButtonPopoverFooter: "hidden"
                        }
                      }}
                    />
                  </div>
                </SignedIn>
            </div>
        </div>
      </div>

      {/* Sign In Modal */}
      {showSignIn && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <button
              onClick={() => setShowSignIn(false)}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
            <div className="p-6">
              <SignIn 
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none border-none",
                    headerTitle: "text-2xl font-bold text-gray-900",
                    headerSubtitle: "text-gray-600",
                    socialButtonsBlockButton: "border border-gray-300 hover:bg-gray-50",
                    formButtonPrimary: "bg-pink-600 hover:bg-pink-700",
                    footerActionLink: "text-pink-600 hover:text-pink-700",
                    identityPreviewText: "text-gray-700",
                    formFieldInput: "border-gray-300 focus:border-pink-500 focus:ring-pink-500",
                    formFieldLabel: "text-gray-700"
                  }
                }}
                afterSignInUrl="/dashboard"
                redirectUrl="/dashboard"
              />
            </div>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignUp && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <button
              onClick={() => setShowSignUp(false)}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
            <div className="p-6">
              <SignUp 
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none border-none",
                    headerTitle: "text-2xl font-bold text-gray-900",
                    headerSubtitle: "text-gray-600",
                    socialButtonsBlockButton: "border border-gray-300 hover:bg-gray-50",
                    formButtonPrimary: "bg-pink-600 hover:bg-pink-700",
                    footerActionLink: "text-pink-600 hover:text-pink-700",
                    identityPreviewText: "text-gray-700",
                    formFieldInput: "border-gray-300 focus:border-pink-500 focus:ring-pink-500",
                    formFieldLabel: "text-gray-700"
                  }
                }}
                afterSignUpUrl="/dashboard"
                redirectUrl="/dashboard"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navigation;