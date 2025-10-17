// "use client";

// import React, { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import {
//   Twitter,
//   Linkedin,
//   Github,
//   Instagram,
//   Mail,
//   MapPin,
//   Phone,
//   Lock,
//   MessageCircle,
// } from 'lucide-react';

// const Footer = () => {
//     const [email, setEmail] = useState('');

//     return (
//         <footer className="bg-[#0f1419] text-white relative">
//             <div className="container mx-auto px-6 lg:px-8 py-20">
//                 <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
//                     {/* Column 1: Brand & Socials */}
//                     <div>
//                         <div className="flex items-center gap-3 mb-4">
//                             <Image
//                                 src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ab61a626-fad4-4b16-bb27-262199b58876-travel-grid-vercel-app/assets/icons/logo-6.jpg?"
//                                 alt="TravelGrid Logo"
//                                 width={36}
//                                 height={36}
//                                 className="rounded-full"
//                             />
//                             <span className="text-2xl font-bold font-display">TravelGrid</span>
//                         </div>
//                         <p className="text-gray-400 text-sm leading-relaxed">
//                             Discover amazing destinations and create unforgettable memories with our curated travel experiences around the world. Your journey starts here.
//                         </p>
//                         <div className="flex space-x-4 mt-6">
//                             <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
//                             <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
//                             <a href="#" aria-label="GitHub" className="text-gray-400 hover:text-white transition-colors"><Github size={20} /></a>
//                             <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
//                             <a href="#" aria-label="Email" className="text-gray-400 hover:text-white transition-colors"><Mail size={20} /></a>
//                         </div>
//                     </div>

//                     {/* Column 2: Quick Links */}
//                     <div>
//                         <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
//                         <ul className="space-y-3 text-sm">
//                             <li><Link href="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link></li>
//                             <li><Link href="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link></li>
//                             <li><Link href="/packages" className="text-gray-400 hover:text-primary transition-colors">Trips</Link></li>
//                             <li><Link href="/forums" className="text-gray-400 hover:text-primary transition-colors">Forums</Link></li>
//                             <li><Link href="/leaderboard" className="text-gray-400 hover:text-primary transition-colors">Leaderboard</Link></li>
//                         </ul>
//                     </div>

//                     {/* Column 3: Contact Info */}
//                     <div>
//                         <h3 className="text-lg font-semibold mb-4 text-white">Contact Info</h3>
//                         <ul className="space-y-4 text-sm text-gray-400">
//                             <li className="flex items-start">
//                                 <MapPin className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
//                                 <span>123 Travel Street<br />Adventure City, AC 12345</span>
//                             </li>
//                             <li className="flex items-start">
//                                 <Phone className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
//                                 <div>
//                                     <span>+1 (555) 123-4567</span>
//                                     <span className="block text-xs">Mon-Fri 9AM-6PM</span>
//                                 </div>
//                             </li>
//                             <li className="flex items-start">
//                                 <Mail className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
//                                 <div>
//                                     <a href="mailto:hello@travelgrid.com" className="block hover:text-primary transition-colors">hello@travelgrid.com</a>
//                                     <a href="mailto:support@travelgrid.com" className="block hover:text-primary transition-colors">support@travelgrid.com</a>
//                                 </div>
//                             </li>
//                         </ul>
//                     </div>

//                     {/* Column 4: Newsletter */}
//                     <div>
//                         <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
//                         <p className="text-gray-400 text-sm mb-4">
//                             Subscribe to get the latest travel tips, exclusive offers, and destination guides delivered to your inbox.
//                         </p>
//                         <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
//                             <input
//                                 type="email"
//                                 placeholder="Enter your email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 className="w-full px-4 py-2.5 bg-[#121823] border border-gray-700 text-white placeholder-gray-500 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
//                             />
//                             <button
//                                 type="submit"
//                                 className="w-full bg-gradient-to-r from-primary to-purple-600 text-white font-semibold py-2.5 rounded-md hover:opacity-90 transition-opacity"
//                             >
//                                 Subscribe
//                             </button>
//                         </form>
//                         <p className="flex items-center text-xs text-gray-500 mt-3">
//                             <Lock size={14} className="mr-1.5 text-yellow-500 flex-shrink-0" />
//                             We respect your privacy. Unsubscribe at any time.
//                         </p>
//                     </div>
//                 </div>

