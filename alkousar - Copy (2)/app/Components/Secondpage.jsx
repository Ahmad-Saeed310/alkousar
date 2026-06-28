"use client";

import { Texts } from "./text";

// import { Words } from "./text";
import { ScrollWords } from "./text";

import { Scrolltexts } from "./text";
function Secondpage() {
  return (
    <>
      <div className="h-[80vh] w-full overflow-hidden sticky  grid grid-cols-2 grid-rows-3 bg-white overflow-hidden">
        <Scrolltexts
          texts="AL-KOUSAR-PROPERTIES"
          type="heading"
          className={` text-[15vw] flex whitespace-nowrap w-full row-span-1 col-span-2   leading-none`}
        />
        <div className="1st col-span-1 row-span-2  text-black col-start-2 pt-[8vh]">
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
      </div>
    </>
  );
}

export default Secondpage;
