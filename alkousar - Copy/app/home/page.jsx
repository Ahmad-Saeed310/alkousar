"use client"

import { useState, useEffect } from "react";
import Image from "next/image";


const propertyImage =
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80";

export default function AlKousarHero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden" style={{ backgroundColor: "#5a2d1a", color: "#f5ede6" }}>

      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5 transition-all duration-300 ${
          scrolled ? "backdrop-blur-md bg-black/20" : "bg-transparent"
        }`}
      >
        <a href="#" className="font-semibold text-[17px] tracking-wide" style={{ color: "#f5ede6", fontFamily: "'Sora', sans-serif" }}>
          Al-Kousar
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-12 list-none">
          {["Gallery", "About", "Team"].map((link) => (
            <li key={link}>
              <a
                href="#"
                className="text-sm tracking-wide opacity-80 hover:opacity-100 transition-opacity"
                style={{ color: "#f5ede6" }}
              >
                {link}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#"
              className="text-sm font-medium px-5 py-2 rounded-full border transition-all hover:bg-white/10"
              style={{ color: "#f5ede6", borderColor: "rgba(245,237,230,0.3)", backgroundColor: "rgba(245,237,230,0.1)" }}
            >
              Contact Us
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-0.5 rounded-sm transition-all duration-300"
            style={{
              backgroundColor: "#f5ede6",
              transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none",
            }}
          />
          <span
            className="block w-6 h-0.5 rounded-sm transition-all duration-300"
            style={{ backgroundColor: "#f5ede6", opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-0.5 rounded-sm transition-all duration-300"
            style={{
              backgroundColor: "#f5ede6",
              transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 md:hidden"
          style={{ backgroundColor: "#3e1e0e" }}
        >
          {["Gallery", "About", "Team", "Contact Us"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-2xl font-medium tracking-wide"
              style={{ color: "#f5ede6" }}
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>
      )}

      {/* HERO BODY */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 px-6 md:px-12 pt-28 md:pt-32 gap-8 md:gap-0">

        {/* Top-left: property card */}
        <div className="flex items-center">
          <div className="w-full max-w-xs">
            <div className="overflow-hidden rounded-xl aspect-4/3 group">
              <Image
              width={100}
              height={100}
                src="/Home.png"
                alt="Shahid Manzil"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex justify-between items-center mt-4 px-0.5">
              <span className="text-[15px] tracking-wide" style={{ color: "#f5ede6" }}>
                Shahid Manzil
              </span>
              <span className="text-sm font-light" style={{ color: "rgba(245,237,230,0.55)" }}>
                2025
              </span>
            </div>
          </div>
        </div>

        {/* Top-right: big title */}
        <div className="flex items-center justify-start md:justify-end pb-4">
          <h1
            className="text-[clamp(52px,7vw,96px)] font-bold leading-[1.05] tracking-tight text-left md:text-right"
            style={{ color: "#f5ede6", fontFamily: "'Sora', sans-serif" }}
          >
            Al-Kousar<br />Properties
          </h1>
        </div>

        {/* Bottom strip */}
        <div
          className="col-span-1 md:col-span-2 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-0 py-10 mt-8 md:mt-14"
          // style={{ borderTop: "1px solid rgba(245,237,230,0.18)" }}
        >
          <p
            className="max-w-sm text-[clamp(18px,2.2vw,26px)] font-light leading-relaxed tracking-tight"
            style={{ color: "#f5ede6" }}
          >
            Share your vision, explore DHA Bahawalpur, and your legacy starts here
          </p>

          <div className="flex items-center gap-16">
            <a
              href="#"
              className="text-[15px] tracking-wide opacity-75 hover:opacity-100 transition-opacity relative group"
              style={{ color: "#f5ede6" }}
            >
              About Us
              <span
                className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                style={{ backgroundColor: "#f5ede6" }}
              />
            </a>

            <a
              href="#"
              className="flex items-center gap-2 text-[15px] font-medium tracking-wide group"
              style={{ color: "#f5ede6" }}
            >
              Explore More
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-full border text-sm transition-all duration-200 group-hover:bg-white/10"
                style={{ borderColor: "rgba(245,237,230,0.3)" }}
              >
                ↗
              </span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
