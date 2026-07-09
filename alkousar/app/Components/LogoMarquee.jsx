"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const logos = [
  { icon: "/icons/1.jpg", label: "Trust", bg: "white", color: "#000000" },
  { icon: "/icons/2.jpg", label: "Transparency", bg: "white", color: "#000000" },
  { icon: "/icons/3.jpg", label: "Integrity", bg: "white", color: "#000000" },
  { icon: "/icons/4.jpg", label: "Expertise", bg: "white", color: "#000000" },
  { icon: "/icons/5.jpg", label: "Commitment", bg: "white", color: "#000000" },
  { icon: "/icons/6.jpg", label: "Reliability", bg: "white", color: "#000000" },
  { icon: "/icons/7.jpg", label: "Professionalism", bg: "white", color: "#000000" },
  { icon: "/icons/8.jpg", label: "Excellence", bg: "white", color: "#000000" },
  { icon: "/icons/9.jpg", label: "Client First", bg: "white", color: "#000000" },
  { icon: "/icons/10.jpg", label: "Experience", bg: "white", color: "#000000" },
  { icon: "/icons/11.jpg", label: "Quality", bg: "white", color: "#000000" },
  { icon: "/icons/12.jpg", label: "Innovation", bg: "white", color: "#000000" },
  { icon: "/icons/13.jpg", label: "Security", bg: "white", color: "#000000" },
  { icon: "/icons/14.jpg", label: "Vision", bg: "white", color: "#000000" },
  { icon: "/icons/15.jpg", label: "Value", bg: "white", color: "#000000" },
  { icon: "/icons/16.jpg", label: "Community", bg: "white", color: "#000000" },
  { icon: "/icons/17.jpg", label: "Partnership", bg: "white", color: "#000000" },
  { icon: "/icons/18.jpg", label: "Efficiency", bg: "white", color: "#000000" },
  
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
    <div className="w-full py-6 bg-stone-100 z-10">
      {/* <div className="mb-4 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
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
      </div> */}

      <div className="w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max gap-4 will-change-transform"
          aria-label="Technology logo marquee"
        >
          {[0, 1, 2].flatMap((setIdx) =>
            logos.map(({ icon, label, bg,  }) => (
              <div
                key={`${setIdx}-${label}`}
                className="flex md:h-[30vh] h-[25vh] w-[25vh] md:w-[30vh] md:min-h-[10vh]  md:min-w-[10vh] shrink-0 select-none flex items-center justify-center gap-1.5 bg-stone-100 border  border-gray-200 "
                style={{ background: bg }}
                aria-hidden={setIdx !== 0}
              >
                {/* <span className="text-2xl leading-none" style={{ color }}>
                  {icon}
                </span> */}
                <Image
                src={icon}
                alt={label}
                width={100}
                height={100}
                className="md:h-[5vh] h-[6vh] w-auto"
              />
                <span className="md:text-[1.7vw] text-[3vh] tracking-tight text-black ">
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