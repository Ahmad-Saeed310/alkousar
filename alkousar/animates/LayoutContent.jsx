"use client";
import { usePathname } from "next/navigation";
import { useTransition } from "@/context/TransitionContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import TransitionOverlay from "./TransitionOverlay";

export default function LayoutContent({ children }) {
  const pathname = usePathname();
  const { overlayRef } = useTransition();
  const lenis = useLenis();

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