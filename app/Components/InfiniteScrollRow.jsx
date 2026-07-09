"use client";

import { useEffect, useRef, useState } from "react";

/**
 * InfiniteScrollRow
 * ------------------
 * Two things drive this row's position:
 *
 *  1. Ambient: vertical page-scroll drives a horizontal marquee, same
 *     mechanic as LogoMarquee.jsx. Scrolling down moves the row one way,
 *     scrolling up moves it back, and while the page is still it idles
 *     forward at a slow constant drift.
 *
 *  2. Direct: the user can also grab the row themselves — mouse drag, touch
 *     swipe, the mouse wheel while hovering it, or the arrow keys once it's
 *     focused. Any of these pause the ambient system for as long as the
 *     interaction lasts (drag/touch) or for one nudge (wheel/keyboard), then
 *     the ambient drift picks back up.
 *
 * Either way the row loops infinitely — the items array is tripled and the
 * track position wraps with modulo math so there's no visible seam or reset.
 *
 * Usage:
 *   <InfiniteScrollRow
 *     items={properties}
 *     renderItem={(item) => (
 *       <div className="h-[30vh] w-[24vw] shrink-0">
 *         <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
 *       </div>
 *     )}
 *   />
 *
 * Props:
 *   items          — array of anything (required)
 *   renderItem     — (item, index) => ReactNode (required)
 *   keyExtractor   — (item, index) => string | number, defaults to index
 *   gap            — Tailwind gap class, default "gap-4"
 *   className      — extra classes for the outer wrapper
 *   idleSpeed      — px/frame drift when the page isn't scrolling (default 1)
 *   maxSpeed       — hard cap on scroll-driven px/frame (default 20)
 *   easeIn         — how snappily velocity follows scroll while scrolling (default 0.3)
 *   easeOut        — how slowly velocity decays back to idle once scrolling stops (default 0.05)
 *   direction      — 1 or -1, flips which way "scrolling down" moves the row (default -1, i.e. left)
 *   draggable      — enable mouse-drag + touch-swipe (default true)
 *   wheelScroll    — enable mouse-wheel-to-scroll while hovering (default true)
 *   keyboardScroll — enable ArrowLeft/ArrowRight once the row is focused (default true)
 *   keyboardStep   — px moved per arrow-key press (default 120)
 *   wheelSensitivity — multiplier applied to wheel delta (default 1)
 */
