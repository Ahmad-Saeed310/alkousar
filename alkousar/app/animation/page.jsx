// "use client";

// import { Words } from "../Components/text";

// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { useRef } from "react";
// import { TextPlugin } from "gsap/TextPlugin";
// import { SplitText } from "gsap/SplitText";

// gsap.registerPlugin(TextPlugin, SplitText);

// function Animationchars() {
//   const text = useRef(null);

//   const tl = gsap.timeline();

//   useGSAP(() => {
//     const split = SplitText.create(text.current, {
//       type: "chars",
//       mask: "chars",
//     });

//     tl.from(split.chars, {
//       yPercent: 100,
//       duration: 1,
//       opacity: 0,
//       ease: "power4.out",
//       stagger: 0.01,
//     });
//     tl.to(split.chars, {
//       y: "-20vw",
//       duration: 0.5,
//       opacity: 1,
//       ease: "power2.in",
//       stagger: 0.01,
//     });
//   });

 



//   return (
//     <div className="animation bg-stone-300 h-screen w-full relative ">
//       <div
//         className="text flex font items-center justify-center text-black h-full text-5xl font-bold "
//         ref={text}
//       >
//         Al-Kousar Properties
//       </div>
//       {/* <Words typess="subheading" textss="Al-Kousar Properties" /> */}
//       <div className="line w-full absolute top-0 h-[1vh]  bg-black overflow-hidden"> h</div>
//       <div className="circle h-[5vh] w-[5vh] absolute bottom-0 right-0"></div>
//     </div>
//   );
// }

// export default Animationchars;


"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { TextPlugin } from "gsap/TextPlugin";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(TextPlugin, SplitText);

function Animationchars({ progress = 0, onComplete }) {
  const text = useRef(null);
  const line = useRef(null);
  const circle = useRef(null);
  const container = useRef(null);
  const splitRef = useRef(null);
  const hasExited = useRef(false);

  // Runs once: circle spin + word entrance
  useGSAP(() => {
    gsap.to(circle.current, {
      rotate: 360,
      duration: 1,
      repeat: -1,
      ease: "linear",
    });

    splitRef.current = SplitText.create(text.current, {
      type: "chars",
      mask: "chars",
    });

    gsap.from(splitRef.current.chars, {
      yPercent: 100,
      duration: 1,
      opacity: 0,
      ease: "power4.out",
      stagger: 0.01,
    });
  }, []);

  // Runs every time progress updates
  useGSAP(() => {
    gsap.to(line.current, {
      width: `${progress}%`,
      duration: 0.3,
      ease: "none",
    });

    if (progress >= 100 && !hasExited.current && splitRef.current) {
      hasExited.current = true;

      const tl = gsap.timeline({
        onComplete: () => onComplete?.(),
      });

      tl.to(splitRef.current.chars, {
        yPercent: -100,
        duration: 0.5,
        opacity: 0,
        ease: "power2.in",
        stagger: 0.01,
      });

      tl.to(container.current, {
        yPercent: -100,
        duration: 0.6,
        ease: "power3.inOut",
      }, "-=0.1");
    }
  }, [progress]);

  return (
    <div
      ref={container}
      className="animation bg-stone-300 h-screen w-full fixed top-0 left-0 z-50"
    >
      <div
        className="text flex items-center justify-center text-black h-full text-5xl font-bold"
        ref={text}
      >
        Al-Kousar Properties
      </div>

      <div className="w-full absolute top-0 h-[1vh] bg-stone-400 overflow-hidden">
        <div ref={line} className="h-full bg-black" style={{ width: "0%" }} />
      </div>

      <div
        ref={circle}
        className="h-[5vh] w-[5vh] absolute bottom-4 right-4 border-2 border-black border-t-transparent rounded-full"
      />
    </div>
  );
}

export default Animationchars;