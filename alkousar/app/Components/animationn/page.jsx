// "use client";
// import Link from "next/link";
// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import { useEffect, useState } from "react";

// import Image from "next/image";
// // import { Text } from "../Components/text";
// // import { Buttons } from "../Components/text";

// import { Words } from "../Components/text";
// import Nav from "../Components/Nav";

// // import Secondpage from "../Components/Secondpage";
// // import ThirsSe from "../Components/Listing";
// // import Forth from "../Components/Forth";
// // import LogoMarquee from "../logo/page";
// // import MapScrollAnimation from "../Components/MapScrollAnimation";
// // import { Animateword } from "../Components/text";
// // import ToGallery from "../Components/toGallery";
// // import ProjectClient from "../projects/[slug]/project-client";

// // import BentoGrid from "../Components/Grid";

// function Animations() {
//   const tl = gsap.timeline();
//   const [animationsComplete, setAnimationsComplete] = useState(false);

//   useGSAP(() => {
//     gsap.to(".bgAnimate", {
//       backgroundColor: "#e7e5e4",
//       ease: "power1.out",
//       scrollTrigger: {
//         trigger: ".bgAnimate",
//         start: "bottom 90%",
//       end: "bottom 50%",
//       stagger: true,
//       scrub: true,
//       repeat: -1,
//     markers: true},
//       });})

//   useGSAP(() => {
//     tl.from(".imageani", {
//       x: "100vw",
//       duration: 1,
//       opacity: 0,
//       ease: "power1.out",
//       stagger: 0.01,
//       rotation: 0,
//     });
//     tl.to(".pic", {
//       delay: 1,
//       rotation: 0,
//       scale: 3.5,
//       duration: 1,
//       ease: "power3.inOut",
//       x: "-30vw",
//       y: "-22vh",
//     });
//     tl.to(
//       ".pics",
//       {
//         duration: 1,
//         opacity: 0,
//         ease: "power3.inOut",
//         stagger: 0.01,
//         rotation: 0,
//         display: "block",
//       },
//       "<",
//     );

//     // Set flag when animations complete
//     tl.call(() => {
//       setAnimationsComplete(true);
//     });
//   });

//   // Cursor tracking effect for .pic element
//   useEffect(() => {
//     if (!animationsComplete) return;

//     let requestId;

//     const updatePosition = (clientX) => {
//       const pic = document.querySelector(".pic");
//       if (!pic) return;

//       // Calculate base position in pixels (-30vw)
//       const baseX = (window.innerWidth * -30) / 100;

//       // Half movement across full width
//       // Map cursor position (0 to window width) to half movement
//       const xPercent = clientX / window.innerWidth; // 0 to 1
//       const moveRange = 400; // maximum pixels to move (full range)
//       const xOffset = (xPercent * moveRange) / 2; // Half movement

//       // Apply position with smooth easing
//       gsap.to(".pic", {
//         x: baseX + xOffset,
//         duration: 0.15,
//         ease: "sine.out",
//         overwrite: "auto",
//       });
//     };

//     const handleMouseMove = (e) => {
//       const heroSection = document.querySelector(".animates");
//       if (!heroSection) return;

//       // Check if cursor is within hero section
//       const rect = heroSection.getBoundingClientRect();
//       if (
//         e.clientX < rect.left ||
//         e.clientX > rect.right ||
//         e.clientY < rect.top ||
//         e.clientY > rect.bottom
//       ) {
//         return;
//       }

//       // Cancel any pending animation frame and update immediately
//       cancelAnimationFrame(requestId);
//       updatePosition(e.clientX);
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       cancelAnimationFrame(requestId);
//     };
//   }, [animationsComplete]);