//                 {/* Divider and Copyright */}
//                 <div className="mt-20 pt-8 border-t border-gray-800">
//                     <div className="flex flex-col-reverse items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
//                         <p className="text-sm text-gray-500">© 2025 TravelGrid. All rights reserved.</p>
//                         <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
//                             <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
//                             <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
//                             <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
//                             <Link href="#" className="hover:text-primary transition-colors">Feedback</Link>
//                         </div>
//                     </div>
//                     <p className="text-center text-sm text-gray-500 mt-6">
//                         Made with <span className="text-primary">❤️</span> by TravelGrid Team
//                     </p>
//                 </div>
//             </div>

//             {/* Floating Chat Button */}
//             <button
//                 title="Chat with us"
//                 className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-600 text-white shadow-2xl transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-4 focus:ring-pink-500/50"
//             >
//                 <MessageCircle size={32} />
//                 <span className="absolute top-1 right-1 block h-3.5 w-3.5 rounded-full bg-orange-400 border-2 border-[#0f1419]"></span>
//             </button>
//         </footer>
//     );
// };

// export default Footer;

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Lock,
  MessageCircle,
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-[#0f1419] text-white relative">
      <div className="container mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
          {/* Column 1: Brand & Socials */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
                alt="CineAI Logo"
                width={36}
                height={36}
                className="rounded-full bg-white p-1"
              />
              <span className="text-2xl font-bold font-display">
                CineAI
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              CineAI helps you discover movies that match your current mood —
              powered by GenAI and TMDB. Whether you're feeling romantic,
              nostalgic, or adventurous, we’ll find the perfect film for you.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                aria-label="Email"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  About CineAI
                </Link>
              </li>
              <li>
                <Link
                  href="/recommendations"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  AI Recommendations
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Movie Community
                </Link>
              </li>
              <li>
                <Link
                  href="/trending"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  Trending Movies
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Contact Info
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>
                  NIT ALLAHABAD<br />(MNNITA)
                </span>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <span>+1 (800) 987-6543</span>
                  <span className="block text-xs">Mon–Fri 10AM–7PM</span>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href="mailto:hello@cineai.com"
                    className="block hover:text-primary transition-colors"
                  >
                    hello@cineai.com
                  </a>
                  <a
                    href="mailto:support@cineai.com"
                    className="block hover:text-primary transition-colors"
                  >
                    support@cineai.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Newsletter
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Get weekly movie picks, AI insights, and personalized watchlist
              recommendations — straight to your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#121823] border border-gray-700 text-white placeholder-gray-500 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-purple-600 text-white font-semibold py-2.5 rounded-md hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
            <p className="flex items-center text-xs text-gray-500 mt-3">
              <Lock
                size={14}
                className="mr-1.5 text-yellow-500 flex-shrink-0"
              />
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Divider and Copyright */}
        <div className="mt-20 pt-8 border-t border-gray-800">
          <div className="flex flex-col-reverse items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <p className="text-sm text-gray-500">
              © 2025 CineAI. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
              <Link href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Contact
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Feedback
              </Link>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            Made with <span className="text-primary">❤️</span> Siddharth Singodia
          </p>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button
        title="Chat with CineAI Assistant"
        className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-600 text-white shadow-2xl transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-4 focus:ring-pink-500/50"
      >
        <MessageCircle size={32} />
        <span className="absolute top-1 right-1 block h-3.5 w-3.5 rounded-full bg-orange-400 border-2 border-[#0f1419]"></span>
      </button>
    </footer>
  );
};

export default Footer;
