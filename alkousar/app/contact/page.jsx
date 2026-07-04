"use client";

import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Chars from "../Components/text";
import { Animateword, ScrollWords, Texts } from "../Components/text";
import MapScrollAnimation from "../Components/MapScrollAnimation";

const details = [
  { label: "Call", value: "+92 347 7246576", href: "tel:+923477246576" },
  {
    label: "Email",
    value: "alkousarproperties@gmail.com",
    href: "mailto:alkousarproperties@gmail.com",
  },
  {
    label: "Visit",
    value: "Office# 03, Alpha Avenue, Sector-B, DHA Bahawalpur",
    href: null,
  },
  { label: "Hours", value: "Always Open", href: null },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero — same 2x2 grid skeleton as the homepage hero (animationn/page.jsx),
          kept subtle: no image/video, just the grid + type on a light ground. */}
      <section className="h-screen w-full relative bg-stone-100 overflow-hidden">
        <div className="grid grid-cols-2 grid-rows-2 h-full w-full gap-[1vw]">
          <Nav />

          <div className="col-span-1 row-span-1 flex flex-col justify-center pl-[5vw]">
            <Animateword
              text="Contact Us"
              typess="page"
              classname="text-black/50 uppercase tracking-widest"
            />
            <Chars
              type="heading"
              texts="Let's Talk"
              className="text-black text-[9vw] md:text-[6vw]"
            />
          </div>

          <div className="col-span-1 row-span-1 relative">
            <ScrollWords
              textss="Questions about a plot, a home, or an investment in DHA Bahawalpur? We're a call away."
              typess="subheading"
              className="absolute bottom-[10vh] left-[5vw] right-[5vw] text-black/70 text-[4.5vw] md:text-[2.2vw] leading-snug"
            />
          </div>

          <div className="col-span-1 row-span-1 relative pl-[5vw]">
            <div className="absolute bottom-[8vh] flex flex-col gap-[2vh]">
              <a
                href="tel:+923477246576"
                className="text-black text-[6vw] md:text-[2.4vw] font-medium hover:opacity-60 transition-opacity w-fit"
              >
                +92 347 7246576
              </a>
              <a
                href="mailto:alkousarproperties@gmail.com"
                className="text-black text-[3.5vw] md:text-[1.2vw] font-light hover:opacity-60 transition-opacity w-fit"
              >
                alkousarproperties@gmail.com
              </a>
            </div>
          </div>

          <div className="col-span-1 row-span-1 relative pr-[5vw]">
            <div className="absolute bottom-[8vh] right-[5vw] text-right flex flex-col gap-[1vh] items-end">
              <Texts
                type="page"
                texts="Office# 03, Alpha Avenue, Sector-B, DHA Bahawalpur"
                className="text-black/70 text-right max-w-[70vw] md:max-w-[22vw]"
              />
              <span className="text-black/40 text-[3vw] md:text-[0.9vw] uppercase tracking-widest">
                Always Open
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact details — uniform bordered grid, deliberately plain */}
      <section className="w-full bg-white px-[5vw] py-[10vh]">
        <div className="grid grid-cols-1 md:grid-cols-4 border-t border-l border-black/10">
          {details.map((item) => (
            <div
              key={item.label}
              className="border-r border-b border-black/10 p-[6vw] md:p-[2.2vw] flex flex-col gap-[1.5vh]"
            >
              <span className="text-black/30 text-[3vw] md:text-[0.85vw] uppercase tracking-widest">
                {item.label}
              </span>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-black text-[4.2vw] md:text-[1.3vw] font-medium leading-snug hover:opacity-60 transition-opacity"
                >
                  {item.value}
                </a>
              ) : (
                <span className="text-black text-[4.2vw] md:text-[1.3vw] font-medium leading-snug">
                  {item.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Map — reused as-is from the homepage */}
      <MapScrollAnimation />

      <Footer />
    </>
  );
}