// import Image from "next/image";
// import { ImageAnimation, ScrollWords } from "./text";

// const data = [
//     {
//         id: 1,
//         heading: "Ranked 1st in DHA Bwp",
//         content: "DHA Bahawalpur reviews its authorised dealers every year on trust,professionalism, and how well they serve the community. For 2025, Al-KousarProperties was ranked 1st among every dealer in DHA Bahawalpur —recognition earned through consistent, honest service to the families andinvestors we work with, not just sales numbers. It's a standard we intend to keepearning every year, not something we consider settled.",
//         img: [
//             "/House1.webp",
//             "/House2.webp",

//         ],
//         layout: {
//             heading: "col-start-2 col-span-4 row-start-3 sanss  ",
//             content: "col-start-2 col-span-4 row-start-4 row-span-2 ",
//             img: ["col-start-2 col-span-2 bg-red-300 row-start-1 row-span-2 ",
//                 "col-start-4 col-span-2 row-start-1 row-span-2",],
//         }
//     },
//     {
//         id: 2,
//         heading: "A 100% Recommend Rating",
//         content: "Every one of our 26 verified client reviews recommends Al-Kousar Properties — not most of them, all of them. That comes from being upfront about pricing and timelines from the first conversation, showing up for site visits in person, and staying reachable long after a deal has closed. We'd rather close a sale slower and honestly than fast and at the cost of someone's trust.",
//         img: [
//             "/project-4-1.webp",
//             "/project-4-2.webp",
//             "/project-4-3.webp",

//         ],
//         layout: {
//             heading: "col-start-2 col-span-5 row-start-1 row-span-1 self-end sanss ",
//             content: "col-start-2 col-span-4 row-start-2",
//             img: ["col-start-1 col-span-2 row-start-4 row-span-2", "col-start-3 col-span-2 row-start-4 row-span-2", "col-start-5 col-span-2 row-start-4 row-span-2"],
//         }
//     },
//     {
//         id: 3,
//         heading: " DHA-Dealer Reg # 222",
//         content: "DHA Bahawalpur reviews its authorised dealers every year on trust, professionalism, and how well they serve the community. For 2025, Al-Kousar Properties was ranked 1st among every dealer in DHA Bahawalpur — recognition earned through consistent, honest service to the families and investors we work with, not just sales numbers. It's a standard we intend to keep earning every year, not something we consider settled.",
//         img: [
//             "/project-3-1.webp",

//         ],
//         layout: {
//             heading: "col-start-1 col-span-4 col-start-2 row-start-1 sanss ",
//             content: "col-start-2 col-span-4 row-start-5",
//             img: ["col-start-2 col-span-3 row-start-2 row-span-3"],
//         }
//     }

// ]


// export default function Design() {
//     return (
//         <>
//             <div className="design h-[300vh]  w-full relative">
//                 {
//                     data.map((item) => (
//                         <div key={item.id} className="design-content bg-stone-100  h-screen w-full grid grid-cols-6 grid-rows-5 gap-[1vw] p-[2vw] ">
//                             <ScrollWords className={` font-bold figtree  text-[5vw]  self-end ${item.layout.heading}`} textss={item.heading} />
//                             <ScrollWords className={`text-[1.7vw] wrap-normal leading-none tracking-tight  ${item.layout.content} `} textss={item.content} />
//                             {item.img.map((src, index) => (
//                                 <ImageAnimation key={index} source={src} description={`Design ${index + 1}`} classname={`w-full object-cover h-full  ${item.layout.img[index]}`} />
//                             ))}
//                             <ScrollWords />
//                         </div>
//                     ))
//                 }
//             </div>

//         </>
//     )
// }
"use client";

