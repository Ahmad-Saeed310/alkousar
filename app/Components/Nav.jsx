
"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TransitionLink from "../../animates/TransitionLink";

export default function Nav({ playIntro = true }) {
  const navRef = useRef(null);

  const menuRef = useRef(null);
  const navItemsRef = useRef([]);

  const [menuOpen, setMenuOpen] = useState(false);

  navItemsRef.current = [];

  const links = [
    { label: "About Us", href: "/about" },
    { label: "Buy / Sell", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  // Desktop intro
  useGSAP(
    () => {
      gsap.from(".desktop-nav", {
        yPercent: 50,
        opacity: 0,
        delay: playIntro ? 2.4 : 0,
        duration: 1,
        ease: "power4.out",
      });
    },
    { scope: navRef, dependencies: [playIntro] }
  );

  // Mobile Menu Animation
  useGSAP(
    () => {
      if (!menuRef.current) return;

      if (menuOpen) {
        gsap.set(menuRef.current, {
          display: "flex",
        });

        const tl = gsap.timeline();

        tl.fromTo(
          menuRef.current,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
          }
        );

        tl.fromTo(
          navItemsRef.current,
          {
            yPercent: 100,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.15"
        );
      } else {
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(menuRef.current, {
              display: "none",
            });
          },
        });

        tl.to(navItemsRef.current, {
          yPercent: 100,
          opacity: 0,
          duration: 0.45,
          stagger: {
            each: 0.05,
            from: "end",
          },
          ease: "power4.in",
        });

        tl.to(
          menuRef.current,
          {
            opacity: 0,
            duration: 0.3,
          },
          "-=0.2"
        );
      }
    },
    { dependencies: [menuOpen] }
  );


useGSAP(
  () => {
    if (!menuOpen) return;

    gsap.from(".upAnimate", {
      yPercent: 100,
      opacity: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: "power4.out",
    });
  },
  { dependencies: [menuOpen] }
);
  return (
    <>
      {/* ================= Desktop Nav ================= */}

      <nav
        ref={navRef}
        className="fixed top-0 left-0 z-50 w-full h-[10vh] px-6 md:px-[5vh] flex items-center justify-between mix-blend-difference"
      >
        <TransitionLink
          href="/"
          className="desktop-nav h-[4vh] w-auto"
        >
          <Image
            src="/logo.png"
            width={100}
            height={100}
            alt="Logo"
            className="h-[4vh] w-auto"
          />
        </TransitionLink>

        <div className="desktop-nav hidden md:flex items-center gap-[5vw] uppercase text-sm text-white">
          {links.map((link) => (
            <TransitionLink
              key={link.href}
              href={link.href}
              className="group relative block overflow-hidden h-[1.2em]"
            >
              <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                {link.label}
              </span>

              <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                {link.label}
              </span>
            </TransitionLink>
          ))}
        </div>

        {/* Mobile Hamburger */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="desktop-nav md:hidden flex flex-col justify-center gap-1.5 text-white z-[70]"
        >
          <span
            className={`block w-7 h-[2px] bg-white transition-all ${
              menuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-7 h-[2px] bg-white transition-all ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-7 h-[2px] bg-white transition-all ${
              menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </nav>

     {/* ================= Mobile Overlay ================= */}

<div
  ref={menuRef}
  className="fixed inset-0 z-[60] hidden flex-col bg-stone-100  text-black "
>
  {/* Top Bar */}

  <div className="h-[12vh] px-6 flex items-center justify-between text-black">

    <TransitionLink href="/">
      <Image
        src="/logo.png"
        width={120}
        height={120}
        alt="Logo"
        className="h-10 w-auto"
      />
    </TransitionLink>

    <button
      onClick={() => setMenuOpen(false)}
      className="group relative h-10 w-10 flex items-center justify-center "
      aria-label="Close menu"
    >
      <span
        className="
          absolute
          w-8
          h-[2px]
          bg-black
          rotate-45
          transition-transform
          duration-300
          group-hover:rotate-[55deg]
        "
      />

      <span
        className="
          absolute
          w-8
          h-[2px]
          bg-black
          -rotate-45
          transition-transform
          duration-300
          group-hover:-rotate-[55deg]
        "
      />
    </button>

  </div>

  {/* Middle */}

  <div className="flex-1 flex items-center justify-center">
    <div className="flex flex-col leading-tight  uppercase">
      {links.map((link, index) => (
        <div key={link.href} className="overflow-hidden">
          <TransitionLink
            ref={(el) => (navItemsRef.current[index] = el)}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="block text-[8vh] tracking-tighter leading-none font-semibold uppercase upAnimate"
          >
            {link.label}
          </TransitionLink>
        </div>
      ))}
    </div>
  </div>

  {/* Bottom */}

  <div className="h-[12vh] flex items-center justify-center border-t border-white/10">
    <p className="text-xs uppercase tracking-[0.35em] text-black">
      BUILDING TRUST SINCE 2019
    </p>
  </div>
</div>
     
    </>
  );
}