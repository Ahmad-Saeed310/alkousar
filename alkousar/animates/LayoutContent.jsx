"use client";
import { usePathname } from "next/navigation";
import { useTransition } from "@/context/TransitionContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransitionOverlay from "./TransitionOverlay";

export default function LayoutContent({ children }) {
  const pathname = usePathname();
  const { overlayRef } = useTransition();

  useGSAP(() => {
    if (!overlayRef.current) return;
    gsap
      .timeline()
      .to(".stair", { y: "100%", stagger: -0.08, duration: 0.35, ease: "power2.out" })
      .set(overlayRef.current, { display: "none" })
      .set(".stair", { y: 0 })
      .call(() => ScrollTrigger.refresh()); // ✅ recalc trigger positions for the new page
  }, [pathname]);

  return (
    <>
      <TransitionOverlay ref={overlayRef} />
      {children}
    </>
  );
}