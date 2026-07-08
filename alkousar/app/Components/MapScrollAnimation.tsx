"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const MAPS_URL =
  "https://www.google.com/maps/place/DHA+Bahawalpur+%7C+Al-Kousar+Properties%C2%AE%EF%B8%8F/@29.3222506,71.6793062,810m/data=!3m2!1e3!4b1!4m6!3m5!1s0x393b91be30f507ed:0x9f321127b21f3816!8m2!3d29.322246!4d71.6841771!16s%2Fg%2F11sm7p_lc8!5m1!1e4?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D";

export default function MapJourney() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const svg = containerRef.current?.querySelector("svg");
      const path = containerRef.current?.querySelector(
        ".path"
      ) as SVGPathElement | null;
      const pov = containerRef.current?.querySelector(
        ".pov"
      ) as SVGGElement | null;
      const povInner = containerRef.current?.querySelector(
        ".pov-inner"
      ) as SVGGElement | null;

      if (!svg || !path || !pov || !povInner) return;

      const length = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      const vb = svg.viewBox.baseVal;

      gsap.set(pov, {
        x: vb.width / 2,
        y: vb.height / 2,
        scale: 2.5,
        transformOrigin: "0 0",
      });

      const start = path.getPointAtLength(0);

      gsap.set(povInner, {
        x: -start.x,
        y: -start.y,
      });

      const xTo = gsap.quickTo(povInner, "x", {
        duration: 1,
        ease: "expo.out",
      });

      const yTo = gsap.quickTo(povInner, "y", {
        duration: 1,
        ease: "expo.out",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#journey",
          start: "top top",
          end: "bottom bottom",
          pin: ".map",
          scrub: 1,

          onUpdate: () => {
            const dotX = gsap.getProperty(".dot-end", "x") as number;
            const dotY = gsap.getProperty(".dot-end", "y") as number;

            xTo(-dotX);
            yTo(-dotY);
          },
        },
      });

      tl.to(
        path,
        {
          strokeDashoffset: 0,
          ease: "none",
        },
        0
      );

      tl.to(
        ".dot-end",
        {
          motionPath: {
            path,
            align: path,
            autoRotate: false,
            alignOrigin: [0.5, 0.5],
          },
          ease: "none",
        },
        0
      );

      tl.fromTo(
        pov,
        {
          scale: 1,
        },
        {
          scale: 2.5,
          ease: "power1.inOut",
        },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <section id="journey" className="relative h-[300vh]  z-50 bg-stone-100 overflow-x-hidden ">
        
        <svg
          className="map absolute inset-0 h-screen w-screen cursor-pointer"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          onClick={() => window.open(MAPS_URL, "_blank", "noopener,noreferrer")}
        >
          <g className="pov">
            <g className="pov-inner">
              <image href="/AlKousarMap.png" width="1920" height="1080" />

              <path
                className="path"
                fill="none"
                stroke="#8A8A8A"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M966.1,163v192.7v56.5V471c0,1.7-4.5,34.7-4.8,36.3l-8.1,33.6c-0.5,2.5-1.3,4.9-2.4,7.1l-4.2,9.8
                c-0.1,0.1-0.1,0.3-0.2,0.4l-12.6,23.2l-19.1,35.7l-1.4,2.6
                c-0.9,1.5-1.3,3.3-1.4,5v1.2
                c-0.1,2,2.2,3.3,3.9,2.3l1-0.6
                c0.9-0.6,1.7-1.3,2.2-2.3l10.3-17.9
                c1.2-2,2.9-3.7,5.1-4.7l10.1-4.7
                c1.2-0.6,2.5-0.7,3.8-0.5l3.8,0.7
                c2,0.4,3.9,1.1,5.7,2.2l25.6,16.4
                l26.9,14l12,4.2
                c1.1,0.4,2.1,0.9,3,1.6l8.7,6.3
                c0.8,0.6,1.5,1.3,2,2.1l11.6,18.6
                c0.4,0.6,0.8,1.1,1.3,1.7l23.1,25.4"
              />

              <circle
                className="dot-start"
                cx="966.1"
                cy="163"
                r="5"
                fill="#8A8A8A"
              />

              <circle className="dot-end" r="5" fill="#8A8A8A " />
            </g>
          </g>
        </svg>
      </section>
    </div>
  );
}