"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import Link from "next/link";

gsap.registerPlugin(TextPlugin, SplitText, ScrollTrigger);
const tl = gsap.timeline();

const types = {
  heading:
    " md:text-[6vw] text-[6vh]  figtree font-black text-black  md:leading-[10vh] leading-[.8] tracking-tight ",
    display: "md:text-[6vw] text-[4vh] figtree   font-bold text-black  md:leading-[10vh] leading-[.8] tracking-tight ",
  subheading: "text-[2vw] figtree font-light text-black  leading-none tracking-tight",
  page: "text-[1.1vw] font-light text-black leading-none tracking-tight break-keep",
  paragraph: "text-[2vh] font-light text-black",
  small: "text-[4vh] font-light text-black",
  paragraph2: "text-[1.2vw ] font-regular text-black",
  link: " text-[2vh] font-light text-black ",
};

function Texts({ type, texts, className }) {
  return <h3 className={`${types[type]} ${className || ""}`}>{texts}</h3>;
}
export { Texts };

function Chars({ type, texts, className }) {
  const refs = useRef(null);

  useGSAP(() => {
    const textss = SplitText.create(refs.current, {
      type: "chars", // only split into words and lines (not characters)
      mask: "chars", // adds extra wrapper element around lines with overflow: clip (v3.13.0+)
    });

    gsap.from(textss.chars, {
      yPercent: 100,
      duration: 0.5,
      opacity: 0,
      ease: "power4.out",
      stagger: 0.05,
    });
  });

  return (
    <h3 className={`${types[type]} ${className || ""}`} ref={refs}>
      {texts}
    </h3>
  );
}

export default Chars;
export { Hover };

function Words({ textss, typess, className, link, playIntro = true }) {
  const word = useRef(null);

  useGSAP(() => {
    const wordss = SplitText.create(word.current, {
      type: "lines",
      mask: "lines",
    });

    gsap.from(wordss.lines, {
      y: "20vw",
      duration: 1,
      opacity: 0,
      ease: "power4.out",
      stagger: 0.01,
      delay: playIntro ? 2.4 : 0,
    });
  }, [playIntro]);

  return (
    <>
      <Link href={link}>
        <h3 ref={word} className={`${types[typess]} ${className || ""}`}>
          {textss}
        </h3>
      </Link>
    </>
  );
}

export { Words };
function GalleryWords({ textss, typess, className, link }) {
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
      stagger: 0.01,
    });
  });

  console.log("link:", link);
  return (
    <>
      <Link href={link}>
        <h3 ref={word} className={`${types[typess]} ${className}`}>
          {textss}
        </h3>
      </Link>
    </>
  );
}

export { GalleryWords };

function ScrollWords({ textss, typess, className }) {
  const word = useRef(null);
  useGSAP(() => {
    const wordss = SplitText.create(word.current, {
      type: "lines", // only split into words and lines (not characters)
      mask: "lines", // adds extra wrapper element around lines with overflow: clip (v3.13.0+)
    });

    gsap.from(wordss.lines, {
      display: "block",
      width: "100%",
      color: "#fff",
      stagger: 0.1,
      y: "20vw",
      duration: 1,
      opacity: 0,
      ease: "power4.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: word.current,
        start: "top 70%",
        end: "top 40%",
        // markers: true,
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
        xPercent: -70,
        opacity: 1,
        ease: "none",

        scrollTrigger: {
          trigger: ".scroll",
          start: "top 95%",
          end: "top 10%",
          scrub: 9,
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

function Animateword({ text, classname, typess }) {
  const texts = useRef(null);

  const tl = gsap.timeline();

  useGSAP(() => {
    const split = SplitText.create(texts.current, {
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
    // tl.to(split.chars, {
    //   y: "-20vw",
    //   duration: 0.5,
    //   opacity: 1,
    //   ease: "power2.in",
    //   stagger: 0.01,
    // });
  });

  return (
    <>
      <h3 className={`${types[typess]} ${classname || ""}`} ref={texts}>
        {text}
      </h3>
    </>
  );
}

export { Animateword };

export function Marquee({ text = "Your marquee text goes here ", speed = 10 }) {
  const repeated = Array(10).fill(text);

  return (
    <div className="w-full overflow-hidden whitespace-nowrap bg-stone-100 ">
      <div
        className="inline-flex gap-16"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        {repeated.map((t, i) => (
          <span
            key={i}
            className="text-[10vw] font-semibold tracking-tight text-black shrink-0"
          >
            {t}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export const ImageAnimation = ({ source, description, classname }) => {
  const imageRef = useRef(null);

  useGSAP(() => {
    gsap.from(imageRef.current, {
      scaleY: 0,
    transformOrigin: "top",
    duration: .8,
    ease: "power4.out",
    scrollTrigger: {
      trigger: imageRef.current,
      start: "top 90%",
      end: "top 70%",
      },
    });
  });

  return (
    <div ref={imageRef} className={classname}>
      <Image
        src={source}
        alt={description}
        fill
        className="object-cover"
      />
    </div>
  );
};