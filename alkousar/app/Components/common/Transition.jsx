// "use client";

// import React from "react";

// import { usePathname } from "next/navigation";

// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";

// import { useRef } from "react";

// function Transition() {
//   const pathname = usePathname();

//   console.log(pathname);

//   const parent = useRef(null);

//   useGSAP(
//     function () {
//       const tl = gsap.timeline();

//       tl.set(parent.current, {
//         display: "block",
//       });
//       tl.from(".stair", {
//         //   y: "-100%",
//         height: 0,
//         stagger: -0.1,
//         duration: 0.3,
//         ease: "power1.in",
//         delay: 0.2,
//       });
//       tl.to(".stair", {
//         y: "100%",
//         stagger: -0.1,
//         delay: 0.1,
//         duration: 0.3,
//         ease: "power1.Out",
//       });
//       tl.set(parent.current, {
//         display: "none",
//       });
//       tl.to(".stair", {
//         y: 0,
//       });
//     },
//     [pathname],
//   );

//   console.log("pathname:", pathname);

//   return (
//     <>
//       <div
//         ref={parent}
//         className="parents fixed top-0 left-0 w-full h-full pointer-events-none z-50"
//       >
//         <div className="h-screen w-full flex  ">
//           <div className="h-screen stair w-1/5 bg-white"></div>
//           <div className="h-screen stair w-1/5 bg-white"></div>
//           <div className="h-screen stair w-1/5 bg-white"></div>
//           <div className="h-screen stair w-1/5 bg-white"></div>
//           <div className="h-screen stair w-1/5 bg-white"></div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Transition;
