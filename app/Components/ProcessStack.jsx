// "use client";

// import Image from "next/image";
// import { useEffect, useRef } from "react";
// import Cards from "./Cards";

// const steps = [
//   {
//     id: "01",
//     title: "Consultation",
//     desc: "Tell us your budget, purpose, and preferred sector — whether you're buying to build, to invest, or to resell later. We factor in your timeline too, then shortlist only the plots and properties in DHA Bahawalpur that genuinely match, instead of sending you options that were never right for you in the first place.",
//     img: "/Home.webp",
//   },
//   {
//     id: "02",
//     title: "Site Visit",
//     desc:" We arrange a guided visit to every shortlisted option in DHA Bahawalpur, walking you through the plot boundaries, nearby development, and access roads in person. You see exactly what you're buying — not just photos and a listing sheet — so there are no surprises once the paperwork starts.",
//     img: "/House1.webp",
//   },
//   {
//     id: "03",
//     title: "Documentation",
//     desc: "We verify ownership, prepare transfer paperwork, and handle DHA formalities on your behalf — chain of title, NOC status, and any outstanding dues get checked before you sign anything. You get a clean, DHA-recognised transfer, without having to chase departments or paperwork yourself.",
//     img: "/Apartments.webp",
//   },
//   {
//     id: "04",
//     title: "Handover",
//     desc: "Once payment and paperwork are complete, we hand over your file — ownership documents, DHA correspondence, everything — and stay reachable long after that. If a question comes up six months later about your plot or your file, you can still call us.",
//     img: "/residence.webp",
//   },
// ];

// // Same scroll-driven stacking mechanic as StackingCard.jsx (manual scroll
// // listener + getBoundingClientRect, no ScrollTrigger), generalized to N
// // cards instead of the hardcoded 3. Each card scales down / rotates as the
// // next one approaches the top of the viewport, then the next card sticks
// // and covers it.
// export default function ProcessStack() {
//   const cardMap = useRef(new Map());

//   useEffect(() => {
//     function onScroll() {
//       const vh = window.innerHeight;
//       const cards = steps.map((s) => cardMap.current.get(s.id));

//       for (let i = 0; i < cards.length - 1; i++) {
//         const card = cards[i];
//         const next = cards[i + 1];
//         if (!card || !next) continue;

//         const rect = next.getBoundingClientRect();
//         // 0 when next card's bottom edge enters the screen, 1 when it reaches the top
//         const p = Math.min(Math.max((vh - rect.top) / vh, 0), 1);
//         const scale = 1 - p * 0.15;
//         const rotate = (i % 2 === 0 ? 1 : -1) * p * 8;

//         card.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
//         card.style.transformOrigin = "center center";
//       }
//     }

//     window.addEventListener("scroll", onScroll, { passive: true });
//     onScroll();
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <section
//       className="relative bg-black"
//       style={{ height: `${steps.length * 100}vh` }}
//     >
//       {steps.map((step, i) => (
//         <div
//           key={step.id}
//           className="sticky top-0 h-screen w-full"
//           style={{ zIndex: i + 1 }}
//         >
//           <div
//             ref={(el) => {
//               if (el) cardMap.current.set(step.id, el);
//               else cardMap.current.delete(step.id);
//             }}
//             className="relative h-full w-full overflow-hidden flex items-center"
//             style={{ willChange: "transform" }}
//           >
//             {/* <Image
//               src={step.img}
//               alt={step.title}
//               fill
//               className="object-cover "
//             />
//             <div className="absolute inset-0 bg-black/50" />

//             <div className="relative z-10 px-[6vw] md:px-[8vw] max-w-[80vw] md:max-w-[45vw]">
//               <span className="text-white/40 font-mono text-[4vw] md:text-[1.1vw]">
//                 {step.id}
//               </span>
//               <h3 className="text-white font-black leading-none text-[9vw] md:text-[4.2vw] sanss mt-[1vh] mb-[2vh]">
//                 {step.title}
//               </h3>
//               <p className="text-white/70 text-[4vw] md:text-[1.3vw] leading-snug max-w-[90vw] md:max-w-[38vw]">
//                 {step.desc}
//               </p>
//             </div> */}
//           <Cards
//             text={`(${step.id})`}
//             title={step.title}
//             Images={step.img}
//             details={step.desc}
//           />
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Cards from "./Cards";

