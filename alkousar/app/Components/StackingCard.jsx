"use client";

import { useEffect, useRef } from "react";

import ImageRows from "./Award";

export default function StackingCards() {
  const sectionRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  useEffect(() => {
    function onScroll() {
      const vh = window.innerHeight;

      // card2 lives in the scroll flow — its natural top tells us
      // exactly how far the user has scrolled it toward the viewport top.
      // When card2.top == vh  → card2 is just entering the bottom of screen
      // When card2.top == 0  → card2 has reached the top (fully covering card1)
      // We want the animation to run across that full vh of travel.

      const card1 = card1Ref.current;
      const card2 = card2Ref.current;
      const card3 = card3Ref.current;
      if (!card1 || !card2 || !card3) return;

      // --- Card 1 reacts to Card 2 approaching ---
      const c2Rect = card2.getBoundingClientRect();
      // progress: 0 when card2 bottom edge enters screen, 1 when card2 top reaches 0
      const p1 = Math.min(Math.max((vh - c2Rect.top) / vh, 0), 1);
      const scale1  = 1 - p1 * 0.18;
      const rotate1 = p1 * 12;
      card1.style.transform       = `scale(${scale1}) rotate(${rotate1}deg)`;
      card1.style.transformOrigin = "center center";

      // --- Card 2 reacts to Card 3 approaching ---
      const c3Rect = card3.getBoundingClientRect();
      const p2 = Math.min(Math.max((vh - c3Rect.top) / vh, 0), 1);
      const scale2  = 1 - p2 * 0.18;
      const rotate2 = p2 * -12;
      card2.style.transform       = `scale(${scale2}) rotate(${rotate2}deg)`;
      card2.style.transformOrigin = "center center";
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="bg-[#0a0a0a] text-white font-sans">

      {/* 1 — INTRO */}
      {/* <section className="h-screen w-full flex items-center justify-center">
        <h1 className="text-[clamp(48px,10vw,120px)] font-bold uppercase tracking-tighter">
          Intro
        </h1>
      </section> */}

      {/* Sticky container — all 3 cards live here */}
      <div ref={sectionRef} className="relative" style={{ height: "400vh" }}>

        {/* CARD 1 — sticks first */}
        <div className="sticky top-0 h-screen w-full" style={{ zIndex: 1 }}>
          <section
            ref={card1Ref}
            className="h-full w-full flex items-center justify-center bg-[#1a1a2e] border border-[#2d2d5a]"
            style={{ willChange: "transform" }}
          >
            {/* <div className="text-center px-8">
              <p className="text-xs tracking-widest uppercase opacity-40 mb-4">01</p>
              <h2 className="text-[clamp(32px,6vw,80px)] font-bold tracking-tight leading-none mb-6">
                Vision
              </h2>
              <p className="text-base opacity-50 max-w-md mx-auto leading-relaxed">
                Every great product begins with a clear vision. Define where you are going before you decide how to get there.
              </p>
            </div> */}
            <ImageRows />
          </section>
        </div>

        {/* CARD 2 — scrolls up over card 1, then sticks */}
        <div className="sticky top-0 h-screen w-full" style={{ zIndex: 2 }}>
          <section
            ref={card2Ref}
            className="h-full w-full flex items-center justify-center bg-[#1a2e1a] border border-[#2d5a2d]"
            style={{ willChange: "transform" }}
          >
            <div className="text-center px-8">
              <p className="text-xs tracking-widest uppercase opacity-40 mb-4">02</p>
              <h2 className="text-[clamp(32px,6vw,80px)] font-bold tracking-tight leading-none mb-6">
                Design
              </h2>
              <p className="text-base opacity-50 max-w-md mx-auto leading-relaxed">
                Shape ideas into interfaces. Pixel-perfect execution starts with understanding what your users actually need.
              </p>
            </div>
          </section>
        </div>

        {/* CARD 3 — scrolls up over card 2, then sticks */}
        <div className="sticky top-0 h-screen w-full" style={{ zIndex: 3 }}>
          <section
            ref={card3Ref}
            className="h-full w-full flex items-center justify-center bg-[#2e1a1a] border border-[#5a2d2d]"
            style={{ willChange: "transform" }}
          >
            <div className="text-center px-8">
              <p className="text-xs tracking-widest uppercase opacity-40 mb-4">03</p>
              <h2 className="text-[clamp(32px,6vw,80px)] font-bold tracking-tight leading-none mb-6">
                Launch
              </h2>
              <p className="text-base opacity-50 max-w-md mx-auto leading-relaxed">
                Ship with confidence. A great launch is not an accident. It is the result of everything that came before.
              </p>
            </div>
          </section>
        </div>

      </div>

      {/* 5 — OUTRO */}
      {/* <section className="h-screen w-full flex items-center justify-center">
        <h1 className="text-[clamp(48px,10vw,120px)] font-bold uppercase tracking-tighter">
          Outro
        </h1>
      </section> */}

    </main>
  );
}