import { useEffect, useRef } from "react";
import { ImageAnimation, ScrollWords } from "./text";

 const data = [
    {
        id: 1,
        heading: "Ranked 1st in DHA Bwp",
        content: "DHA Bahawalpur reviews its authorised dealers every year on trust,professionalism, and how well they serve the community. For 2025, Al-KousarProperties was ranked 1st among every dealer in DHA Bahawalpur —recognition earned through consistent, honest service to the families andinvestors we work with, not just sales numbers. It's a standard we intend to keepearning every year, not something we consider settled.",
        img: [
            "/Award.png",
            "/Award2.png",

        ],
        layout: {
            heading: "col-start-2 col-span-4 row-start-3 sanss  ",
            content: "col-start-2 col-span-4 row-start-4 row-span-2 ",
            img: ["col-start-2 col-span-2 bg-red-300 row-start-1 row-span-2 ",
                "col-start-4 col-span-2 row-start-1 row-span-2",],
        }
    },
    {
        id: 2,
        heading: "A 100% Recommend Rating",
        content: "Every one of our 26 verified client reviews recommends Al-Kousar Properties — not most of them, all of them. That comes from being upfront about pricing and timelines from the first conversation, showing up for site visits in person, and staying reachable long after a deal has closed. We'd rather close a sale slower and honestly than fast and at the cost of someone's trust.",
        img: [
            "/project-4-1.webp",
            "/project-4-2.webp",
            "/project-4-3.webp",

        ],
        layout: {
            heading: "col-start-2 col-span-5 row-start-1 row-span-1 self-end sanss ",
            content: "col-start-2 col-span-4 row-start-2",
            img: ["col-start-1 col-span-2 row-start-4 row-span-2", "col-start-3 col-span-2 row-start-4 row-span-2", "col-start-5 col-span-2 row-start-4 row-span-2"],
        }
    },
    {
        id: 3,
        heading: " DHA-Dealer Reg # 222",
        content: "DHA Bahawalpur reviews its authorised dealers every year on trust, professionalism, and how well they serve the community. For 2025, Al-Kousar Properties was ranked 1st among every dealer in DHA Bahawalpur — recognition earned through consistent, honest service to the families and investors we work with, not just sales numbers. It's a standard we intend to keep earning every year, not something we consider settled.",
        img: [
            "/project-3-1.webp",

        ],
        layout: {
            heading: "col-start-1 col-span-4 col-start-2 row-start-1 sanss ",
            content: "col-start-2 col-span-4 row-start-5",
            img: ["col-start-2 col-span-3 row-start-2 row-span-3"],
        }
    }

]

export default function Design() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;

      cardRefs.current.forEach((card) => {
        if (card) {
          card.style.transform = "scale(1) rotate(0deg)";
        }
      });

      for (let i = 0; i < cardRefs.current.length - 1; i++) {
        const current = cardRefs.current[i];
        const next = cardRefs.current[i + 1];

        if (!current || !next) continue;

        const rect = next.getBoundingClientRect();

        const progress = Math.min(
          Math.max((vh - rect.top) / vh, 0),
          1
        );

        current.style.transform = `
          scale(${1 - progress * 0.18})
          rotate(${progress * (i % 2 === 0 ? 10 : -10)}deg)
        `;

        current.style.transformOrigin = "center center";
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="relative bg-stone-100"
      style={{ height: `${data.length * 100}vh` }}
    >
      {data.map((item, index) => (
        <div
          key={item.id}
          className="sticky top-0 h-screen"
          style={{ zIndex: index + 1 }}
        >
          <div
            ref={(el) => (cardRefs.current[index] = el)}
            className="
              h-screen
              bg-stone-100
              overflow-hidden

              flex
              flex-col
              gap-5
              p-5

              md:grid
              md:grid-cols-6
              md:grid-rows-5
              md:gap-[1vw]
              md:p-[2vw]
            "
          >
            {/* Heading */}
            <ScrollWords
              textss={item.heading}
              className={`
                text-[10vw]
                leading-none
                font-bold

                md:text-[5vw]
                md:self-end

                ${item.layout.heading}
              `}
            />

            {/* Images */}
            <div
              className="
                flex
                flex-col
                gap-3
                h-[45vh]

                md:contents
              "
            >
              {item.img.map((src, i) => (
                <ImageAnimation
                  key={i}
                  source={src}
                  description={item.heading}
                  classname={`
                    flex-1
                    w-full
                    object-cover
                    rounded-xl

                    md:rounded-none

                    ${item.layout.img[i]}
                  `}
                />
              ))}
            </div>

            {/* Content */}
            <ScrollWords
              textss={item.content}
              className={`
                text-[4.2vw]
                leading-snug

                md:text-[1.7vw]
                md:leading-none

                ${item.layout.content}
              `}
            />
          </div>
        </div>
      ))}
    </div>
  );
}