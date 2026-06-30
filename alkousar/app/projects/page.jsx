
"use client";

import Image from "next/image"

import { useEffect, useRef, useState, useCallback } from "react";

const BASE_PROJECTS = [
 { id: 1,  title: "Al-Kousar Properties", tag: "Real Estate",   img: "/project-1-1.png", href: "/projects/cosmic%20Visualizer4" },
  { id: 2,  title: "Arch Studio",          tag: "Architecture",  img: "/project-1-2.png", href: "#" },
  { id: 3,  title: "Verde Living",         tag: "Interior",      img: "/project-1-3.png", href: "#" },
  { id: 4,  title: "Noir Branding",        tag: "Branding",      img: "/project-1-4.png", href: "#" },
  { id: 5,  title: "Motion Lab",           tag: "Animation",     img: "/project-1-5.png", href: "#" },
  { id: 6,  title: "Solis Solar",          tag: "Energy",        img: "/project-2-1.png", href: "#" },
  { id: 7,  title: "Typeset",              tag: "Typography",    img: "/project-2-2.png", href: "#" },
  { id: 8,  title: "Pulse Health",         tag: "Healthcare",    img: "/project-2-3.png", href: "#" },
  { id: 9,  title: "Drift Apparel",        tag: "Fashion",       img: "/project-2-4.png", href: "#" },
  { id: 10, title: "Lunar Coffee",         tag: "F&B",           img: "/project-2-5.png", href: "#" },
  { id: 11, title: "Block Chain",          tag: "Web3",          img: "/project-3-1.png", href: "#" },
  { id: 12, title: "Terrain Maps",         tag: "Data Viz",      img: "/project-3-2.png", href: "#" },
  { id: 13, title: "Coda Music",           tag: "Music",         img: "/project-3-3.png", href: "#" },
  { id: 14, title: "Sky Drone",            tag: "Aerial",        img: "/project-3-4.png", href: "#" },
  { id: 15, title: "Forma Portfolio",      tag: "Portfolio",     img    : "/project-3-5.png", href: "#" },
];

// Triple the list: [copy] [original] [copy]
// We start in the middle copy so user can scroll left or right infinitely
const PROJECTS = [
  ...BASE_PROJECTS.map((p) => ({ ...p, uid: `a-${p.id}` })),
  ...BASE_PROJECTS.map((p) => ({ ...p, uid: `b-${p.id}` })),
  ...BASE_PROJECTS.map((p) => ({ ...p, uid: `c-${p.id}` })),
];

const CARD_W   = 320;
const CARD_GAP = 20;
const CARD_STRIDE = CARD_W + CARD_GAP;
const SET_WIDTH   = BASE_PROJECTS.length * CARD_STRIDE; // width of one set

