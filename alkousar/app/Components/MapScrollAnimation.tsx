"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(
  ScrollTrigger,
  MotionPathPlugin
);

export default function MapJourney() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const path = document.querySelector(
        ".path"
      ) as SVGPathElement;

      const pov = document.querySelector(
        ".pov"
      ) as SVGGElement;

      const povInner = document.querySelector(
        ".pov-inner"
      ) as SVGGElement;


      if (!path || !pov || !povInner) return;


      const length = path.getTotalLength();


      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });


      /*
        Initial camera position
        Center camera and zoom
      */
      gsap.set(pov, {
        x: 750,
        y: 750,
        scale: 2.5,
        transformOrigin: "0 0"
      });


      /*
        Put camera on starting point
      */
      gsap.set(povInner, {
        x: -757,
        y: -557
      });



      const xTo = gsap.quickTo(
        povInner,
        "x",
        {
          duration: 1,
          ease: "expo"
        }
      );


      const yTo = gsap.quickTo(
        povInner,
        "y",
        {
          duration: 1,
          ease: "expo"
        }
      );



      const tl = gsap.timeline({

        scrollTrigger: {

          trigger:"#journey",

          start:"top top",

          end:"bottom bottom",

          pin:".map",

          scrub:1,


          onUpdate:()=>{

            const dotX =
              gsap.getProperty(
                ".dot-end",
                "x"
              ) as number;


            const dotY =
              gsap.getProperty(
                ".dot-end",
                "y"
              ) as number;


            // move map opposite direction
            xTo(-dotX);
            yTo(-dotY);

          }

        }

      });



      // draw route
      tl.to(
        path,
        {
          strokeDashoffset:0
        },
        0
      );


      // move marker
      tl.to(
        ".dot-end",
        {
          motionPath:{
            path:path,
            align:path,
            autoRotate:false
          }
        },
        0
      );


      // zoom while travelling
      tl.fromTo(
        pov,
        {
          scale:1
        },
        {
          scale:2.5,
          ease:"power1.inOut"
        },
        0
      );


    }, containerRef);


    return()=>ctx.revert();

  },[]);



  return (

    <div ref={containerRef}>


      <section
        id="journey"
        className="relative h-[300vh]"
      >


        <svg
          className="map absolute top-0 left-0 h-screen w-screen"
          viewBox="0 0 1500 1500"
          preserveAspectRatio="xMidYMid slice"
        >


          <g className="pov">


            <g className="pov-inner">


              <image
                href="/Map2.svg"
                width="1500"
                height="1500"
              />


              <path
                className="path"
                fill="none"
                stroke="#ff4d4d"
                strokeWidth="8"
                d="
M757.3,554.83
l3.23,92.34
l-1.7,93.28
l-5.45,122.89
c0,0-34.72,80.68-32.68,84.09
c2.04,3.4,12.34-23.33,12.34-23.33
s75.15,36.27,84,45.12
s12.26,22.81,26.55,36.09
c14.3,13.28,48,23.15,48,23.15
"
              />


              <circle
                className="dot-start"
                cx="757.3"
                cy="557.3"
                r="10"
                fill="#00ff88"
              />


              <circle
                className="dot-end"
               
                r="10"
                fill="#fff600"
              />


            </g>

          </g>


        </svg>


      </section>


    </div>

  );
}