export default function InfiniteScrollRow({
  items,
  renderItem,
  keyExtractor,
  gap = "gap-4",
  className = "",
  idleSpeed = 1,
  maxSpeed = 20,
  easeIn = 0.3,
  easeOut = 0.05,
  direction = -1,
  draggable = true,
  wheelScroll = true,
  keyboardScroll = true,
  keyboardStep = 120,
  wheelSensitivity = 1,
}) {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const posRef = useRef(0);
  const velocityRef = useRef(direction * idleSpeed);
  const targetVelocityRef = useRef(direction * idleSpeed);
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const singleWidthRef = useRef(0);
  const signRef = useRef(direction);

  // True while the user is actively dragging/swiping — the ambient velocity
  // system is paused during this window so it doesn't fight the pointer.
  const isInteractingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const didDragRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  // Measure one set's width after mount/resize so the loop point is exact
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function measure() {
      singleWidthRef.current = track.scrollWidth / 3;
      posRef.current = -singleWidthRef.current / 2;
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items]);

  // Ambient: raw page-scroll delta maps directly to marquee velocity
  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    lastScrollTimeRef.current = Date.now();

    function onScroll() {
      if (isInteractingRef.current) return;

      const currentY = window.scrollY;
      const delta = currentY - lastScrollYRef.current;
      lastScrollYRef.current = currentY;
      lastScrollTimeRef.current = Date.now();

      if (delta === 0) return;

      // scrolling down (delta > 0) → `direction`; scrolling up → reversed
      const sign = delta > 0 ? direction : -direction;
      signRef.current = sign;

      const speed = Math.min(Math.max(Math.abs(delta), idleSpeed), maxSpeed);
      targetVelocityRef.current = sign * speed;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [direction, idleSpeed, maxSpeed]);

  // rAF loop — snappy follow while scrolling, slow decay back to idle drift.
  // While the user is actively dragging, this only wraps + renders whatever
  // position the drag/touch handlers have already written to posRef.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function animate() {
      if (!isInteractingRef.current) {
        const msSinceScroll = Date.now() - lastScrollTimeRef.current;
        const isScrolling = msSinceScroll < 100;

        if (isScrolling) {
          velocityRef.current += (targetVelocityRef.current - velocityRef.current) * easeIn;
        } else {
          const idleTarget = signRef.current * idleSpeed;
          velocityRef.current += (idleTarget - velocityRef.current) * easeOut;
        }

        posRef.current += velocityRef.current;
      }

      const sw = singleWidthRef.current;
      if (sw > 0) {
        if (posRef.current <= -sw) posRef.current += sw;
        if (posRef.current >= 0) posRef.current -= sw;
      }

      track.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [easeIn, easeOut, idleSpeed]);

  // Mouse drag + touch swipe
  useEffect(() => {
    if (!draggable) return;
    const el = wrapperRef.current;
    if (!el) return;

    function start(clientX) {
      isInteractingRef.current = true;
      didDragRef.current = false;
      dragStartXRef.current = clientX;
      dragStartPosRef.current = posRef.current;
      velocityRef.current = 0;
      targetVelocityRef.current = 0;
      setIsDragging(true);
    }

    function move(clientX) {
      if (!isInteractingRef.current) return;
      const dx = clientX - dragStartXRef.current;
      if (Math.abs(dx) > 4) didDragRef.current = true;
      posRef.current = dragStartPosRef.current + dx;
    }

    function end() {
      isInteractingRef.current = false;
      setIsDragging(false);
    }

    function onMouseDown(e) {
      start(e.clientX);
    }
    function onMouseMove(e) {
      move(e.clientX);
    }
    function onMouseUp() {
      end();
    }

    function onTouchStart(e) {
      start(e.touches[0].clientX);
    }
    function onTouchMove(e) {
      // Only hijack the touch (and stop the page scrolling) once horizontal
      // intent is clear — lets a mostly-vertical swipe still scroll the page.
      const dx = e.touches[0].clientX - dragStartXRef.current;
      if (Math.abs(dx) > 6) e.preventDefault();
      move(e.touches[0].clientX);
    }
    function onTouchEnd() {
      end();
    }

    // Click suppression so a drag that ends over a link (e.g. a card wrapped
    // in TransitionLink) doesn't also fire a navigation.
    function onClickCapture(e) {
      if (didDragRef.current) {
        e.preventDefault();
        e.stopPropagation();
        didDragRef.current = false;
      }
    }

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("click", onClickCapture, true);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, [draggable]);

  // Mouse wheel — scroll the row itself while hovering it, instead of (or
  // in addition to) the page. stopPropagation so an ancestor Lenis instance,
  // if this row ever sits inside one, never sees the event either.
  useEffect(() => {
    if (!wheelScroll) return;
    const el = wrapperRef.current;
    if (!el) return;

    function onWheel(e) {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;

      e.preventDefault();
      e.stopPropagation();

      isInteractingRef.current = false; // one-shot nudge, not a held interaction
      velocityRef.current = 0;
      targetVelocityRef.current = 0;
      posRef.current -= delta * wheelSensitivity;
    }

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [wheelScroll, wheelSensitivity]);

  // Keyboard — ArrowLeft/ArrowRight once the row is focused
  useEffect(() => {
    if (!keyboardScroll) return;
    const el = wrapperRef.current;
    if (!el) return;

    function onKeyDown(e) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();

      velocityRef.current = 0;
      targetVelocityRef.current = 0;
      posRef.current += e.key === "ArrowLeft" ? keyboardStep : -keyboardStep;
    }

    el.addEventListener("keydown", onKeyDown);
    return () => el.removeEventListener("keydown", onKeyDown);
  }, [keyboardScroll, keyboardStep]);

  if (!items?.length) return null;

  return (
    <div
      ref={wrapperRef}
      className={`w-full overflow-hidden select-none ${className}`}
      style={{ cursor: draggable ? (isDragging ? "grabbing" : "grab") : undefined, touchAction: "pan-y" }}
      tabIndex={keyboardScroll ? 0 : undefined}
      role={keyboardScroll ? "region" : undefined}
      aria-label={keyboardScroll ? "Scrollable content, use arrow keys to navigate" : undefined}
    >
      <div ref={trackRef} className={`flex w-max ${gap} will-change-transform`}>
        {[0, 1, 2].flatMap((setIdx) =>
          items.map((item, i) => (
            <div
              key={`${setIdx}-${keyExtractor ? keyExtractor(item, i) : i}`}
              aria-hidden={setIdx !== 0}
            >
              {renderItem(item, i)}
            </div>
          ))
        )}
      </div>
    </div>
  );
}