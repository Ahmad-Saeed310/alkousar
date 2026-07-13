// "use client";

// import Image from "next/image";
// import { useState, useRef } from "react";
// import gsap from "gsap";
// import { SplitText } from "gsap/SplitText";

// import Text from "./../Components/text";

// gsap.registerPlugin(SplitText);

// const spaces = [
//   {
//     id: 1,
//     className: "col-span-2 row-span-2",
//     content: "House 1",
//     year: "2024",
//     img: "/House1.webp",
//   },
//   {
//     id: 2,
//     className: "col-span-1",
//     content: "House 2",
//     year: "2023",
//     img: "/House2.webp",
//   },
//   {
//     id: 3,
//     className: "col-span-1",
//     content: "House 3",
//     year: "2022",
//     img: "/House3.webp",
//   },
//   {
//     id: 4,
//     className: "row-start-3 col-span-1",
//     content: "House 4",
//     year: "2021",
//     img: "/House4.webp",
//   },
//   {
//     id: 5,
//     className: "row-start-3 col-span-1",
//     content: "Commercial",
//     year: "2025",
//     img: "/Commercial.webp",
//   },
//   {
//     id: 6,
//     className: "row-start-3 col-span-2 row-span-2",
//     content: "House 6",
//     year: "2020",
//     img: "/Home.webp",
//   },
// ];

// export default function BentoGrid({ items = spaces }) {
//   const [hoveredId, setHoveredId] = useState(null);

//   const textRefs = useRef({});
//   const splitRefs = useRef({});

//   const showText = (id) => {
//     const element = textRefs.current[id];

//     if (!element) return;

//     gsap.set(element, {
//       opacity: 1,
//     });

//     if (splitRefs.current[id]) {
//       splitRefs.current[id].revert();
//     }

//     const split = SplitText.create(element, {
//       type: "chars",
//     });

//     splitRefs.current[id] = split;

//     gsap.fromTo(
//       split.chars,

//       {
//         yPercent: 120,
//         opacity: 0,
//         rotateX: -90,
//       },

//       {
//         yPercent: 0,
//         opacity: 1,
//         rotateX: 0,
//         duration: 0.8,
//         stagger: 0.03,
//         ease: "power4.out",
//       },
//     );
//   };

//   const hideText = (id) => {
//     const split = splitRefs.current[id];

//     const element = textRefs.current[id];

//     if (!split || !element) return;

//     gsap.to(
//       split.chars,

//       {
//         yPercent: 120,
//         opacity: 0,
//         rotateX: -90,

//         duration: 0.6,

//         stagger: {
//           each: -0.03,
//           from: "end",
//         },

//         ease: "power4.in",

//         onComplete: () => {
//           split.revert();

//           gsap.set(element, {
//             opacity: 0,
//           });
//         },
//       },
//     );
//   };

//   return (
//     <section className="bg-black p-[2vh]">
//       <div
//         className="
//           grid
//           grid-cols-4
//           grid-rows-4
//           gap-[2vh]
//           min-h-[192vh]
//         "
//       >
//         {items.map((item) => {
//           const active = hoveredId === item.id;

//           const inactive = hoveredId !== null && hoveredId !== item.id;

//           return (
//             <div
//               key={item.id}
//               className={`
//                 ${item.className}

//                 flex
//                 flex-col
//               `}
//             >
//               {/* HEADER OUTSIDE IMAGE */}

//               <div
//                 className="
//                   flex
//                   justify-between
//                   items-center

//                   text-white
//                   uppercase
//                   tracking-wider

//                   text-xs
//                   md:text-sm

//                   mb-[1vh]
//                 "
//               >
//                 <span>{item.content}</span>

//                 <span>{item.year}</span>
//               </div>

//               {/* IMAGE */}

//               <div
//                 onMouseEnter={() => {
//                   setHoveredId(item.id);
//                   showText(item.id);
//                 }}
//                 onMouseLeave={() => {
//                   hideText(item.id);
//                   setHoveredId(null);
//                 }}
//                 className="
//                   relative
//                   overflow-hidden
//                   cursor-pointer
//                   group

//                   bg-green-400

//                   flex-1
//                 "
//               >
//                 <Image
//                   src={item.img}
//                   alt={item.content}
//                   fill
//                   className={`
//                     object-cover

//                     transition-all
//                     duration-700
//                     ease-out


//                     ${inactive ? "grayscale brightness-60" : "grayscale-0"}


//                     ${active ? "scale-105" : "scale-100"}
//                   `}
//                 />

//                 {/* CENTER HOVER TITLE */}

//                 <div
//                   className="
//                     absolute
//                     inset-0

//                     z-10

//                     flex
//                     items-center
//                     justify-center

