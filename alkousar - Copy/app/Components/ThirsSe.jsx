import { Texts } from "./text";
import { ScrollWords } from "./text";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Image from "next/image";

function ThirsSe() {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top 20%",
        end: "+=900",
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
      scale: .7,
      duration: 1,
      transformOrigin: "bottom center",
      ease: "power4.out",
      
      scrollTrigger: {
        trigger: ".imgwidth",
        start: "top 80%",
        end: "top 60%",
        scrub: 1,
        // markers: true,
      },
    });
  });
  return (
    <>
      <div className="h-auto w-full bg-white ">
        <div className="h-screen w-full   flex items-center justify-center">
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
        <div className="sec h-[200vh]   grid grid-rows-2 p-[2vh]  ">
          <div className="2nd  row-span-1  row-start-2 grid grid-cols-4 grid-rows-2 gap-[2vh]   ">
            <div className="1 bg-amber-200 col-span-2 row-span-2  ">h</div>
            <div className="3 bg-green-200 col-span-1 ">h</div>
            <div className="4 bg-neutral-300 col-span-1 ">h</div>
          </div>
        </div>
        <div className="sec h-screen   grid grid-rows-2 p-[2vh] bg-white ">
          <div className="2nd  row-span-2  row-start-1 grid grid-cols-4 grid-rows-2 gap-[2vh]   ">
            <div className="3 bg-green-200 col-span-1 ">h</div>
            <div className="4 bg-neutral-300 col-span-1 ">h</div>
            <div className="1 bg-amber-200 col-span-2 row-span-2  ">h</div>
          </div>
        </div>
        <div className="sec h-screen    bg-white ">
          <div className="2nd h-full   ">
            <div className="h-full w-full width bg-white flex flex-col items-center justify-center">
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
                        className=" imgwidth  h-[4vw] w-[8vw] sm:h-[4vw] sm:w-[8vw] bg-stone-700  bg-cover my-[1vw] mx-[1vw]"
                      >
                       
                        <Image src="/logo.png" alt="" width={100} height={100}/>
                      </div>
                      <h3>APARTMENTS</h3>{" "}
                      <div
                        id="box1"
                        className=" imgwidth  h-[4vw] w-[8vw] sm:h-[4vw] sm:w-[8vw] bg-stone-700  bg-cover my-[1vw] mx-[1vw]"
                      >
                        {" "}
                        <Image src="/logo.png" alt="" width={100} height={100} />
                      </div>
                    </div>
                    <div className="home flex items-center justify-center">
                      <h3>COMMERCIAL</h3>{" "}
                      <div
                        id="box1"
                        className=" imgwidth  h-[4vw] w-[8vw] sm:h-[4vw] sm:w-[8vw] bg-stone-700  bg-cover my-[1vw] mx-[1vw]"
                      >
                        {" "}
                        <Image src="/logo.png" alt="" width={100} height={100} />
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
          </div>
        </div>
      </div>
    </>
  );
}

export default ThirsSe;
