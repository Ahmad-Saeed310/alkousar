
  "use client";

  import Nav from "../Components/Nav";
  import { GalleryWords } from "../Components/text";

  import { useProjects } from "../../adminImages/ContentGrid";
  import Image from "next/image";
  import { useEffect, useRef, useState, useMemo } from "react";

  /**
   * Responsive version of HorizontalScrollNoLenis.
   *
   * - Desktop (md and up): unchanged infinite horizontal scroll gallery,
   *   same wheel/drag/wraparound logic as before.
   * - Mobile (below md): infinite scroll is dropped entirely. Projects are
   *   rendered once, in a normal flex-col stack, each one full width and
   *   flowing after the previous one, using the page's native vertical
   *   scroll. No wheel hijacking, no wraparound, no drag-to-scroll — mobile
   *   just gets a simple, standard stacked list.
   *
   * Both layouts share the same `useProjects` data. Which one is visible is
   * controlled purely with Tailwind responsive classes (`hidden md:flex` /
   * `flex md:hidden`), so there's no layout flash and no JS media-query
   * logic needed.
   */
  export default function HorizontalScrollResponsive() {
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

    if (loading) {
      return (
        <section className="min-h-screen w-full flex items-center justify-center bg-stone-300">
          <span className="text-sm text-black/50">Loading projects…</span>
        </section>
      );
    }

    if (!BASE_PROJECTS.length) {
      return (
        <section className="min-h-screen w-full flex items-center justify-center bg-stone-300">
          <span className="text-sm text-black/50">No projects found.</span>
        </section>
      );
    }

    return (
      <section className="w-full bg-stone-100">
        <Nav />
        <DesktopGallery BASE_PROJECTS={BASE_PROJECTS} />
        <MobileGallery BASE_PROJECTS={BASE_PROJECTS} />
      </section>
    );
  }

  /* ------------------------------------------------------------------ */
  /* Desktop: infinite scroll, wheel + drag, wraparound (unchanged)      */
  /* ------------------------------------------------------------------ */

  function DesktopGallery({ BASE_PROJECTS }) {
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

    // Wheel → horizontal scroll
    useEffect(() => {
      const track = trackRef.current;
      if (!track) return;

      function normalize(value, mode) {
        if (mode === 1) return value * 16;
        if (mode === 2) return value * window.innerWidth;
        return value;
      }

      function onWheel(e) {
        const deltaX = normalize(e.deltaX, e.deltaMode);
        const deltaY = normalize(e.deltaY, e.deltaMode);
        const delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;

        if (delta === 0) return;
        e.preventDefault();
        e.stopPropagation();
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

    return (
      <div className="hidden md:flex h-screen w-full flex-col pt-[10vh] items-center justify-center overflow-hidden select-none">
        <div
          ref={trackRef}
          data-lenis-prevent
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
              style={{ flexShrink: 0, width: CARD_W, textDecoration: "none" }}
            >
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
                <div
                  className="absolute inset-0 flex flex-col justify-end p-6"
                  style={{
                    opacity: hovered === p.uid ? 1 : 0,
                    transition: "opacity 0.35s ease",
                  }}
                />
              </div>

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
    );
  }

  /* ------------------------------------------------------------------ */
  /* Mobile: plain stacked list, one project after another, no infinite  */
  /* scroll, no wheel/drag hijacking — just the page's native scroll.    */
  /* ------------------------------------------------------------------ */

  function MobileGallery({ BASE_PROJECTS }) {
    const [pressed, setPressed] = useState(null);

    return (
      <div className="flex md:hidden w-full flex-col pt-[12vw]">
        <div className="px-5 mb-6">
          <GalleryWords
            link="#"
            textss="Projects"
            typess="page"
            className="text-[15vw] pt-[5vh] uppercase  tracking-tight text-black"
          />
        </div>
        <div className="px-5 mb-6">
          <GalleryWords
            link="#"
            textss="Al-Kousar Properties"
            typess="page"
            className="text-[5vw]  font-medium tracking-tight text-black"
          />
        </div>

        <div className="w-full flex flex-col">
          {BASE_PROJECTS.map((p) => (
            <a
              key={p.id}
              href={p.href}
              onTouchStart={() => setPressed(p.id)}
              onTouchEnd={() => setPressed(null)}
              className=" items-center w-full px-5 pt-[5vh]  "
              style={{ textDecoration: "none" }}
            >
              <div
                className="relative overflow-hidden  bg-green-400"
                style={{ width: "90vw", height: "40vh" }}
              >
                <Image
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover"
                  style={{
                    filter: pressed === p.id ? "grayscale(100%) brightness(0.6)" : "none",
                    transition: "filter 0.25s ease",
                  }}
                  draggable={false}
                  fill
                />
              </div>

              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[4.5vw] font-regular tracking-tight text-black leading-tight truncate">
                  {p.title}
                </span>
                {/* {p.tag ? (
                  <span className="text-[3vw] text-black/50 mt-1 truncate">{p.tag}</span>
                ) : null} */}
              </div>
            </a>
          ))}
        </div>

        <div className="px-5 py-8">
          <GalleryWords
            link="#"
            textss="(Scroll Up)"
            typess="page"
            className="text-[3.5vw] font-regular tracking-tight text-black/60"
          />
        </div>
      </div>
    );
  }