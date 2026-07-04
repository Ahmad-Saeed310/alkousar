"use client";

import Image from "next/image";

import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Chars from "../Components/text";
import { ScrollWords, Animateword, Texts } from "../Components/text";
import ProcessStack from "../Components/ProcessStack";

const stats = [
  {
    id: "01",
    value: "1st",
    label: "Position",
    detail: "DHA Bahawalpur Dealers Ranking, 2025",
  },
  {
    id: "02",
    value: "100%",
    label: "Recommend",
    detail: "Across 26 verified client reviews",
  },
  {
    id: "03",
    value: "222",
    label: "Reg #",
    detail: "Officially Authorised DHA Bahawalpur Dealer",
  },
];

const services = [
  {
    title: "Plot Sales & Resale",
    img: "/Home.webp",
  },
  {
    title: "Investment Consultancy",
    img: "/Apartments.webp",
  },
  {
    title: "Home Construction",
    img: "/House3.webp",
  },
  {
    title: "Commercial Properties",
    img: "/Commercial.webp",
  },
];

const reasons = [
  {
    title: "Authorised & Registered",
    desc: "Reg # 222 — officially recognised as a dealer by DHA Bahawalpur.",
  },
  {
    title: "Proven Track Record",
    desc: "Ranked among the top dealers in DHA Bahawalpur, 1st position in 2025.",
  },
  {
    title: "Trusted By Clients",
    desc: "A 100% recommend rating built across 26 client reviews.",
  },
  {
    title: "Full-Service Partner",
    desc: "From plot selection to construction, we manage the entire journey.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero — same 2x2 grid skeleton as animationn/page.jsx (the homepage
          hero) and the /contact hero: Nav as a non-visual first child, then
          content split across the four quadrants. */}
      <section className="h-screen w-full relative bg-stone-100 overflow-hidden">
        <div className="grid grid-cols-2 grid-rows-2 h-full w-full gap-[1vw]">
          <Nav />

          <div className="col-span-1 row-span-1 flex flex-col justify-center pl-[5vw]">
            <Animateword
              text="About Us"
              typess="page"
              classname="text-black/50 uppercase tracking-widest"
            />
            <Chars
              type="heading"
              texts="Al-Kousar Properties"
              className="text-black text-[9vw] md:text-[5vw]"
            />
          </div>

          <div className="col-span-1 row-span-1 relative">
            <ScrollWords
              textss="DHA Bahawalpur's Authorised Dealer — Reg # 222, and one of the leading real estate agencies in the community."
              typess="subheading"
              className="absolute bottom-[10vh] left-[5vw] right-[5vw] text-black/70 text-[4.5vw] md:text-[2vw] leading-snug"
            />
          </div>

          <div className="col-span-1 row-span-1 relative pl-[5vw]">
            <div className="absolute bottom-[8vh] flex flex-col gap-[1vh]">
              <span className="text-black text-[8vw] md:text-[2.6vw] font-black sanss leading-none">
                1st Position
              </span>
              <span className="text-black/50 text-[3vw] md:text-[1vw]">
                DHA Bahawalpur Dealers Ranking, 2025
              </span>
            </div>
          </div>

          <div className="col-span-1 row-span-1 relative pr-[5vw]">
            <div className="absolute bottom-[8vh] right-[5vw] text-right flex flex-col gap-[1vh] items-end">
              <Texts
                type="page"
                texts="100% Recommend"
                className="text-black/70 text-right"
              />
              <span className="text-black/40 text-[3vw] md:text-[0.9vw] uppercase tracking-widest">
                26 Client Reviews
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section className="w-full bg-stone-100 px-[5vw] py-[14vh] grid grid-cols-1 md:grid-cols-2 gap-[6vh] md:gap-[4vw]">
        <div>
          <ScrollWords
            textss="Who We Are"
            typess="heading"
            className="text-black text-[9vw] md:text-[3.6vw] leading-none"
          />
        </div>
        <div>
          <ScrollWords
            textss={
              <>
                Al-Kousar Properties is a DHA Bahawalpur Authorised Dealer{" "}
                <br className="hidden md:block" /> and one of the leading
                real estate agencies in the community. We help <br className="hidden md:block" />
                families and investors find plots and homes that match their{" "}
                <br className="hidden md:block" /> vision and budget, and we
                back every deal with the trust that comes <br className="hidden md:block" />
                from being officially registered with DHA Bahawalpur.
              </>
            }
            typess="paragraph2"
            className="text-black text-[4vw] md:text-[1.4vw] leading-snug"
          />
        </div>
      </section>

      {/* Achievements */}
      <section className="w-full bg-black px-[5vw] py-[12vh]">
        <ScrollWords
          textss="Recognised Across DHA Bahawalpur"
          typess="subheading"
          className="text-white/60 mb-[8vh] text-[4.5vw] md:text-[2vw]"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[6vh] md:gap-[3vw]">
          {stats.map((s) => (
            <div
              key={s.id}
              className="border-t border-white/20 pt-[3vh] flex flex-col gap-[1vh]"
            >
              <span className="text-white/30 text-[3vw] md:text-[1vw] font-mono">
                {s.id}
              </span>
              <span className="text-white text-[10vw] md:text-[4vw] font-black leading-none sanss">
                {s.value}
              </span>
              <span className="text-white text-[3.5vw] md:text-[1.2vw] font-medium">
                {s.label}
              </span>
              <span className="text-white/50 text-[3vw] md:text-[0.95vw]">
                {s.detail}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="w-full bg-stone-100 px-[5vw] py-[14vh] grid grid-cols-1 md:grid-cols-2 gap-[6vh] md:gap-[4vw] items-center">
        <div className="relative h-[45vh] md:h-[55vh] w-full bg-black flex items-center justify-center overflow-hidden">
          <span className="text-white text-[16vw] md:text-[7vw] font-black sanss">
            KR
          </span>
        </div>

        <div>
          <ScrollWords
            textss="Leadership"
            typess="page"
            className="text-black/50 uppercase tracking-widest text-[3vw] md:text-[1.1vw] mb-[1vh]"
          />
          <ScrollWords
            textss="Kashif Rehmat"
            typess="heading"
            className="text-black text-[8vw] md:text-[3.5vw] leading-none mb-[2vh]"
          />
          <ScrollWords
            textss={
              <>
                Kashif Rehmat leads Al-Kousar Properties and was ranked{" "}
                <br className="hidden md:block" /> 1st position among all
                DHA Bahawalpur dealers for 2025 — <br className="hidden md:block" />
                recognised by DHA Bahawalpur for dedication,{" "}
                <br className="hidden md:block" /> professionalism, and
                outstanding performance within the <br className="hidden md:block" />
                real estate community.
              </>
            }
            typess="paragraph2"
            className="text-black text-[4vw] md:text-[1.3vw] leading-snug"
          />
        </div>
      </section>

      {/* What we offer */}
      <section className="w-full bg-stone-100 px-[5vw] py-[14vh]">
        <ScrollWords
          textss="What We Offer"
          typess="heading"
          className="text-black text-[9vw] md:text-[3.6vw] leading-none mb-[7vh]"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-[2vh] md:gap-[1.5vw]">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative h-[28vh] md:h-[38vh] overflow-hidden"
            >
              <Image
                src={s.img}
                alt={s.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/35" />
              <span className="absolute bottom-[2vh] left-[1.2vw] right-[1.2vw] text-white text-[3.4vw] md:text-[1.4vw] font-medium leading-tight sanss">
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Our process — scroll-driven stacking cards */}
      <section className="w-full bg-black px-[5vw] pt-[14vh] pb-[6vh]">
        <ScrollWords
          textss="Our Process"
          typess="page"
          className="text-white/50 uppercase tracking-widest text-[3vw] md:text-[1.1vw] mb-[1vh]"
        />
        <ScrollWords
          textss="How We Work"
          typess="heading"
          className="text-white text-[9vw] md:text-[3.6vw] leading-none"
        />
      </section>
      <ProcessStack />

      {/* Why choose us */}
      <section className="w-full bg-black px-[5vw] py-[14vh]">
        <ScrollWords
          textss="Why Choose Al-Kousar"
          typess="heading"
          className="text-white text-[9vw] md:text-[3.6vw] leading-none mb-[7vh]"
        />

        <div className="flex flex-col">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className="flex flex-col md:flex-row md:items-center gap-[1.5vh] md:gap-0 justify-between py-[3vh] border-b border-white/15"
            >
              <span className="text-white/30 font-mono text-[3vw] md:text-[1vw] w-[3vw] shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-white text-[4.5vw] md:text-[1.8vw] font-medium flex-1 md:ml-[3vw]">
                {r.title}
              </span>
              <span className="text-white/50 text-[3.2vw] md:text-[0.95vw] md:max-w-[26vw] md:text-right">
                {r.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Visit us */}
      <section className="relative w-full h-[70vh] bg-stone-100 flex items-center justify-center px-[5vw] overflow-hidden">
        <Image
          src="/AlKousarMap.png"
          alt="DHA Bahawalpur map"
          fill
          className="object-cover opacity-15"
        />

        <div className="relative z-10 flex flex-col items-center gap-[2vh] text-center">
          <Texts
            type="page"
            texts="Visit Us"
            className="text-black/50 uppercase tracking-widest text-[3vw] md:text-[1.1vw]"
          />
          <Texts
            type="heading"
            texts="Office# 03, Alpha Avenue, Sector-B, DHA Bahawalpur"
            className="text-black text-[6vw] md:text-[2.8vw] leading-tight max-w-[85vw] md:max-w-[50vw]"
          />
          <a
            href="tel:+923477246576"
            className="text-black text-[4vw] md:text-[1.6vw] font-medium underline underline-offset-4 mt-[1vh]"
          >
            +92 347 7246576
          </a>
          <span className="text-black/50 text-[3vw] md:text-[0.9vw] uppercase tracking-widest mt-[1vh]">
            Always Open
          </span>
        </div>
      </section>

      <Footer />
    </>
  );
}