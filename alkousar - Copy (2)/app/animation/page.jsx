"use client";

import { Words } from "../Components/text";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(TextPlugin, SplitText);

function Animationchars() {
  const text = useRef(null);

  const tl = gsap.timeline();

  useGSAP(() => {
    const split = SplitText.create(text.current, {
      type: "chars", // only split into words and lines (not characters)
      mask: "chars", // adds extra wrapper element around lines with overflow: clip (v3.13.0+)
    });

    tl.from(split.chars, {
      yPercent: 100,
      duration: 1,
      opacity: 0,
      ease: "power4.out",
      stagger: 0.01,
    });
    tl.to(split.chars, {
      y: "-20vw",
      duration: 0.5,
      opacity: 1,
      ease: "power2.in",
      stagger: 0.01,
    });
  });

  return (
    <div className="animation bg-stone-300 h-screen w-full ">
      <div
        className="text flex items-center justify-center text-black h-screen text-5xl font-bold "
        ref={text}
      >
        Al-Kousar Properties
      </div>
      {/* <Words typess="subheading" textss="Al-Kousar Properties" /> */}
    </div>
  );
}

export default Animationchars;
