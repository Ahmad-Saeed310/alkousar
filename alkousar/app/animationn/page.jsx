"use client";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";

import Image from "next/image";
// import { Text } from "../Components/text";
// import { Buttons } from "../Components/text";

import { Words } from "../Components/text";
import Nav from "../Components/Nav";

// import Secondpage from "../Components/Secondpage";
// import ThirsSe from "../Components/Listing";
// import Forth from "../Components/Forth";
// import LogoMarquee from "../logo/page";
// import MapScrollAnimation from "../Components/MapScrollAnimation";
// import { Animateword } from "../Components/text";
// import ToGallery from "../Components/toGallery";
// import ProjectClient from "../projects/[slug]/project-client";

// import BentoGrid from "../Components/Grid";

function Animations() {
  const tl = gsap.timeline();
  const [animationsComplete, setAnimationsComplete] = useState(false);

  useGSAP(() => {
    tl.from(".imageani", {
      x: "100vw",
      duration: 1,
      opacity: 0,
      ease: "power1.out",
      stagger: 0.01,
      rotation: 0,
    });
    tl.to(".pic", {
      delay: 1,
      rotation: 0,
      scale: 3.5,
      duration: 1,
      ease: "power3.inOut",
      x: "-30vw",
      y: "-22vh",
    });
    tl.to(
      ".pics",
      {
        duration: 1,
        opacity: 0,
        ease: "power3.inOut",
        stagger: 0.01,
        rotation: 0,
        display: "block",
      },
      "<",
    );

    // Set flag when animations complete
    tl.call(() => {
      setAnimationsComplete(true);
    });
  });

  // Cursor tracking effect for .pic element
  useEffect(() => {
    if (!animationsComplete) return;

    let requestId;

    const updatePosition = (clientX) => {
      const pic = document.querySelector(".pic");
      if (!pic) return;

      // Calculate base position in pixels (-30vw)
      const baseX = (window.innerWidth * -30) / 100;

      // Half movement across full width
      // Map cursor position (0 to window width) to half movement
      const xPercent = clientX / window.innerWidth; // 0 to 1
      const moveRange = 400; // maximum pixels to move (full range)
      const xOffset = (xPercent * moveRange) / 2; // Half movement

      // Apply position with smooth easing
      gsap.to(".pic", {
        x: baseX + xOffset,
        duration: 0.15,
        ease: "sine.out",
        overwrite: "auto",
      });
    };

    const handleMouseMove = (e) => {
      const heroSection = document.querySelector(".animates");
      if (!heroSection) return;

      // Check if cursor is within hero section
      const rect = heroSection.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        return;
      }

      // Cancel any pending animation frame and update immediately
      cancelAnimationFrame(requestId);
      updatePosition(e.clientX);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestId);
    };
  }, [animationsComplete]);

  return (
    <>
      <div className="animates h-screen w-full relative bg-white   ">
        <div className=" grid grid-cols-2 grid-rows-2  h-full w-full overflow-hidden gap-[1vw]   bg-white">
          <Nav />
          <div className="absolute h-screen w-full  flex items-center pt-[10vh] justify-center gap-[5vw] overflow-hidden">
            <Image
              src="/Home.png"
              width={100}
              height={100}
              alt=""
              className="h-[10vh] pics  imageani rotate-10"
            />
            <Image
              src="/Home.png"
              width={100}
              height={100}
              alt=""
              className="h-[10vh] pics imageani rotate-350"
            />
            <Image
              src="/Home.png"
              width={100}
              height={100}
              alt=""
              className="h-[10vh] pics imageani rotate-10"
            />
            <div className="img">
              <video
                src="/videooffice.mp4"
                width={100}
                autoPlay
                loop 
                muted
                height={100}
                alt=""
                className="h-[10vh]  imageani pic rotate-350 z-20"
              />
              {/* <Text type="heading" texts="Shahid Manzil" /> */}
            </div>
            <Image
              src="/Home.png"
              width={100}
              height={100}
              alt=""
              className="h-[10vh] pics imageani rotate-10"
            />
            <Image
              src="/Home.png"
              width={100}
              height={100}
              alt=""
              className="h-[10vh] pics imageani rotate-350"
            />
            <Image
              src="/Home.png"
              width={100}
              height={100}
              alt=""
              className="h-[10vh] pics imageani rotate-10"
            />
          </div>
          <div className="col-span-1  row-start-1 row-span-1 grid grid-rows-7 ">
            <div className="row-start-7 flex items-center justify-center gap-[5vw]">
              {/* <Text type="paragraph" texts="Shahid Manzil"  className="bottom-0 left-50 " />
            <Text type="paragraph" texts="2025" className={` bottom-0 right-40`} /> */}
            </div>
          </div>
          <div className="col-span-1 row-span-1  flex items-center justify-center flex-col uppercase pt-[15vh] ">
            <Words
              typess="heading"
              textss={
                <>
                  We build
                  <br /> trusted addresses
                </>
              }
            />
          </div>
          <div className="col-span-1  row-start-2 row-span-1 relative">
            <Words
              className={`absolute bottom-0 text-3vw capitalize p-[5vw]`}
              typess="subheading"
              textss={
                <>
                  Share your vision, explore <br /> DHA Bahawalpur, and your{" "}
                  <br /> legacy starts here
                </>
              }
            />
          </div>
          <div className="col-span-1 row-span-1 relative z-0 p-[5vw] ">
            <Words
              typess="small"
              clickeds={() => {
                console.log("About Us clicked");
              }}
              textss="About Us"
              className={`absolute bottom-[5vh]`}
            />

            {/* Search bar — centered between About Us and Explore More */}
            {/* <div className="absolute   -translate-x-1/2 flex items-center border border-black/25 rounded-full px-4 py-[0.9vh] gap-2 bg-white/60 backdrop-blur-sm hover:border-black/60 transition-colors duration-300 group">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="text-black/40 group-hover:text-black/70 transition-colors duration-300 shrink-0"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search properties..."
                className="bg-transparent outline-none text-black text-[1.8vh] font-light w-[18vw] placeholder:text-black/35"
              />
            </div> */}

            <Words
              typess="small"
              
              textss="Explore More"
              className={`absolute bottom-[5vh] right-[5vw]`}
            />
          </div>
        </div>
        {/* <Secondpage />
        <ThirsSe />
        <LogoMarquee />
        <Forth />
        {/* <MapScrollAnimation /> */}
        {/* <Animateword text="AL Kousar" typess="heading" /> */}
      {/* <ToGallery /> */} 
      </div>
    </>
  );
}

export default Animations;
