"use client";

import Nav from "../Components/Nav";
import { GalleryWords } from "../Components/text";

import { useProjects } from "../../adminImages/ContentGrid";
import Image from "next/image";
import { useEffect, useRef, useState, useMemo } from "react";

export default function HorizontalScroll() {
  const { projects, loading } = useProjects();

  const BASE_PROJECTS = useMemo(
    () =>
      (projects ?? []).map((project) => ({
        id: project.id,
        title: project.title,
        tag: project.description ?? "",
        img: project.project_images?.[0]?.image_url ?? "/placeholder.png",
        href: `/projects/${project.id}`,
      })),
    [projects]
  );

  // Triple the list so there's always a buffer to scroll into on either side
  const PROJECTS = useMemo(
    () => [
      ...BASE_PROJECTS.map((p) => ({ ...p, uid: `a-${p.id}` })),
      ...BASE_PROJECTS.map((p) => ({ ...p, uid: `b-${p.id}` })),
      ...BASE_PROJECTS.map((p) => ({ ...p, uid: `c-${p.id}` })),
    ],
    [BASE_PROJECTS]
  );

  const CARD_W = 320;
  const CARD_GAP = 20;
  const CARD_STRIDE = CARD_W + CARD_GAP;
  const SET_WIDTH = BASE_PROJECTS.length * CARD_STRIDE;

  const trackRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [progress, setProgress] = useState(0);
  const didDrag = useRef(false);

  // Start centered in the middle copy once data is ready
  useEffect(() => {
    const track = trackRef.current;
    if (!track || SET_WIDTH === 0) return;
    track.scrollLeft = SET_WIDTH;
  }, [SET_WIDTH]);

  // Single scroll listener: update progress bar + silently wrap at edges.
  // Wrapping only ever moves scrollLeft by exactly one SET_WIDTH, which
  // native scrollLeft assignment handles instantly with no animation,
  // so there's nothing to jitter.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || SET_WIDTH === 0) return;

    function onScroll() {
      const sl = track.scrollLeft;

      if (sl >= SET_WIDTH * 2) {
        track.scrollLeft = sl - SET_WIDTH;
      } else if (sl < SET_WIDTH) {
        track.scrollLeft = sl + SET_WIDTH;
      }

      const pct = ((track.scrollLeft - SET_WIDTH) / SET_WIDTH) * 100;
      setProgress(Math.max(0, Math.min(100, Math.round(pct))));
    }

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [SET_WIDTH]);

  // Wheel → horizontal scroll, responding to EITHER vertical or horizontal
  // wheel/trackpad input. This is a horizontal-only gallery with nothing to
  // reveal by scrolling the page, so any scroll gesture — up/down or
  // left/right — moves the card track sideways instead.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function onWheel(e) {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;
      e.preventDefault();
      track.scrollLeft += delta;
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

    function onMouseDown(e) {
      dragging = true;
      didDrag.current = false;
      startX = e.pageX;
      startLeft = track.scrollLeft;
      track.style.cursor = "grabbing";
    }
    function onMouseMove(e) {
      if (!dragging) return;
      const dx = e.pageX - startX;
      if (Math.abs(dx) > 4) didDrag.current = true;
      track.scrollLeft = startLeft - dx;
    }
    function onMouseUp() {
      dragging = false;
      track.style.cursor = "grab";
    }

    track.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      track.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  if (loading) {
    return (
      <section className="h-screen w-full flex items-center justify-center bg-stone-300">
        <span className="text-sm text-black/50">Loading projects…</span>
      </section>
    );
  }

  if (!BASE_PROJECTS.length) {
    return (
      <section className="h-screen w-full flex items-center justify-center bg-stone-300">
        <span className="text-sm text-black/50">No projects found.</span>
      </section>
    );
  }

  return (
    <section className="h-screen w-full  bg-stone-100 ">
      <Nav />
      <div className="h-screen w-full flex flex-col pt-[10vh] items-center justify-center  overflow-hidden select-none">
        <div
          ref={trackRef}
          className="w-full flex overflow-x-scroll overflow-y-hidden"
          style={{
            gap: CARD_GAP,
            paddingLeft: 64,
            paddingRight: 64,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            cursor: "grab",
            overscrollBehaviorX: "contain",
          }}
        >
          {PROJECTS.map((p) => (
            <a
              key={p.uid}
              href={p.href}
              onMouseEnter={() => setHovered(p.uid)}
              onMouseLeave={() => setHovered(null)}
              onClick={(e) => {
                if (didDrag.current) e.preventDefault();
              }}
              className="flex flex-col"
              style={{
                flexShrink: 0,
                width: CARD_W,
                textDecoration: "none",
              }}
            >
              {/* Image box — fixed height, everything image-related stays contained here */}
              <div className="relative overflow-hidden" style={{ height: 420 }}>
                <Image
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover"
                  style={{
                    filter: hovered === p.uid ? "grayscale(100%) brightness(0.5)" : "none",
                    transform: hovered === p.uid ? "scale(1.05)" : "scale(1)",
                    transition: "filter 0.4s ease, transform 0.4s ease",
                  }}
                  draggable={false}
                  fill
                />

                {/* Hover overlay — keep this if you still want the "View project ↗" hint on hover */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-6"
                  style={{
                    opacity: hovered === p.uid ? 1 : 0,
                    transition: "opacity 0.35s ease",
                  }}
                >
                </div>
              </div>

              {/* Title — outside the image box, left-aligned, in normal document flow below it */}
              <span className="mt-3 text-left text-[1.5vw] font-regular tracking-tight text-black leading-tight">
                {p.title}
              </span>
            </a>
          ))}
        </div>

        <div className="w-[20vw] px-16 mt-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-black/40 relative overflow-hidden rounded-full">
            <div
              className="absolute left-0 top-0 h-full bg-black rounded-full"
              style={{ width: `${progress}%`, transition: "width 60ms linear" }}
            />
          </div>
          <span className="text-xs font-mono text-black/60 w-10 text-right tabular-nums">
            {progress}%
          </span>
        </div>

        <div className="words">
          <GalleryWords
            link="#"
            textss="Al-Kousar Properties"
            typess="page"
            className="absolute bottom-10 left-5 text-[2vw] font-regular tracking-tight text-black tracking-tight"
          />
        </div>
        <div className="words">
          <GalleryWords
            link="#"
            textss="(Scroll Horizontal)"
            typess="page"
            className="absolute bottom-10 right-5 text-[2vw] font-regular tracking-tight text-black tracking-tight"
          />
        </div>

        <style>{`div::-webkit-scrollbar{display:none}`}</style>
      </div>
    </section>
  );
}