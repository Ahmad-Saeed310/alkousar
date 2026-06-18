"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(TextPlugin, SplitText, ScrollTrigger);
const tl = gsap.timeline();

const types = {
  heading:
    " text-[6vw]  font-bold font  text-black leading-[10vh] tracking-tight",
  subheading: "text-[5vh] font-light text-black leading-none tracking-tight",
  paragraph: "text-[2vh] font-light text-black",
  small: "text-[4vh] font-light text-black",
  paragraph2: "text-[1.5vw ] font-light text-black",
};

function Texts({ type, texts, className }) {
  return <h3 className={`${types[type]} ${className || ""}`}>{texts}</h3>;
}
export { Texts };

function Chars({ type, texts }) {
  const refs = useRef(null);

  useGSAP(() => {
    const textss = SplitText.create(refs.current, {
      type: "chars", // only split into words and lines (not characters)
      mask: "chars", // adds extra wrapper element around lines with overflow: clip (v3.13.0+)
    });

    tl.from(textss.chars, {
      yPercent: 100,
      duration: 0.5,
      opacity: 0,
      ease: "power4.out",
      stagger: 0.05,
    });
  });

  return (
    <h3 className={types[type]} ref={refs}>
      {texts}
    </h3>
  );
}

export default Chars;
export { Hover };

function Words({ textss, typess, className }) {
  const word = useRef(null);
  useGSAP(() => {
    const wordss = SplitText.create(word.current, {
      type: "lines", // only split into words and lines (not characters)
      mask: "lines", // adds extra wrapper element around lines with overflow: clip (v3.13.0+)
    });

    gsap.from(wordss.lines, {
      y: "20vw",
      delay: 2.4,
      duration: 1,
      opacity: 0,
      ease: "power4.out",
      stagger: 0.01,
    });
  });

  return (
    <>
      <h3 className={`${types[typess]} ${className || ""}`} ref={word}>
        {textss}
      </h3>
    </>
  );
}

export { Words };



function ScrollWords({ textss, typess, className }) {
  const word = useRef(null);
  useGSAP(() => {
    const wordss = SplitText.create(word.current, {
      type: "lines", // only split into words and lines (not characters)
      mask: "lines", // adds extra wrapper element around lines with overflow: clip (v3.13.0+)
    });

    gsap.from(wordss.lines, {
      y: "20vw",
      duration: 1,
      opacity: 0,
      ease: "power4.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: word.current,
        start: "top 50%",
        end:"top 40%",
        markers: true,
        
        
      },
    });
  });

  return (
    <>
      <h3 className={`${types[typess]} ${className || ""}`} ref={word}>
        {textss}
      </h3>
    </>
  );
}

export { ScrollWords };

function Text({ type, texts, className }) {
  return <h3 className={`${types[type]} ${className || ""}`}>{texts}</h3>;
}

export { Text };

function Buttons({ type, texts, className, clickeds }) {
  return (
    <button onClick={clickeds} className={`${types[type]} ${className || ""}`}>
      {texts}
    </button>
  );
}

export { Buttons };

function Scrolltexts({ type, texts, className }) {
  useGSAP(() => {
    tl.fromTo(
      ".scroll",
      {
        xPercent: 100,
      },
      {
        xPercent: -100,
        opacity: 1,
        ease: "none",

        scrollTrigger: {
          trigger: ".scroll",
          start: "top 80%",
          end: "top 10%",
          scrub: 2,
          // markers: true,
        },
      },
    );
  });

  return (
    <h3 className={`scroll ${types[type]} ${className || ""}`}>{texts}</h3>
  );
}

export { Scrolltexts };
