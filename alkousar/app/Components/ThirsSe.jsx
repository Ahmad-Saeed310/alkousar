import { Texts } from "./text";
import { ScrollWords } from "./text";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function ThirsSe() {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top 20%",
        end: "+=800",
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
      ease: "none",
    });

    tl.to(".heading", {
      scale: 0.7,
      duration: 2,
    });
  });

  return (
    <>
      <div className="h-[300vh] w-full bg-white ">
        <div className="h-screen w-full  flex items-center justify-center">
          <ScrollWords
            textss={
              <>
                <span className="text-left block w-full">Our</span> <br />{" "}
                <span className="  w-full block text-center"> Listings</span>{" "}
                <br /> <span className="text-right block  w-full "> Cover</span>
              </>
            }
            typess={`heading`}
            refss={`words`}
            className={`text-[12vw]   leading-none   heading hero capitalize flex flex-col  `}
          />
        </div>
        <div className="sec h-[200vh] w-full  grid grid-rows-2 ">
          <div className="2nd  row-span-1 row-start-2"></div>
        </div>
      </div>
    </>
  );
}

export default ThirsSe;
