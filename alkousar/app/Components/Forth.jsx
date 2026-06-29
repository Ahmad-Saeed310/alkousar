"use client";
import { useGSAP } from "@gsap/react";
import { ScrollWords } from "./text";
import { useEffect, useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger.js";

import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

import gsap from "gsap";

function Forth() {
  const container = useRef(null);

  useEffect(() => {
    const el = container.current;

    // const wheel = (e) => {
    //   if (e.deltaY !== 0) {
    //     e.preventDefault();
    //     el.scrollLeft += e.deltaY;
    //   }
    // };

    el.addEventListener("wheel", { passive: false });

    return () => {
      el.removeEventListener("wheel");
    };
  }, []);

  useGSAP(() => {
    gsap.from(".gallery", {
      xPercent: 100,
      duration: 0.5,
      opacity: 0,
      scrollTrigger: {
        trigger: ".gallery",
        start: "top 60%",
        end: "top 50%",
        scrub: 1,
        // markers: true,
      },
    });
  });

  const properties = [
    {
      id: 1,
      title: "5 Marla Plot",
      image: "/project-3-1.png",
    },
    {
      id: 2,
      title: "10 Marla House",
      image: "/project-3-2.png",
    },
    {
      id: 3,
      title: "Commercial Shop",
      image: "/project-3-3.png",
    },
    {
      id: 4,
      title: "5 Marla Plot",
      image: "/project-3-4.png",
    },
    {
      id: 5,
      title: "10 Marla House",
      image: "/project-3-5.png",
    },
    {
      id: 6,
      title: "Commercial Shop",
      image: "/project-3-6.png",
    },
    {
      id: 7,
      title: "Commercial Shop",
      image: "/project-3-7.png",
    },
    {
      id: 8,
      title: "5 Marla Plot",
      image: "/project-4-1.png",
    },
    {
      id: 9,
      title: "10 Marla House",
      image: "/project-4-2.png",
    },
    {
      id: 10,
      title: "Commercial Shop",
      image: "/project-4-3.png",
    },
  ];

  useGSAP(() => {
    gsap.from(".animatey", {
      xPercent: 100,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".animatey",
        start: "top 80%",
      },
    });
  });

  return (
    <>
      <div className="first h-auto w-full bg-stone-100 overflow-hidden z-50">
        {/* <div className="1st h-full w-full pt-[8vh]">
          <ScrollWords textss={`About`} typess={`subheading`} />
          <ScrollWords
            textss={
              <>
                With years of trusted experience in DHA Bahawalpur's real estate{" "}
                <br /> market, we help families and investors find properties
                that match their <br /> vision and budget. From your first
                inquiry to the final handover, we <br /> ensure a transparent
                and seamless journey. Our goal is simple — <br /> making
                property investment in DHA Bahawalpur secure, accessible,
                <br /> and rewarding.
              </>
            }
            
            typess={`paragraph2`}
            className={`text-[1.4vw] wordd leading-none mt-[2vw]`}
          />
        </div>
     */}
        <ScrollWords
          textss={
            <>
              {/* Here are a few deals <br />
              we have helped <br />
              clients close */}
              {/* Results Speak Loudest */}
              Hear from Our Clients
            </>
          }
          typess={"heading"}
          className={`ml-[5vw] leading-none text-left`}
        />
        <ScrollWords
          textss={
            <>
              {/* Here are a few deals <br />
              we have helped <br />
              clients close */}
              These aren't just numbers — <br /> they're families settled,
              investments secured, and futures <br /> built across DHA
              Bahawalpur.
            </>
          }
          typess={"subheading"}
          className={`m-[5vw]  leading-none text-left`}
        />
        <div
          ref={container}
          className="flex animatey relative gap-[5vw] overflow-x-auto object-cover overflow-y-hidden no-scrollbar h-[80vh] w-full mt-[5vh]  items-center justify-start "
        >
          {properties.map((property) => (
            <div
              key={property.id}
              className="shrink-0 h-[50vh] w-[25vw] bg-gray-300"
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  backgroundColor: "black",
                  yPercent: -10,
                  duration: 0.5,
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  yPercent: 0,
                  backgroundColor: "#e0e0e0",
                  duration: 0.5,
                });
              }}
            >
              <div className="image">
                <Image
                  src={property.image}
                  fill
                  className="z-10 object-cover"
                  alt="Images"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Forth;