//   return (
//     <>
//       <div className="animates h-screen w-full relative  bg-stone-100   ">
//         <div className=" grid grid-cols-2 grid-rows-2  h-full w-full overflow-hidden gap-[1vw] bgAnimate  bg-stone-100">
//           <Nav />
//           <div className="absolute h-screen w-full  flex items-center pt-[10vh] justify-center gap-[5vw] overflow-hidden">
//             <Image
//               src="/Home.webp"
//               width={100}
//               height={100}
//               alt=""
//               className="h-[10vh] pics  imageani rotate-10"
//             />
//             <Image
//               src="/project-4-1.webp"
//               width={100}
//               height={100}
//               alt=""
//               className="h-[10vh] pics imageani rotate-350"
//             />
//             <Image
//               src="/project-4-2.webp"
//               width={100}
//               height={100}
//               alt=""
//               className="h-[10vh] pics imageani rotate-10"
//             />
//             <div className="img">
//               <video
//                 src="/Dha.mp4"
//                 width={100}
//                 autoPlay
//                 loop
//                 muted
//                 height={100}
//                 alt=""
//                 className="h-[10vh]  imageani pic rotate-350 z-20"
//               />
//               {/* <Text type="heading" texts="Shahid Manzil" /> */}
//             </div>
//             <Image
//               src="/project-4-3.webp"
//               width={100}
//               height={100}
//               alt=""
//               className="h-[10vh] pics imageani rotate-10"
//             />
//             <Image
//               src="/project-4-4.webp"
//               width={100}
//               height={100}
//               alt=""
//               className="h-[10vh] pics imageani rotate-350"
//             />
//             <Image
//               src="/project-4-5.webp"
//               width={100}
//               height={100}
//               alt=""
//               className="h-[10vh] pics imageani rotate-10"
//             />
//           </div>
//           <div className="col-span-1  row-start-1 row-span-1 grid grid-rows-7 ">
//             <div className="row-start-7 flex items-center justify-center gap-[5vw]">
//               {/* <Text type="paragraph" texts="Shahid Manzil"  className="bottom-0 left-50 " />
//             <Text type="paragraph" texts="2025" className={` bottom-0 right-40`} /> */}
//             </div>
//           </div>
//           <div className="col-span-1 row-span-1  flex items-center justify-center flex-col uppercase pt-[15vh] ">
//             <Words
//               typess="heading"
//               textss={
//                 <>
//                   We build
//                   <br /> your place
//                   <br/>in DHA-BWP
//                                   </>
//               }
//             />
//           </div>
//           <div className="col-span-1  row-start-2 row-span-1 relative">
//             <Words
//               className={`absolute bottom-0 text-3vw capitalize p-[5vw]`}
//               typess="subheading"
//               textss={
//                 <>
//                   Share your vision, explore <br /> DHA Bahawalpur, and your{" "}
//                   <br /> legacy starts here
//                 </>
//               }
//             />
//           </div>
//           <div className="col-span-1 row-span-1 relative z-0 p-[5vw] ">
//             <Words
//               typess="link"
//               clickeds={() => {
//                 console.log("About Us clicked");
//               }}
//               textss="About Us"
//               className={`absolute bottom-[5vh]`}
//             />

//             {/* Search bar — centered between About Us and Explore More */}
//             {/* <div className="absolute   -translate-x-1/2 flex items-center border border-black/25 rounded-full px-4 py-[0.9vh] gap-2 bg-stone-100/60 backdrop-blur-sm hover:border-black/60 transition-colors duration-300 group">
//               <svg
//                 width="15"
//                 height="15"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.8"
//                 className="text-black/40 group-hover:text-black/70 transition-colors duration-300 shrink-0"
//               >
//                 <circle cx="11" cy="11" r="8" />
//                 <path d="m21 21-4.35-4.35" />
//               </svg>
//               <input
//                 type="text"
//                 placeholder="Search properties..."
//                 className="bg-transparent outline-none text-black text-[1.8vh] font-light w-[18vw] placeholder:text-black/35"
//               />
//             </div> */}

//             <Words
//               typess="link"

//               textss="Explore More"
//               className={`absolute bottom-[5vh] right-[5vw]`}
//             />
//           </div>
//         </div>
//         {/* <Secondpage />
//         <ThirsSe />
//         <LogoMarquee />
//         <Forth />
//         {/* <MapScrollAnimation /> */}
//         {/* <Animateword text="AL Kousar" typess="heading" /> */}
//       {/* <ToGallery /> */}
//       </div>
//     </>
//   );
// }

// export default Animations;

"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Words } from "../text";
import Nav from "../Nav";



import { getCachedVideoUrl, preloadVideoAsBlob } from "../../../utils/VideoCache";

const VIDEO_SRC = "https://res.cloudinary.com/h79vc2ot/video/upload/Dha_a7nfo4.mp4";

