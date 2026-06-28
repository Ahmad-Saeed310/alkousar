"use client";

import { useEffect, useRef, useState } from "react";

const logos = [
  { icon: "⚛️",  label: "React",      bg: "#0ea5e920", color: "#38bdf8" },
  { icon: "🐍",  label: "Python",     bg: "#eab30820", color: "#facc15" },
  { icon: "🐙",  label: "GitHub",     bg: "#a78bfa20", color: "#a78bfa" },
  { icon: "🐳",  label: "Docker",     bg: "#3b82f620", color: "#60a5fa" },
  { icon: "🎨",  label: "Figma",      bg: "#ec489920", color: "#f472b6" },
  { icon: "🟦",  label: "TypeScript", bg: "#6366f120", color: "#818cf8" },
  { icon: "☁️",  label: "AWS",        bg: "#f9731620", color: "#fb923c" },
  { icon: "📝",  label: "Notion",     bg: "#78716c20", color: "#a8a29e" },
  { icon: "💬",  label: "Slack",      bg: "#10b98120", color: "#34d399" },
  { icon: "▲",   label: "Vercel",     bg: "#f1f5f920", color: "#94a3b8" },
  { icon: "🐘",  label: "Postgres",   bg: "#06b6d420", color: "#67e8f9" },
  { icon: "🔴",  label: "Redis",      bg: "#ef444420", color: "#f87171" },
  { icon: "◈",   label: "GraphQL",    bg: "#d946ef20", color: "#e879f9" },
  { icon: "☸️",  label: "Kubernetes", bg: "#0ea5e920", color: "#38bdf8" },
  { icon: "💳",  label: "Stripe",     bg: "#6366f120", color: "#818cf8" },
  { icon: "🔥",  label: "Svelte",     bg: "#f9731620", color: "#fb923c" },
  { icon: "🌊",  label: "Tailwind",   bg: "#14b8a620", color: "#2dd4bf" },
  { icon: "💙",  label: "VS Code",    bg: "#3b82f620", color: "#60a5fa" },
  { icon: "🤖",  label: "OpenAI",     bg: "#84cc1620", color: "#a3e635" },
  { icon: "📦",  label: "npm",        bg: "#ef444420", color: "#f87171" },
];

const IDLE_SPEED = 1;      // px/frame when not scrolling
const MAX_SPEED = 20;      // hard cap
const EASE_IN = 0.3;       // how fast velocity tracks scroll (snappy follow)
const EASE_OUT = 0.05;     // how fast it decays back to idle (slow wind-down)

export default function LogoMarquee() {
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const posRef = useRef(0);
  const velocityRef = useRef(-IDLE_SPEED);
  const targetVelocityRef = useRef(-IDLE_SPEED);
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());
  const singleWidthRef = useRef(0);
  const signRef = useRef(-1); // -1 left, +1 right

  const [scrollDir, setScrollDir] = useState("left");

  // Measure one set width after mount
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    singleWidthRef.current = track.scrollWidth / 3;
    posRef.current = -singleWidthRef.current / 2;
  }, []);

  // Scroll listener — maps raw scroll delta directly to marquee velocity
  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollYRef.current;
      lastScrollYRef.current = currentY;
      lastScrollTimeRef.current = Date.now();

      if (delta === 0) return;

      // Direction
      const sign = delta > 0 ? -1 : 1;
      signRef.current = sign;
      setScrollDir(sign === -1 ? "left" : "right");

      // Velocity is directly proportional to how many px the page scrolled
      // clamp between IDLE_SPEED and MAX_SPEED so it never stalls or flies off
      const speed = Math.min(Math.max(Math.abs(delta), IDLE_SPEED), MAX_SPEED);
      targetVelocityRef.current = sign * speed;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // RAF loop — two-phase easing: snappy follow while scrolling, slow decay to idle
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = () => {
      const msSinceScroll = Date.now() - lastScrollTimeRef.current;
      const isScrolling = msSinceScroll < 100; // still "live" scroll

      if (isScrolling) {
        // Snap tightly to whatever the scroll velocity is
        velocityRef.current +=
          (targetVelocityRef.current - velocityRef.current) * EASE_IN;
      } else {
        // Decay smoothly back to idle speed in the last direction
        const idleTarget = signRef.current * IDLE_SPEED;
        velocityRef.current +=
          (idleTarget - velocityRef.current) * EASE_OUT;
      }

      posRef.current += velocityRef.current;

      // Seamless loop
      const sw = singleWidthRef.current;
      if (sw > 0) {
        if (posRef.current <= -sw) posRef.current += sw;
        if (posRef.current >= 0) posRef.current -= sw;
      }

      track.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="w-full py-6">
      <div className="mb-4 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <span>Scroll speed controls marquee speed</span>
        <span
          className={[
            "inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-medium transition-all duration-300",
            scrollDir === "left"
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
          ].join(" ")}
        >
          {scrollDir === "left" ? "← right to left" : "left to right →"}
        </span>
      </div>

      <div className="w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max gap-4 will-change-transform"
          aria-label="Technology logo marquee"
        >
          {[0, 1, 2].flatMap((setIdx) =>
            logos.map(({ icon, label, bg, color }) => (
              <div
                key={`${setIdx}-${label}`}
                className="flex h-[10vh] w-[10vh] min-h-[72px] min-w-[72px] shrink-0 select-none flex-col items-center justify-center gap-1.5 rounded-xl border border-gray-200 transition-colors duration-200 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500"
                style={{ background: bg }}
                aria-hidden={setIdx !== 0}
              >
                <span className="text-2xl leading-none" style={{ color }}>
                  {icon}
                </span>
                <span className="text-[10px] tracking-wide text-gray-400 dark:text-gray-500">
                  {label}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}