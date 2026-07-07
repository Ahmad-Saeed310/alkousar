"use client";
import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { useTransition } from "@/context/TransitionContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import TransitionOverlay from "./TransitionOverlay";

// Idempotent — safe to call even if another component registers it too.
// Needed here specifically because this file calls ScrollTrigger.refresh(true)
// directly, and that touches internal state (e.g. _resizeDelay) that only
// exists once the plugin has actually been registered somewhere first.
gsap.registerPlugin(ScrollTrigger);

export default function LayoutContent({ children }) {
  const pathname = usePathname();
  const { overlayRef } = useTransition();
  const lenis = useLenis();


  useLayoutEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    return () => {
      lenis?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    };
  }, [pathname, lenis]);

  useGSAP(
    () => {
      if (!overlayRef.current) return;
      gsap
        .timeline()
        .to(".stair", { y: "100%", stagger: -0.08, duration: 0.35, ease: "power2.out" })
        .set(overlayRef.current, { display: "none" })
        .set(".stair", { y: 0 })
        .call(() => {
          // Hard refresh (recompute from scratch, ignoring any cached
          // measurements) — a single soft refresh right after mount can
          // still land on stale numbers if images/fonts are still
          // settling and shifting layout. Re-run it again shortly after
          // to catch that late shift (this is what was leaving scrubbed
          // ScrollTriggers, e.g. Listing.jsx's background-color scrub,
          // stuck showing their fully-scrolled "end" state on pages
          // reached via client-side navigation).
          ScrollTrigger.refresh(true);
          setTimeout(() => ScrollTrigger.refresh(true), 300);
        });
    },
    { dependencies: [pathname], revertOnUpdate: true }
  );

  useGSAP(() => {
    // Snap the single app-wide Lenis instance back to the top for every new
    // page. Otherwise its scroll target carries over from whatever page we
    // came from (e.g. a tall project detail page), so a shorter page like
    // /projects renders as if already scrolled down and everything looks
    // shifted/clamped.
    lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    if (!overlayRef.current) return;
    gsap
      .timeline()
      .to(".stair", { y: "100%", stagger: -0.08, duration: 0.35, ease: "power2.out" })
      .set(overlayRef.current, { display: "none" })
      .set(".stair", { y: 0 })
      .call(() => ScrollTrigger.refresh()); // ✅ recalc trigger positions for the new page
  }, [pathname, lenis]);


  return (
    <>
      <TransitionOverlay ref={overlayRef} />
      {children}
    </>
  );
}