"use client";

import Image from "next/image";

import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Chars from "../Components/text";
import { ScrollWords, Animateword, Texts } from "../Components/text";
import ProcessStack from "../Components/ProcessStack";
import ScrollMarquee from "../Components/LogoMarquee";
import LogoMarqueeleft from "../Components/LogoMarquee2";
import ImageAnimation from "../Components/ImageAnimation";

const stats = [
  {
    id: "01",
    value: "1st",
    label: "Position",
    headline: "Ranked 1st in DHA Bahawalpur, 2025",
    body: "DHA Bahawalpur reviews its authorised dealers every year on trust, professionalism, and how well they serve the community. For 2025, Al-Kousar Properties was ranked 1st among every dealer in DHA Bahawalpur — recognition earned through consistent, honest service to the families and investors we work with, not just sales numbers. It's a standard we intend to keep earning every year, not something we consider settled.",
  },
  {
    id: "02",
    value: "100%",
    label: "Recommend",
    headline: "A 100% Recommend Rating",
    body: "Every one of our 26 verified client reviews recommends Al-Kousar Properties — not most of them, all of them. That comes from being upfront about pricing and timelines from the first conversation, showing up for site visits in person, and staying reachable long after a deal has closed. We'd rather close a sale slower and honestly than fast and at the cost of someone's trust.",
  },
  {
    id: "03",
    value: "222",
    label: "Reg #",
    headline: "Officially Registered — Dealer Reg # 222",
    body: "Al-Kousar Properties is registered with DHA Bahawalpur as an Authorised Dealer under Reg # 222. Every transaction we handle runs through recognised channels, with ownership verification and paperwork backed by DHA itself — not just our word for it. It's the reason clients can hand us a deal and not have to double-check it themselves.",
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

// Fuller "why us" pitch — replaces the old thin title+desc row list with
// numbered headline+paragraph pairs, same shape as the client's reference copy.
const pitch = [
  {
    id: "01",
    title: "Fast-Track Your Move Into DHA Bahawalpur",
    body: "From your first call to keys in hand, we move at your pace — not paperwork's. Plot selection, site visits, and documentation happen in parallel, not one slow step after another, so you're not left waiting on us.",
  },
  {
    id: "02",
    title: "Built For First-Time Buyers, Scaled For Investors",
    body: "Whether it's your first plot or your fifth investment property, our approach adjusts to you. First-time buyers get the same patient, step-by-step walkthroughs that repeat investors get fast, direct numbers.",
  },
  {
    id: "03",
    title: "One Team for Everything DHA Bahawalpur",
    body: "Plot sales, investment consultancy, home construction, and DHA paperwork — handled by one team, not passed between agents and contractors. You deal with one point of contact from search to handover.",
  },
  {
    id: "04",
    title: "Fast Answers, On Your Timeline",
    body: "We know DHA deadlines and payment schedules don't wait. Site visits get arranged within days, not weeks, and you're kept updated at every step — so you're never the one chasing a status update.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero — same 2x2 grid skeleton as animationn/page.jsx (the homepage
          hero) and the /contact hero: Nav as a non-visual first child, then
          content split across the four quadrants. */}
      <section className="h-screen w-full relative bg-stone-100 overflow-hidden">
        <div className="grid grid-cols-2 grid-rows-3 h-full w-full gap-[1vw]">
          <Nav />

          <div className="col-span-2 row-span-1 flex flex-col justify-center bg-indigo-300 pl-[5vw]">
            <Animateword
              text="About Us"
              typess="page"
              classname="text-black uppercase tracking-widest"
            />
            <Chars
              type="heading"
              texts={<>
              Al-Kousar 
              <br /> Properties
              </>}
              className="text-black text-[6vh] figtree font-semibold leading-none md:text-[5vw]"
            />
          </div>

          <div className="col-span-2 row-span-1 w-full relative bg-green-500">
            <ScrollWords
              textss="DHA Bahawalpur's Authorised Dealer — Reg # 222, and one of the leading real estate agencies in the community."
              typess="subheading"
              className=" text-[3vh] w-full px-[5vw] md:text-[2vw] leading-none wrap-normal"
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

      {/* Who we are — now black, so it's actually distinct from the stone-100
          hero directly above it instead of running into it with no break. */}
      {/* <section className="w-full bg-black px-[5vw] py-[14vh] grid grid-cols-1 md:grid-cols-2 gap-[6vh] md:gap-[4vw]">
        <div>
          <ScrollWords
            textss="Who We Are"
            typess="heading"
            className="text-white text-[9vw] md:text-[3.6vw] leading-none"
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
            className="text-white/80 text-[4vw] md:text-[1.4vw] leading-snug"
          />
        </div>
      </section> */}

      {/* Achievements — one full section per stat. Parity flipped so this
          opens on stone-100 (Who We Are above is now black) and alternates
          cleanly from there: stone, black, stone. */}
      {/* {stats.map((s, i) => (
        <section
          key={s.id}
          className={`w-full px-[5vw] py-[12vh] grid grid-cols-1 md:grid-cols-2 gap-[6vh] md:gap-[4vw] items-center ${
            i % 2 !== 0 ? "bg-black" : "bg-stone-100"
          }`}
        >
          <div>
            <span
              className={`font-mono text-[4vw] md:text-[1.1vw] ${
                i % 2 !== 0 ? "text-white/30" : "text-black/30"
              }`}
            >
              {s.id}
            </span>
            <div className="flex flex-col mt-[1vh]">
              <span
                className={`font-black leading-none sanss text-[16vw] md:text-[7vw] ${
                  i % 2 !== 0 ? "text-white" : "text-black"
                }`}
              >
                {s.value}
              </span>
              <span
                className={`text-[4vw] md:text-[1.4vw] font-medium mt-[1vh] ${
                  i % 2 !== 0 ? "text-white/70" : "text-black/70"
                }`}
              >
                {s.label}
              </span>
            </div>
          </div>

          <div>
            <ScrollWords
              textss={s.headline}
              typess="heading"
              className={`text-[7vw] md:text-[2.6vw] leading-tight mb-[2vh] ${
                i % 2 !== 0 ? "text-white" : "text-black"
              }`}
            />
            <ScrollWords
              textss={s.body}
              typess="paragraph2"
              className={`text-[4vw] md:text-[1.2vw] leading-snug ${
                i % 2 !== 0 ? "text-white/70" : "text-black/70"
              }`}
            />
          </div>
        </section>
      ))} */}

      {/* Leadership — now black (was stone-100, which repeated the achievement
          section right before it with zero separation). KR panel flipped to
          a white card so it still reads clearly against the dark section. */}
      <section className="w-full bg-black px-[5vw] py-[14vh] grid grid-cols-1 md:grid-cols-2 gap-[6vh] md:gap-[4vw] items-center">
        <div className="relative h-[45vh] md:h-[55vh] w-full bg-white flex items-center justify-center overflow-hidden">
          <span className="text-black text-[16vw] md:text-[7vw] font-black sanss">
            KR
          </span>
        </div>

        <div>
          <Animateword
            text="Leadership"
            typess="page"
            classname="text-white/50 uppercase tracking-widest"
          />
          <ScrollWords
            textss="Kashif Rehmat"
            typess="heading"
            className="text-white text-[8vw] md:text-[3.5vw] leading-none mt-[1vh] mb-[2vh]"
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
            className="text-white/80 text-[4vw] md:text-[1.3vw] leading-snug"
          />
        </div>
      </section>

      {/* What we offer — unchanged stone-100, now correctly follows the
          black Leadership section above instead of repeating it. */}
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
        <Animateword
          text="Our Process"
          typess="page"
          classname="text-white/50 uppercase tracking-widest"
        />
        <ScrollWords
          textss="How We Work"
          typess="heading"
          className="text-white text-[9vw] md:text-[3.6vw] leading-none mt-[1vh]"
        />
      </section>
      <ProcessStack />

      {/* Why Al-Kousar — the richer numbered pitch, replacing the old thin
          title+desc row list. Stone-100 so it breaks cleanly from the black
          Process section right above it. */}
      <section className="w-full bg-stone-100 px-[5vw] py-[14vh]">
        <Animateword
          text="Why Al-Kousar"
          typess="page"
          classname="text-black/50 uppercase tracking-widest"
        />
        <ScrollWords
          textss="What Working With Us Feels Like"
          typess="heading"
          className="text-black text-[9vw] md:text-[3.6vw] leading-none mt-[1vh] mb-[6vh]"
        />

        <div className="flex flex-col divide-y divide-black/10">
          {pitch.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-1 md:grid-cols-[8vw_1fr] gap-[2vh] md:gap-[3vw] py-[5vh]"
            >
              <span className="text-black/30 font-mono text-[4vw] md:text-[1.2vw]">
                ({p.id})
              </span>
              <div>
                <ScrollWords
                  textss={p.title}
                  typess="subheading"
                  className="text-black text-[5.5vw] md:text-[2.2vw] leading-tight font-medium mb-[1.5vh]"
                />
                <ScrollWords
                  textss={p.body}
                  typess="paragraph2"
                  className="text-black/70 text-[4vw] md:text-[1.2vw] leading-snug max-w-[90vw] md:max-w-[45vw]"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visit us — now black (was stone-100, repeating the pitch section
          above it). Closes on a dark note right before the light Footer. */}
      <section className="relative w-full h-[70vh] bg-black flex items-center justify-center px-[5vw] overflow-hidden">
        <Image
          src="/AlKousarMap.png"
          alt="DHA Bahawalpur map"
          fill
          className="object-cover opacity-10 invert"
        />

        <div className="relative z-10 flex flex-col items-center gap-[2vh] text-center">
          <Texts
            type="page"
            texts="Visit Us"
            className="text-white/50 uppercase tracking-widest text-[3vw] md:text-[1.1vw]"
          />
          <Texts
            type="heading"
            texts="Office# 03, Alpha Avenue, Sector-B, DHA Bahawalpur"
            className="text-white text-[6vw] md:text-[2.8vw] leading-tight max-w-[85vw] md:max-w-[50vw]"
          />
          <a
            href="tel:+923477246576"
            className="text-white text-[4vw] md:text-[1.6vw] font-medium underline underline-offset-4 mt-[1vh]"
          >
            +92 347 7246576
          </a>
          <span className="text-white/50 text-[3vw] md:text-[0.9vw] uppercase tracking-widest mt-[1vh]">
            Always Open
          </span>
        </div>
      </section>
<ScrollMarquee />
<LogoMarqueeleft />
      <Footer />
    </>
  );
}