"use client";

import { Texts } from "./text";

// import { Words } from "./text";
import { ScrollWords } from "./text";

import { Scrolltexts } from "./text";
function Secondpage() {
  return (
    <>
      <div className="h-[80vh] w-full overflow-hidden sticky  grid grid-cols-2 grid-rows-3 bg-stone-100 ">
        <Scrolltexts
          texts="AL-KOUSAR-PROPERTIES"
          type="heading"
          className={` md:text-[15vw] md:pt-[9vh] pt-[5vh] text-[15vh] flex whitespace-nowrap w-full row-span-1 col-span-2   leading-none`}
        />
        <div className="1st md:col-span-1 md:row-span-2 col-span-2 pl-[5vw] md:pl-0 row-span-2 col-start-1  text-black md:col-start-2 pt-[8vh]">
          <ScrollWords textss={`About`} typess={`subheading`} className={`text-[5vh] `} />
          <ScrollWords
            textss={
              <>
                With years of trusted experience in DHA Bahawalpur's real estate{" "}
                 market, we help families and investors find properties
                that match their  vision and budget. From your first
                inquiry to the final handover, we  ensure a transparent
                and seamless journey. Our goal is simple — making
                property investment in DHA Bahawalpur secure, accessible,
                 and rewarding.
              </>
            }
            typess={`paragraph2`}
            className={`md:text-[1.4vw] text-[2vh] md:wrap-normal  wrap-break-word tracking-tight text-pretty  max-w-full text-balance   wordd leading-none mt-[2vw]`}
          />
        </div>
      </div>
    </>
  );
}

export default Secondpage;
