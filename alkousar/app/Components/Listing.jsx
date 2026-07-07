"use client";

import { Texts } from "./text";
import { ScrollWords } from "./text";
import BentoGrid from "./Grid";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Image from "next/image";

function ThirsSe() {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top 20%",
          end: () => `+=${window.innerHeight * 1.3}`,
        pin: true,
        scrub: 2,
        //   markers: true,
      },
    });

    tl.to(".heading", {
      scale: 0.7,
      transformOrigin: "center center",
      delay: 1,
      duration: 1,
      ease: "power3.out",
    });

    tl.to(".heading", {
      scale: 0.7,
      duration: 2,
    });
  });

  useGSAP(() => {
    gsap.from(".imgwidth", {
      width: 0,
      duration: 1,
      ease: "power4.out",

      scrollTrigger: {
        trigger: ".imgwidth",
        start: "top 90%",
        end: "top 60%",
        scrub: 1,
        // markers: true,
      },
    });
  });
  useGSAP(() => {
    gsap.from(".width", {
      scale: 0.7,
      duration: 1,
      transformOrigin: "bottom center",
      ease: "power4.out",
      scrub: 10,

      scrollTrigger: {
        trigger: ".imgwidth",
        start: "top 90%",
        end: "top 60%",
        scrub: 1,
        // markers: true,
      },
    });
    gsap.to(".animate", {
      backgroundColor: "black",

      scrollTrigger: {
        trigger: ".animate",
        start: "top -95%",
        end: "top -60%",
        scrub: 2,
        // markers: true,
      },
    });
    gsap.to(".text", {
      color: "white",
      scrollTrigger: {
        trigger: ".animate",
        start: "top -95%",
        end: "top -60%",
        scrub: 2,
        // markers: true,
      },
    });
  });
  return (
    <>
      <div className="h-auto w-full  animate bg-[#ba975d] relative   ">
        <div className="h-[190vh] w-full   flex items-start animate  justify-center overflow-hidden">
          <ScrollWords
            textss={
              <>
                <span className="text-center sanss  block  text-black text w-full">
                  SELECTED
                </span>{" "}
                <br />{" "}
                <span className="  w-full sanss  block text text-black text-center">
                  {" "}
                  wORKS
                </span>{" "}
                <br />{" "}
                <span className="text-right text text-black block  w-full ">
                  {" "}
                  (2019-2026)
                </span>
              </>
            }
            typess={`heading`}
            refss={`words`}
            className={`text-[12vw]   leading-none   heading hero capitalize flex flex-col  `}
          />
        </div>
       
        <BentoGrid />

        {/* <div className="sec h-screen    bg-stone-100 "> */}

        <div className="h-screen w-full width bg-stone-100 flex flex-col items-center justify-center">
          <Texts type={`heading`} texts={"WE CURATE SPACES"} />
          <Texts
            className={``}
            type={`heading`}
            texts={
              <>
                <div className="home flex items-center justify-center">
                  <h3>HOMES</h3>
                  <div
                    id="box1"
                    className=" imgwidth relative  h-[4vw] w-[8vw] sm:h-[4vw] sm:w-[8vw] bg-stone-700  bg-cover my-[1vw] mx-[1vw]"
                  >
                    <Image
                      src="/residence.webp"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3>APARTMENTS</h3>{" "}
                  <div
                    id="box1"
                    className=" imgwidth  h-[4vw] w-[8vw] sm:h-[4vw] relative sm:w-[8vw] bg-stone-700  object-contain   my-[1vw] mx-[1vw]"
                  >
                    {" "}
                    <Image
                      src="/stone.webp"
                      alt=""
                      fill
                      className="object-cover "
                    />
                  </div>
                </div>
                <div className="home flex items-center justify-center">
                  <h3>COMMERCIAL</h3>{" "}
                  <div
                    id="box1"
                    className=" imgwidth relative  h-[4vw] w-[8vw] sm:h-[4vw] sm:w-[8vw] bg-stone-700  bg-cover my-[1vw] mx-[1vw]"
                  >
                    {" "}
                    <Image
                      src="/Apartments.webp"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3>RETAIL</h3>{" "}
                  {/* <div
                        id="box1"
                        class="   h-[4vw] w-[4vw] sm:h-[4vw] sm:w-[4vw] bg-stone-700 rounded-lg bg-cover my-[1vw] mx-[1vw]"
                      >
                        {" "}
                        <img src="/logo.png" alt="" />
                      </div> */}
                </div>
              </>
            }
          />
          <Texts type={`heading`} texts={"FOR YOUR LEGACY"} />
        </div>

        {/* </div> */}
      </div>
    </>
  );
}

export default ThirsSe;
