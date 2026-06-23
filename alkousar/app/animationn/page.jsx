"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// import { useEffect } from "react";

import Image from "next/image";
// import { Text } from "../Components/text";
// import { Buttons } from "../Components/text";

import { Words } from "../Components/text";
import Nav from "../Components/Nav";

import Secondpage from "../Components/Secondpage";
import ThirsSe from "../Components/ThirsSe";
import Forth from "../Components/Forth";
import LogoMarquee from "../logo/page";
import MapScrollAnimation from "../Components/MapScrollAnimation";

function Animations() {
  const tl = gsap.timeline();
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
  });

  return (
    <>
      <div className="animates h-screen w-full relative   ">
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
              <Image
                src="/Home.png"
                width={100}
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
            <Words
              typess="small"
              clickeds={() => {
                console.log("Explore More clicked");
              }}
              textss="Explore More"
              className={`absolute bottom-[5vh] right-[5vw]`}
            />
          </div>
        </div>
        <Secondpage />
        <Forth />
        <ThirsSe />
        <LogoMarquee />
         <MapScrollAnimation />
      </div>
    </>
  );
}

export default Animations;
