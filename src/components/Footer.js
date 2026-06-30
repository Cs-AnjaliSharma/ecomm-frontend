import Link from "next/link";
import { Mail, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white border-t border-border-light pt-12 pb-8 px-4 sm:px-6 lg:px-8 mt-auto w-full font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div className="space-y-4 text-left">
          <h3 className="text-xl font-bold font-fredoka tracking-tighter">POSTERIZED</h3>
          <p className="text-gray-400 text-xs leading-relaxed max-w-xs">
            Premium custom art prints and split posters designed to elevate your walls. Experience high-definition colors and 300 GSM quality.
          </p>
          <div className="flex gap-4 pt-2">
            {/* Custom SVG for Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition" aria-label="Instagram">
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            {/* Custom SVG for Twitter/X */}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition" aria-label="Twitter/X">
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Categories Link Column */}
        <div className="space-y-3 text-left">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-200">Collections</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><Link href="/products?category=Anime" className="hover:text-white transition">Anime Posters</Link></li>
            <li><Link href="/products?category=Sports" className="hover:text-white transition">Formula 1 & Sports</Link></li>
            <li><Link href="/products?category=Movies" className="hover:text-white transition">Cinematic & Movie Art</Link></li>
            <li><Link href="/products?category=Gaming" className="hover:text-white transition">Retro Gaming Sunsets</Link></li>
          </ul>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-3 text-left">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-200">Help & Support</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><Link href="/products" className="hover:text-white transition">All Products</Link></li>
            <li><Link href="/custom" className="hover:text-white transition">Custom Image Upload</Link></li>
            <li><Link href="/wishlist" className="hover:text-white transition">Your Wishlist</Link></li>
            <li><span className="text-gray-400">Privacy & Terms</span></li>
          </ul>
        </div>

        {/* Support & Secure Info */}
        <div className="space-y-3 text-left">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-200">Contact Us</h4>
          <div className="text-xs text-gray-400 space-y-2">
            <p className="flex items-center gap-2">
              <Mail size={14} /> support@posterized.in
            </p>
            <p className="flex items-center gap-2 text-green-400 font-semibold">
              <ShieldCheck size={14} /> 256-bit Secure Checkout
            </p>
            <div className="flex gap-2 items-center pt-2">
              <span className="bg-gray-800 text-[10px] font-bold px-2 py-0.5 rounded text-gray-300">VISA</span>
              <span className="bg-gray-800 text-[10px] font-bold px-2 py-0.5 rounded text-gray-300">UPI</span>
              <span className="bg-gray-800 text-[10px] font-bold px-2 py-0.5 rounded text-gray-300">STRIPE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Border & Legal Disclaimer */}
      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-10 pt-6 text-center space-y-3">
        <p className="text-[10px] text-gray-500 max-w-4xl mx-auto italic leading-normal">
          Disclaimer: All poster prints featured on this platform are independent artistic interpretations, creative illustrations, or fan-art. We do not claim official licensing, corporate endorsements, or affiliation with any of the respective racing teams, movie studios, gaming franchises, or registered trademarks.
        </p>
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Posterized. Designed as a premium custom e-commerce demonstration. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