const steps = [
  {
    id: "01",
    title: "Consultation",
    desc: "Tell us your budget, purpose, and preferred sector — whether you're buying to build, to invest, or to resell later. We factor in your timeline too, then shortlist only the plots and properties in DHA Bahawalpur that genuinely match, instead of sending you options that were never right for you in the first place.",
    img: "/Home.webp",
  },
  {
    id: "02",
    title: "Site Visit",
    desc:" We arrange a guided visit to every shortlisted option in DHA Bahawalpur, walking you through the plot boundaries, nearby development, and access roads in person. You see exactly what you're buying — not just photos and a listing sheet — so there are no surprises once the paperwork starts.",
    img: "/House1.webp",
  },
  {
    id: "03",
    title: "Documentation",
    desc: "We verify ownership, prepare transfer paperwork, and handle DHA formalities on your behalf — chain of title, NOC status, and any outstanding dues get checked before you sign anything. You get a clean, DHA-recognised transfer, without having to chase departments or paperwork yourself.",
    img: "/Apartments.webp",
  },
  {
    id: "04",
    title: "Handover",
    desc: "Once payment and paperwork are complete, we hand over your file — ownership documents, DHA correspondence, everything — and stay reachable long after that. If a question comes up six months later about your plot or your file, you can still call us.",
    img: "/residence.webp",
  },
];

// Same scroll-driven stacking mechanic as StackingCard.jsx (manual scroll
// listener + getBoundingClientRect, no ScrollTrigger), generalized to N
// cards instead of the hardcoded 3. Each card scales down / rotates as the
// next one approaches the top of the viewport, then the next card sticks
// and covers it.
//
// Desktop: renders <Cards /> as before, with the scale+rotate twist.
// Mobile: bypasses <Cards /> and renders a flex-row layout instead — image
// on one side, text on the other, with the id and title sharing a line —
// and the stacking rotation is turned off so cards just stack flat.
export default function ProcessStack() {
  const cardMap = useRef(new Map());
  const isMobileRef = useRef(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    isMobileRef.current = mql.matches;
    function onChange(e) {
      isMobileRef.current = e.matches;
    }
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    function onScroll() {
      const vh = window.innerHeight;
      const cards = steps.map((s) => cardMap.current.get(s.id));

      for (let i = 0; i < cards.length - 1; i++) {
        const card = cards[i];
        const next = cards[i + 1];
        if (!card || !next) continue;

        const rect = next.getBoundingClientRect();
        // 0 when next card's bottom edge enters the screen, 1 when it reaches the top
        const p = Math.min(Math.max((vh - rect.top) / vh, 0), 1);
        const scale = 1 - p * 0.15;

        // Mobile: flat stack, no rotation. Desktop: alternating twist.
        const rotate = isMobileRef.current ? 0 : (i % 2 === 0 ? 1 : -1) * p * 8;

        card.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
        card.style.transformOrigin = "center center";
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="relative bg-black"
      style={{ height: `${steps.length * 100}vh` }}
    >
      {steps.map((step, i) => (
        <div
          key={step.id}
          className="sticky top-0 h-screen w-full"
          style={{ zIndex: i + 1 }}
        >
          <div
            ref={(el) => {
              if (el) cardMap.current.set(step.id, el);
              else cardMap.current.delete(step.id);
            }}
            className="relative h-full w-full overflow-hidden flex items-center"
            style={{ willChange: "transform" }}
          >
            {/* Desktop: existing Cards component, unchanged */}
            <div className="hidden md:flex w-full h-full items-center">
              <Cards
                text={`(${step.id})`}
                title={step.title}
                Images={step.img}
                details={step.desc}
              />
            </div>

            {/* Mobile: stacked top-to-bottom — id+title row, then image, then text */}
            <div className="flex md:hidden flex-col w-full h-full justify-center bg-stone-100 text-black gap-[4vw] px-[6vw]">
              <div className="flex flex-row gap-[1vw]">
                <span className="text-black font-mono text-[4vw] shrink-0">
                  ({step.id})
                </span>
                <h3 className="text-black font-black leading-none text-[7vw] sanss">
                  {step.title}
                </h3>
              </div>

              <div className="relative w-full h-[40vh] shrink-0 overflow-hidden">
                <Image
                  src={step.img}
                  alt={step.title}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="text-black md:text-[3.4vw] text-[4vw] leading-snug">
                {step.desc}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}