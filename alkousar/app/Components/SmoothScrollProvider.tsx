"use client";

import { ReactNode, useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SmoothScrollProviderProps = {
  children: ReactNode;
};

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.1,
        smoothWheel: true,
      }}
      onScroll={() => ScrollTrigger.update()}
    >
      {children}
    </ReactLenis>
  );
}