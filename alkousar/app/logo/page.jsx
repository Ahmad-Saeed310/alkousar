"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Page() {
  const names = [
    {
      id: 1,
      name: "Alkousar",
    },
    {
      id: 2,
      name: "Alkousar",
    },
    {
      id: 3,
      name: "Alkousar",
    },
    {
      id: 4,
      name: "Alkousar",
    },
    {
      id: 5,
      name: "Alkousar",
    },
    {
      id: 6,
      name: "Alkousar",
    },
    {
      id: 7,
      name: "Alkousar",
    },
    {
      id: 8,
      name: "Alkousar",
    },
    {
      id: 9,
      name: "Alkousar",
    },
    {
      id: 10,
      name: "Alkousar",
    },
    {
      id: 12,
      name: "Alkousar",
    },
    {
      id: 16,
      name: "Alkousar",
    },
    {
      id: 17,
      name: "Alkousar",
    },
    {
      id: 18,
      name: "Alkousar",
    },
    {
      id: 19,
      name: "Alkousar",
    },
    {
      id: 20,
      name: "Alkousar",
    },
    {
      id: 21,
      name: "Alkousar",
    },
    {
      id: 22,
      name: "Alkousar",
    },
    {
      id: 23,
      name: "Alkousar",
    },
    {
      id: 24,
      name: "Alkousar",
    },
    {
      id: 25,
      name: "Alkousar",
    },
    {
      id: 26,
      name: "Alkousar",
    },
    {
      id: 27,
      name: "Alkousar",
    },
    {
      id: 28,
      name: "Alkousar",
    },
  ];

  useGSAP(() => {
    gsap.to(".marquee", {
      xPercent: -100,
      duration: 10,
      ease: "none",
      repeat: -1,
    });
  });

  return (
    <>
      <div className="h-[10vh] w-full bg-stone-100 overflow-hidden">
        <div className="h-full w-full flex  justify-center text-black gap-[5vw] marquee ">
          {[...names, ...names].map((name) => (
            <div
              key={name.id}
              className="text-black whitespace-nowrap text-2xl"
            >
              {name.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Page;
