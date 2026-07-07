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

  // Reset scroll on both sides of a navigation: in the outgoing page's
  // cleanup (fires before the next page's components mount, in the common
  // case where React batches both in one commit) AND again in the new
  // page's own setup (belt-and-suspenders — Next's router doesn't
  // guarantee the old page's unmount and the new page's mount land in the
  // same synchronous commit, e.g. across a Suspense/streaming boundary).
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

  return (
    <>
      <TransitionOverlay ref={overlayRef} />
      {children}
    </>
  );
}