"use client";

import { Texts } from "./text";
import { ScrollWords } from "./text";
import BentoGrid from "./Grid";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Animateword } from "./text";

import Image from "next/image";

const pitch = [
  {
    id: "01",
    class: "md:col-span-1 md:row-span-1 col-start-1 row-start-2  ",
    title: "Fast-Track Your Move Into DHA Bahawalpur",
    body: "From your first call to keys in hand, we move at your pace — not paperwork's. Plot selection, site visits, and documentation happen in parallel, not one slow step after another, so you're not left waiting on us.",
  },
  {
    class: "md:col-span-1 md:row-span-1 md:col-start-2 row-start-2  ",
    id: "02",
    title: "Built For First-Time Buyers, Scaled For Investors",
    body: "Whether it's your first plot or your fifth investment property, our approach adjusts to you. First-time buyers get the same patient, step-by-step walkthroughs that repeat investors get fast, direct numbers.",
  },
  {
    id: "03",
    class: "md:col-span-1 md:row-span-1 col-start-1 row-start-3 ",
    title: "One Team for Everything DHA Bahawalpur",
    body: "Plot sales, investment consultancy, home construction, and DHA paperwork — handled by one team, not passed between agents and contractors. You deal with one point of contact from search to handover.",
  },
  {
    id: "04",
    class: "md:col-span-1 md:row-span-1 col-start-2 row-start-3  ",
    title: "Fast Answers, On Your Timeline",
    body: "We know DHA deadlines and payment schedules don't wait. Site visits get arranged within days, not weeks, and you're kept updated at every step — so you're never the one chasing a status update.",
  },
];

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
      <div className="h-auto w-full bg-stone-100 animate relative   ">
        <div className="md:h-[190vh] h-[160vh] w-full    flex items-start  animate  justify-center overflow-hidden">
          <ScrollWords
            textss={
              <>
                <span className="text-center sanss  block  text-black text  w-full">
                  SELECTED
                </span>{" "}
                <br />{" "}
                <span className="  w-full sanss  block text text-black text-center">
                  {" "}
                  wORKS
                </span>{" "}
                <br />{" "}
                <span className="text-center  sanss text text-black block  w-full ">
                  {" "}
                  (2019-2026)
                </span>
              </>
            }
            typess={``}
            refss={`words`}
            className={`md:text-[10vw] text-[15vw] md:font-semibold font-black geist leading-none w-full   heading hero capitalize flex flex-col  `}
          />
        </div>

        <BentoGrid />

        {/* <div className="sec h-screen    bg-stone-100 "> */}

        <div className="md:h-auto w-screen width bg-stone-100 flex flex-col md:items-center  pt-[10vh]    md:justify-center">
          <Texts type={`display`} texts={"WE CURATE SPACES"} className={` text-center`} />
          <Texts
            className={``}
            type={`display`}
            texts={
              <>
                <div className="home flex items-center w-screen justify-center">
                  <h3>HOMES,</h3>
                  <div
                    id="box1"
                    className=" hidden md:block imgwidth relative  h-[4vw] w-[8vw] sm:h-[4vw] sm:w-[8vw] bg-stone-700  bg-cover my-[1vw] mx-[1vw]"
                  >
                    <Image
                      src="/residence.webp"
                      alt=""
                      fill
                      className="object-cover "
                    />
                  </div>
                  <h3>APARTMENTS,</h3>{" "}
                  <div
                    id="box1"
                    className="hidden md:block imgwidth  h-[4vw] w-[8vw] sm:h-[4vw] relative sm:w-[8vw] bg-stone-700  object-contain   my-[1vw] mx-[1vw]"
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
                <div className="home flex items-center w-screen justify-center">
                  <h3>COMMERCIAL,</h3>{" "}
                  <div
                    id="box1"
                    className="hidden md:block imgwidth relative  h-[4vw] w-[8vw] sm:h-[4vw] sm:w-[8vw] bg-stone-700  bg-cover my-[1vw] mx-[1vw]"
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
          <Texts type={`display`} texts={"FOR YOUR LEGACY"} className={` text-center `} />
        </div>
        <section className="w-screen min-h-screen bg-stone-100 md:grid md:grid-cols-2 md:grid-rows-3 px-[2vw] py-[2vh]">

          {/* Heading */}
          {/* <div className="heading md:col-span-2 md:row-start-1">
    <Animateword
      text="Why Al-Kousar"
      typess="page"
      classname="text-black/50 uppercase tracking-widest"
    />

    <ScrollWords
      textss="What Working With Us Feels Like"
      typess="heading"
      className="text-black text-[9vw] md:text-[3.6vw] leading-none mt-[1vh] mb-[6vh]"
    />
  </div> */}

          {/* Cards */}
          {pitch.map((p) => (
            <div
              key={p.id}
              className={`${p.class} grid grid-cols-1 md:grid-cols-[8vw_1fr] gap-[2vh] md:gap-[3vw] py-[5vh]`}
            >
              <span className="text-black/30 font-mono text-[4vw] md:text-[1.2vw]">
                ({p.id})
              </span>

              <div>
                <ScrollWords
                  textss={p.title}
                  typess="subheading"
                  className="text-black text-[5.5vw] md:text-[2.2vw] leading-tight font-medium mb-[1.5vh]"
                />

                <ScrollWords
                  textss={p.body}
                  typess="paragraph2"
                  className="text-black/70 text-[4vw] md:text-[1.2vw] leading-snug max-w-[90vw] md:max-w-[45vw]"
                />
              </div>
            </div>
          ))}
        </section>

        {/* </div> */}
      </div>
    </>
  );
}

export default ThirsSe;
