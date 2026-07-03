"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import TransitionLink from "../../animates/TransitionLink";

// Same scroll-driven stacking mechanic as StackingCard.jsx / ProcessStack.jsx
// (manual scroll listener + getBoundingClientRect, no ScrollTrigger),
// generalized to however many published posts come back from Supabase.
export default function BlogStack({ posts }) {
  const cardMap = useRef(new Map());

  useEffect(() => {
    function onScroll() {
      const vh = window.innerHeight;
      const cards = posts.map((p) => cardMap.current.get(p.id));

      for (let i = 0; i < cards.length - 1; i++) {
        const card = cards[i];
        const next = cards[i + 1];
        if (!card || !next) continue;

        const rect = next.getBoundingClientRect();
        const p = Math.min(Math.max((vh - rect.top) / vh, 0), 1);
        const scale = 1 - p * 0.15;
        const rotate = (i % 2 === 0 ? 1 : -1) * p * 8;

        card.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
        card.style.transformOrigin = "center center";
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [posts]);

  if (posts.length === 0) return null;

  return (
    <section
      className="relative bg-black"
      style={{ height: `${posts.length * 100}vh` }}
    >
      {posts.map((post, i) => (
        <div
          key={post.id}
          className="sticky top-0 h-screen w-full"
          style={{ zIndex: i + 1 }}
        >
          <div
            ref={(el) => {
              if (el) cardMap.current.set(post.id, el);
              else cardMap.current.delete(post.id);
            }}
            className="relative h-full w-full overflow-hidden"
            style={{ willChange: "transform" }}
          >
            {post.coverImage && (
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover opacity-50"
              />
            )}
            <div className="absolute inset-0 bg-black/40" />

            <TransitionLink
              href={post.href}
              className="relative z-10 h-full w-full flex flex-col justify-end px-[6vw] md:px-[8vw] pb-[10vh]"
            >
              <div className="flex items-center gap-[2vw] mb-[2vh]">
                <span className="text-white/40 font-mono text-[3.5vw] md:text-[1vw]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {post.tags?.[0] && (
                  <span className="text-white/70 uppercase tracking-widest text-[3vw] md:text-[0.9vw]">
                    {post.tags[0]}
                  </span>
                )}
              </div>

              <h3 className="text-white font-black leading-none text-[9vw] md:text-[4.2vw] sanss max-w-[85vw] md:max-w-[55vw] mb-[2vh]">
                {post.title}
              </h3>

              {post.excerpt && (
                <p className="text-white/70 text-[3.6vw] md:text-[1.2vw] leading-snug max-w-[85vw] md:max-w-[38vw] mb-[3vh]">
                  {post.excerpt}
                </p>
              )}

              <span className="text-white text-[3.4vw] md:text-[1vw] uppercase tracking-widest underline underline-offset-4 w-fit">
                Read More
              </span>
            </TransitionLink>
          </div>
        </div>
      ))}
    </section>
  );
}