export default function HorizontalScroll() {
  const trackRef  = useRef(null);
  const [hovered, setHovered]  = useState(null);
  const [progress, setProgress] = useState(0);
  // track cumulative scroll for progress (not raw scrollLeft which jumps on teleport)
  const totalScrolled = useRef(0);
  const lastScrollLeft = useRef(0);
  const isJumping = useRef(false);
  const didDrag   = useRef(false);

  // Jump back to center copy silently (no visible flicker)
  const teleport = useCallback((track) => {
    const sl = track.scrollLeft;
    if (sl >= SET_WIDTH * 2) {
      isJumping.current = true;
      track.scrollLeft = sl - SET_WIDTH;
      lastScrollLeft.current = track.scrollLeft;
      isJumping.current = false;
    } else if (sl < SET_WIDTH) {
      isJumping.current = true;
      track.scrollLeft = sl + SET_WIDTH;
      lastScrollLeft.current = track.scrollLeft;
      isJumping.current = false;
    }
  }, []);

  // Start at center copy on mount
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = SET_WIDTH;
    lastScrollLeft.current = SET_WIDTH;
  }, []);

  // Scroll listener: update progress + teleport at boundaries
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function onScroll() {
      if (isJumping.current) return;

      const delta = track.scrollLeft - lastScrollLeft.current;
      totalScrolled.current += delta;
      lastScrollLeft.current = track.scrollLeft;

      // progress cycles 0→100 once per full set width
      const pct = ((totalScrolled.current % SET_WIDTH) + SET_WIDTH) % SET_WIDTH;
      setProgress(Math.round((pct / SET_WIDTH) * 100));

      teleport(track);
    }

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [teleport]);

  // Only respond to horizontal scroll (deltaX) — vertical scroll is untouched
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function onWheel(e) {
      if (Math.abs(e.deltaX) === 0) return; // pure vertical scroll — ignore
      e.preventDefault();
      track.scrollLeft += e.deltaX;
    }

    track.addEventListener("wheel", onWheel, { passive: false });
    return () => track.removeEventListener("wheel", onWheel);
  }, []);

  // Drag to scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let startX = 0;
    let startLeft = 0;
    let dragging = false;

    let didDragLocal = false;

    function onMouseDown(e) {
      dragging     = true;
      didDragLocal = false;
      didDrag.current = false;
      startX    = e.pageX;
      startLeft = track.scrollLeft;
      track.style.cursor = "grabbing";
    }
    function onMouseMove(e) {
      if (!dragging) return;
      const dx = e.pageX - startX;
      if (Math.abs(dx) > 4) { didDragLocal = true; didDrag.current = true; }
      track.scrollLeft = startLeft - dx;
    }
    function onMouseUp() {
      dragging = false;
      track.style.cursor = "grab";
    }

    track.addEventListener("mousedown",  onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup",   onMouseUp);
    return () => {
      track.removeEventListener("mousedown",  onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup",   onMouseUp);
    };
  }, []);

  return (
    <section className="h-screen w-full flex flex-col items-center justify-center bg-stone-300 overflow-hidden select-none">

      {/* track */}
      <div
        ref={trackRef}
        className="w-full flex overflow-x-scroll overflow-y-hidden bg-red-500"
        style={{
          gap: CARD_GAP,
          paddingLeft: 64,
          paddingRight: 64,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: "grab",
        }}
      >
        {PROJECTS.map((p) => (
          <a
            key={p.uid}
            href={p.href}
            onMouseEnter={() => setHovered(p.uid)}
            onMouseLeave={() => setHovered(null)}
            onClick={(e) => { if (didDrag.current) e.preventDefault(); }}
            className="relative overflow-hidden relative"
            style={{
              flexShrink: 0,
              width: CARD_W,
              height: 420,
              textDecoration: "none",
            }}

          >
            <Image
              src={p.img}
              alt={p.title}
              className="w-full h-full object-cover"
              style={{
                filter:    hovered === p.uid ? "grayscale(100%) brightness(0.5)" : "none",
                transform: hovered === p.uid ? "scale(1.05)" : "scale(1)",
                transition: "filter 0.4s ease, transform 0.4s ease",
              }}
              draggable={false}
              fill
            />

            {/* hover overlay */}
            <div
              className="absolute inset-0 flex flex-col justify-end p-6"
              style={{
                opacity:    hovered === p.uid ? 1 : 0,
                transition: "opacity 0.35s ease",
              }}
            >
              <span className="text-[11px] font-medium tracking-widest uppercase text-white/50 mb-1">
                {p.tag}
              </span>
              <span className="text-xl font-bold tracking-tight text-white leading-tight">
                {p.title}
              </span>
              <span className="mt-3 text-xs text-white/60 flex items-center gap-1">
                View project <span className="text-base">↗</span>
              </span>
            </div>

            {/* index */}
            <div className="absolute top-4 right-4 text-xs font-mono text-white/25">
              {String(p.id).padStart(2, "0")}
            </div>
          </a>
        ))}
      </div>

      {/* progress */}
      <div className="w-[20vw] px-16 mt-8 flex items-center gap-4">
        <div className="flex-1 h-px bg-black/40 relative overflow-hidden rounded-full">
          <div
            className="absolute left-0 top-0 h-full bg-black rounded-full"
            style={{
              width: `${progress}%`,
              transition: "width 60ms linear",
            }}
          />
        </div>
        <span className="text-xs font-mono text-black/60 w-10 text-right tabular-nums">
          {progress}%
        </span>
      </div>

      <style>{`div::-webkit-scrollbar{display:none}`}</style>
    </section>
  );
}