function Animations({ startIntro, playIntro = true }) {
  // const smallVideoRef = useRef(null);
  // const fullVideoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState(() => getCachedVideoUrl(VIDEO_SRC) || VIDEO_SRC);

  useEffect(() => {
    let cancelled = false;
    // if not already cached, fetch once and swap the src to the blob URL
    if (!getCachedVideoUrl(VIDEO_SRC)) {
      preloadVideoAsBlob(VIDEO_SRC).then((blobUrl) => {
        if (!cancelled) setVideoSrc(blobUrl);
      });
    }
    return () => {
      cancelled = true;
    };
  }, []);

// function Animations({ startIntro, playIntro = true }) {
  // const tlRef = useRef(null);
  // const [animationsComplete, setAnimationsComplete] = useState(false);


// const [loadedAssets, setLoadedAssets] = useState(0);

// const assetLoaded = () => {
//   setLoadedAssets((prev) => prev + 1);
// };

// useEffect(() => {
//   if (loadedAssets === TOTAL_ASSETS) {
//     onReady?.();
//   }
// }, [loadedAssets, onReady]);


  const tlRef = useRef(null);
  const [animationsComplete, setAnimationsComplete] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(true);

  const overlayRef = useRef(null); // dark backdrop
  const fullVideoRef = useRef(null); // the big video shown when expanded
  const containerRef = useRef(null); // the 90vw×90vh box
  const smallVideoRef = useRef(null); // original small video (stays in place)

  // ── scroll lock when expanded ─────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = expanded ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [expanded]);

  // ── bg colour scroll ──────────────────────────────────────────────────────
  useGSAP(() => {
    gsap.to(".bgAnimate", {
      backgroundColor: "gray",
      ease: "power1.out",
      scrollTrigger: {
        trigger: ".bgAnimate",
        start: "bottom 90%",
        end: "bottom 50%",
        scrub: true,
      },
    });
  });

  // ── intro timeline ────────────────────────────────────────────────────────
  
  // useGSAP(() => {
  //   const tl = gsap.timeline({ paused: true }); // <-- paused
  //   tlRef.current = tl;
  //   tl.from(".imageani", {
  //     x: "100vw",
  //     duration: 1,
  //     opacity: 0,
  //     ease: "power1.out",
  //     stagger: 0.01,
  //   });
  //   tl.to(".pic", {
  //     delay: 1,
  //     rotation: 0,
  //     scale: 3.5,
  //     duration: 1,
  //     ease: "power3.inOut",
  //     x: "-30vw",
  //     y: "-22vh",
  //   });
  //   tl.to(
  //     ".pics",
  //     {
  //       duration: 1,
  //       opacity: 0,
  //       ease: "power3.inOut",
  //       stagger: 0.01,
  //     },
  //     "<",
  //   );
  //   tl.call(() => setAnimationsComplete(true));
  // });


  // // ── play the intro only once the loader hands off ──────────────────────
  // useEffect(() => {
  //   if (startIntro && tlRef.current) {
  //     tlRef.current.play();
  //   }
  // }, [startIntro]);

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });
    tlRef.current = tl;
    tl.from(".imageani", {
      x: "100vw",
      duration: 1,
      opacity: 0,
      ease: "power1.out",
      stagger: 0.01,
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
    tl.to(".pics", {
      duration: 1,
      opacity: 0,
      ease: "power3.inOut",
      stagger: 0.01,
    }, "<");
    tl.to(".animate__words", {
      duration: 1,
      opacity: 1,
      ease: "power3.inOut",
    });
    tl.call(() => setAnimationsComplete(true));
  });

  // ── play the intro only on first visit; otherwise jump straight to end state ──
  useEffect(() => {
    if (!startIntro || !tlRef.current) return;

    if (playIntro) {
      tlRef.current.play();
    } else {
      tlRef.current.progress(1); // instantly apply final state, no animation
      setAnimationsComplete(true);
    }
  }, [startIntro, playIntro]);

  // ...rest of component unchanged


  // ── cursor parallax ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!animationsComplete || expanded) return;
    let reqId;
    const move = (clientX) => {
      const baseX = (window.innerWidth * -30) / 100;
      const offset = ((clientX / window.innerWidth) * 400) / 2;
      gsap.to(".pic", {
        x: baseX + offset,
        duration: 0.15,
        ease: "sine.out",
        overwrite: "auto",
      });
    };
    const onMove = (e) => {
      const hero = document.querySelector(".animates");
      if (!hero) return;
      const r = hero.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        return;
      cancelAnimationFrame(reqId);
      move(e.clientX);
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(reqId);
    };
  }, [animationsComplete, expanded]);

  // ── open ──────────────────────────────────────────────────────────────────
  function openVideo(e) {
    e.stopPropagation();
    if (expanded) return;
    setExpanded(true);
    setPlaying(true);

    // sync fullscreen video to same time as small one
    if (fullVideoRef.current && smallVideoRef.current) {
      fullVideoRef.current.currentTime = smallVideoRef.current.currentTime;
      fullVideoRef.current.play();
    }

    // animate in — use clipPath so video renders at full res, no pixel scaling
    gsap.set(overlayRef.current, { display: "flex" });
    gsap.set(containerRef.current, {
      clipPath: "inset(50% 50% 50% 50% round 16px)",
      opacity: 1,
    });
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(containerRef.current, {
      clipPath: "inset(0% 0% 0% 0% round 16px)",
      duration: 0.55,
      ease: "power3.inOut",
    });
  }

  // ── close ─────────────────────────────────────────────────────────────────
  function closeVideo() {
    if (!expanded) return;
    gsap.to(containerRef.current, {
      clipPath: "inset(50% 50% 50% 50% round 16px)",
      duration: 0.4,
      ease: "power3.in",
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(overlayRef.current, { display: "none" });
        gsap.set(containerRef.current, { clipPath: "none" });
        setExpanded(false);
        if (fullVideoRef.current) fullVideoRef.current.pause();
      },
    });
  }

  // ── play / pause toggle (click on full video) ─────────────────────────────
  function togglePlay(e) {
    e.stopPropagation(); // don't close
    const v = fullVideoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  return (
    <>
      {/* ── fullscreen overlay portal ──────────────────────────────────────── */}
      <div
        ref={overlayRef}
        onClick={closeVideo}
        style={{
          display: "none",
          opacity: 0,
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.82)",
          zIndex: 100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* 90vw × 90vh container — click inside does NOT close */}
        <div
          ref={containerRef}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            width: "90vw",
            height: "90vh",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          <video
        ref={fullVideoRef}
        src={videoSrc}
        loop
        muted={false}
        playsInline
        onClick={togglePlay}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />

          {/* play/pause indicator */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              opacity: playing ? 0 : 1,
              transition: "opacity 0.25s ease",
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* close button */}
          <button
            onClick={closeVideo}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "none",
              background: "rgba(0,0,0,0.5)",
              color: "#fff",
              fontSize: 18,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
              zIndex: 10,
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* ── page ────────────────────────────────────────────────────────────── */}
      <div className="animates h-screen w-full relative bg-stone-100">
        <div className="grid grid-cols-2 grid-rows-2 h-full w-full overflow-hidden gap-[1vw] bgAnimate bg-stone-100">
          

          <div className="absolute h-screen w-full flex items-center pt-[10vh] justify-center gap-[5vw] overflow-hidden ">
            <Image
              src="/Home.webp"
              width={100}
              height={100}
              alt=""
              className="h-[10vh] pics imageani rotate-10"
               priority
                 loading="eager"
            />
            <Image
              src="/project-4-1.webp"
              width={100}
              height={100}
              alt=""
              className="h-[10vh] pics imageani rotate-350"
              priority
             
               loading="eager"
            />
            <Image
              src="/project-4-2.webp"
              width={100}
              height={100}
              alt=""
              className="h-[10vh] pics imageani rotate-10"
              priority
               
               loading="eager"
            />

            <div className="img imageani pic rotate-350 relative z-20 inline-block">
              <video
        ref={smallVideoRef}
        autoPlay
        loop
        muted
        playsInline
        onClick={openVideo}
        className="h-[10vh] block"
        style={{ cursor: "zoom-in", objectFit: "cover" }}
        src={videoSrc}
      />
              <Words
                className="absolute left-0 top-full uppercase  text-[.3vw] tracking-tighter whitespace-nowrap transition-opacity duration-500"
                style={{ opacity: animationsComplete ? 1 : 0 }}
              link=""
              typess=""
               textss={"Defence Housing Authority "} 
            
                loading="eager"
              />
            </div>

            <Image
              src="/project-4-3.webp"
              width={100}
              height={100}
              alt=""
              className="h-[10vh] pics imageani rotate-10"
              priority
               
               loading="eager"
            />
            <Image
              src="/project-4-4.webp"
              width={100}
              height={100}
              alt=""
              className="h-[10vh] pics imageani rotate-350"
              priority
             
               loading="eager"
            />
           
          </div>

          <div className="col-span-1 row-start-1 row-span-1 grid grid-rows-7">
            <div className="row-start-7 flex items-center justify-center gap-[5vw]" />
          </div>

          <div className="col-span-1 row-span-1 flex items-center justify-center flex-col uppercase pt-[15vh]">
            <Words
              typess="heading"
              textss={
                <>
                  We build
                  <br />
                  your place
                  <br />
                  in DHA-BWP
                </>
              }
              link=""
              playIntro={playIntro}
              // className={`${playIntro ? "delay-2400" : "delay-0"}`}
              
            />
          </div>

          <div className="col-span-1 row-start-2 row-span-1 relative">
            <Words
              className="absolute bottom-0 text-3vw capitalize p-[5vw]"
              typess="subheading"
              playIntro={playIntro}
              textss={
                <>
                  Share your vision, explore <br /> DHA Bahawalpur, and your{" "}
                  <br /> legacy starts here
                </>
              }
              link="/about"
            />
          </div>

          <div className="col-span-1 row-span-1 relative z-0 p-[5vw]">
            <Words
              typess="paragraph2"
              playIntro={playIntro}
              clickeds={() => console.log("About Us clicked")}
              textss="About Us"
              className="absolute bottom-[5vh]  text-[2vw] transition-transform duration-300 hover:scale-80  hover:opacity-70 hover:underline" 
              link="/about"
            />
            <Words
              typess="link"
              playIntro={playIntro}
              textss="Explore More"
              className="absolute bottom-[5vh] text-[2vw] right-[5vw] transition-transform duration-300 hover:scale-80  hover:opacity-70 hover:underline"
              link="/projects"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Animations;