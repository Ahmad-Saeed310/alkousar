"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

import Text from "./../Components/text";

gsap.registerPlugin(SplitText);

const spaces = [
  {
    id: 1,
    className: "col-span-2 row-span-2",
    content: "House 1",
    year: "2024",
    img: "/House1.png",
  },
  {
    id: 2,
    className: "col-span-1",
    content: "House 2",
    year: "2023",
    img: "/House2.png",
  },
  {
    id: 3,
    className: "col-span-1",
    content: "House 3",
    year: "2022",
    img: "/House3.png",
  },
  {
    id: 4,
    className: "row-start-3 col-span-1",
    content: "House 4",
    year: "2021",
    img: "/House4.png",
  },
  {
    id: 5,
    className: "row-start-3 col-span-1",
    content: "Commercial",
    year: "2025",
    img: "/Commercial.png",
  },
  {
    id: 6,
    className: "row-start-3 col-span-2 row-span-2",
    content: "House 6",
    year: "2020",
    img: "/Home.png",
  },
];


export default function BentoGrid({ items = spaces }) {
  const [hoveredId, setHoveredId] = useState(null);

  const textRefs = useRef({});
  const splitRefs = useRef({});


  const showText = (id) => {
    const element = textRefs.current[id];

    if (!element) return;


    gsap.set(element, {
      opacity: 1,
    });


    if (splitRefs.current[id]) {
      splitRefs.current[id].revert();
    }


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


    gsap.to(
      split.chars,

      {
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

          gsap.set(element, {
            opacity: 0,
          });
        },
      }
    );
  };


  return (
    <section className="bg-black p-[2vh]">

      <div
        className="
          grid
          grid-cols-4
          grid-rows-4
          gap-[2vh]
          min-h-[192vh]
        "
      >

        {items.map((item) => {

          const active = hoveredId === item.id;

          const inactive =
            hoveredId !== null &&
            hoveredId !== item.id;


          return (

            <div
              key={item.id}
              className={`
                ${item.className}

                flex
                flex-col
              `}
            >


              {/* HEADER OUTSIDE IMAGE */}

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

                  mb-[1vh]
                "
              >

                <span>
                  {item.content}
                </span>


                <span>
                  {item.year}
                </span>

              </div>



              {/* IMAGE */}

              <div

                onMouseEnter={() => {
                  setHoveredId(item.id);
                  showText(item.id);
                }}

                onMouseLeave={() => {
                  hideText(item.id);
                  setHoveredId(null);
                }}

                className="
                  relative
                  overflow-hidden
                  cursor-pointer
                  group

                  bg-green-400

                  flex-1
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
                        ? "grayscale brightness-60"
                        : "grayscale-0"
                    }


                    ${
                      active
                        ? "scale-105"
                        : "scale-100"
                    }
                  `}
                />



                {/* CENTER HOVER TITLE */}

                <div
                  className="
                    absolute
                    inset-0

                    z-10

                    flex
                    items-center
                    justify-center

                    pointer-events-none
                  "
                >

                  <div
                    ref={(el) =>
                      (textRefs.current[item.id] = el)
                    }

                    className="
                      opacity-0
                    "
                  >

                    <Text
                      type="heading"
                      texts={item.content}

                      className="
                        text-yellow-300
                        text-center
                      "
                    />

                  </div>

                </div>


              </div>


            </div>

          );

        })}

      </div>

    </section>
  );
}