//                     pointer-events-none
//                   "
//                 >
//                   <div
//                     ref={(el) => (textRefs.current[item.id] = el)}
//                     className="
//                       opacity-0
//                     "
//                   >
//                     <Text
//                       type="heading"
//                       texts={item.content}
//                       className="
//                         text-yellow-300
//                         text-center
//                       "
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }


"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

import Text from "./../Components/text";

gsap.registerPlugin(SplitText);

const spaces = [
  {
    id: 1,
    href: "/projects",
    className: "col-span-2 row-span-2",
    content: "Palaces",
    year: "2024",
    img: "/Projects/img-28.webp",
  },
  {
    id: 2,
    href: "/projects",
    className: "col-span-1",
    content: "Banglow",
    year: "2023",
    img: "/House2.webp",
  },
  {
    id: 3,
    href: "/projects",
    className: "col-span-1",
    content: "Flats",
    year: "2022",
    img: "/Projects/img-18.webp",
  },
  {
    id: 4,
    href: "/projects",
    className: "row-start-3 col-span-1",
    content: "Villas",
    year: "2021",
    img: "/Projects/img-27.webp",
  },
  {
    id: 5,
    href: "/projects",
    className: "row-start-3 col-span-1",
    content: "Offices",
    year: "2025",
    img: "/Commercial.webp",
  },
  {
    id: 6,
    href: "/projects",
    className: "row-start-3 col-span-2 row-span-2",
    content: "Commercial",
    year: "2020",
    img: "/Shops.webp",
  },
];

export default function BentoGrid({ items = spaces }) {
  const [hoveredId, setHoveredId] = useState(null);

  const textRefs = useRef({});
  const splitRefs = useRef({});

  const showText = (id) => {
    const element = textRefs.current[id];

    if (!element) return;

    gsap.set(element, { opacity: 1 });

    if (splitRefs.current[id]) splitRefs.current[id].revert();

    const split = SplitText.create(element, {
      type: "chars",
    });

    splitRefs.current[id] = split;

    gsap.fromTo(
      split.chars,
      {
        yPercent: 120,
        opacity: 0,
        rotateX: -90,
      },
      {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "power4.out",
      }
    );
  };

  const hideText = (id) => {
    const split = splitRefs.current[id];
    const element = textRefs.current[id];

    if (!split || !element) return;

    gsap.to(split.chars, {
      yPercent: 120,
      opacity: 0,
      rotateX: -90,
      duration: 0.6,
      stagger: {
        each: -0.03,
        from: "end",
      },
      ease: "power4.in",
      onComplete: () => {
        split.revert();
        gsap.set(element, { opacity: 0 });
      },
    });
  };

  return (
    <section className="bg-black p-4 md:p-[2vh]">
      {/* Mobile = Flex Column | Desktop = Original Grid */}
      <div
        className="
          flex flex-col gap-6

          md:grid
          md:grid-cols-4
          md:grid-rows-4
          md:gap-[2vh]
          md:min-h-[192vh]
        "
      >
        {items.map((item) => {
          const active = hoveredId === item.id;
          const inactive = hoveredId !== null && hoveredId !== item.id;

          return (
            <Link
              href={item.href}
              key={item.id}
              className={`
                flex flex-col
                h-[50vh]

                md:h-auto
                ${item.className}
              `}
            >
              {/* Header */}
              <div
                className="
                  flex
                  justify-between
                  items-center
                  text-white
                  uppercase
                  tracking-wider
                  text-xs
                  md:text-sm
                  mb-3
                "
              >
                <span>{item.content}</span>
                <span>{item.year}</span>
              </div>

              {/* Image */}
              <div
                onMouseEnter={() => {
                  if (window.innerWidth >= 768) {
                    setHoveredId(item.id);
                    showText(item.id);
                  }
                }}
                onMouseLeave={() => {
                  if (window.innerWidth >= 768) {
                    hideText(item.id);
                    setHoveredId(null);
                  }
                }}
                className="
                  relative
                  flex-1
                  overflow-hidden
                  group
                 
                "
              >
                <Image
                  src={item.img}
                  alt={item.content}
                  fill
                  className={`
                    object-cover
                    transition-all
                    duration-700
                    ease-out

                    ${
                      inactive
                        ? "md:grayscale md:brightness-60"
                        : "grayscale-0"
                    }

                    ${active ? "md:scale-105" : "scale-100"}
                  `}
                />

                {/* Hover Text (Desktop Only) */}
                <div
                  className="
                    absolute
                    inset-0
                    hidden
                    md:flex
                    items-center
                    justify-center
                    pointer-events-none
                    z-10
                  "
                >
                  <div
                    ref={(el) => (textRefs.current[item.id] = el)}
                    className="opacity-0"
                  >
                    <Text
                      type="heading"
                      texts={item.content}
                      className="text-yellow-300 text-center"
                    />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}