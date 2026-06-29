"use client";

import { ScrollWords } from "./text";
import { useState, useRef, useEffect } from "react";

const rows = [
  {
    id: 1,
    title: "Al-Kousar Properties",
    tag: "Real Estate",
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
  },
  {
    id: 2,
    title: "Arch Studio",
    tag: "Architecture",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  },
  {
    id: 3,
    title: "Verde Living",
    tag: "Interior",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
  },
  {
    id: 4,
    title: "Noir Branding",
    tag: "Branding",
    img: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80",
  },
  // { id: 5,  title: "Motion Lab",           tag: "Animation",    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80" },
  // { id: 6,  title: "Solis Solar",          tag: "Energy",       img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80" },
  // { id: 7,  title: "Typeset",              tag: "Typography",   img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80" },
  // { id: 8,  title: "Pulse Health",         tag: "Healthcare",   img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80" },
  // { id: 9,  title: "Drift Apparel",        tag: "Fashion",      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" },
  // { id: 10, title: "Lunar Coffee",         tag: "F&B",          img: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80" },
];

export default function ImageRows() {
  const [active, setActive] = useState(null);
  // track which image is currently visible vs which is sliding in
  const [current, setCurrent] = useState(null);
  const [next, setNext] = useState(null);
  const [sliding, setSliding] = useState(false);
  const timerRef = useRef(null);

  function handleEnter(id) {
    setActive(id);

    if (timerRef.current) clearTimeout(timerRef.current);

    if (current === null) {
      // first hover — just set current, no slide
      setCurrent(id);
      return;
    }

    if (id === current) return;

    // new image slides in over the current one
    setNext(id);
    setSliding(false);

    // tiny tick so browser paints next in start position before animating
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setSliding(true);
      });
    });

    // once animation done, promote next → current
    timerRef.current = setTimeout(() => {
      setCurrent(id);
      setNext(null);
      setSliding(false);
    }, 480);
  }

  function handleLeave() {
    setActive(null);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCurrent(null);
      setNext(null);
      setSliding(false);
    }, 350);
  }

  const currentRow = rows.find((r) => r.id === current);
  const nextRow = rows.find((r) => r.id === next);

  return (
    <div className="h-screen bg-stone-100 w-full relative">
      <div className="text h-[50vh]  flex items-center justify-center grid grid-cols-2 ">
        <div className="col-span-1 mx-[5vw] w-full ">
          <ScrollWords textss={`Awards`} typess={`heading`} />
        </div>
        <ScrollWords textss={ 
          <>
          Behind every award is a client who trusted us with their most <br/> 
          important investment. We are deeply grateful for every recognition,<br/> 
          but more grateful for every family we helped settle, every investor <br/> 
          we guided, and every deal we closed with integrity.
          </>} typess={`paragraph2`} />
      </div>
      <div className=" h-[50vh] absolute bottom-0 w-full bg-stone-100 overflow-hidden">
        {/* Fixed preview — bottom right */}
        <div
          className="fixed bottom-8 right-8 z-10 pointer-events-none overflow-hidden"
          style={{
            width: "35vw",
            height: "45vh",
            opacity: active ? 1 : 0,
            transition: "opacity 0.35s ease",
          }}
        >
          {/* current image — stays put */}
          {currentRow && (
            <img
              key={`cur-${currentRow.id}`}
              src={currentRow.img}
              alt={currentRow.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* next image — slides top → bottom over current */}
          {nextRow && (
            <img
              key={`nxt-${nextRow.id}`}
              src={nextRow.img}
              alt={nextRow.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                clipPath: sliding
                  ? "inset(0% 0% 0% 0%)" // fully revealed
                  : "inset(0% 0% 100% 0%)", // hidden above (top clip)
                transition: sliding
                  ? "clip-path 0.46s cubic-bezier(0.76, 0, 0.24, 1)"
                  : "none",
              }}
            />
          )}
        </div>

        {/* Rows */}
        <div className="flex flex-col h-full">
          {rows.map((row) => (
            <Row
              key={row.id}
              row={row}
              isActive={active === row.id}
              onEnter={() => handleEnter(row.id)}
              onLeave={handleLeave}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Row({ row, isActive, onEnter, onLeave }) {
  return (
    <a
      href="projects"
      className="relative flex-1 flex items-center px-10 md:px-20 overflow-hidden"
      style={{ borderBottom: "1px solid #e5e5e5", textDecoration: "none" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={(e) => e.preventDefault()}
    >
      {/* bottom-to-top fill */}
      <span
        className="absolute inset-0 bg-black"
        style={{
          transform: isActive ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "bottom",
          transition: "transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      />

      <span className="relative z-8 flex items-center justify-between w-full">
        <span
          className="text-xs font-mono w-8 shrink-0 transition-colors duration-300"
          style={{
            color: isActive ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)",
          }}
        >
          {String(row.id).padStart(2, "0")}
        </span>

        <span
          className="flex-1 ml-8 font-semibold tracking-tight leading-none transition-colors duration-300"
          style={{
            fontSize: "clamp(18px,2.5vw,36px)",
            color: isActive ? "#ffffff" : "#000000",
          }}
        >
          {row.title}
        </span>

        <span
          className="text-sm font-medium tracking-widest uppercase transition-colors duration-300"
          style={{
            color: isActive ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.35)",
          }}
        >
          {row.tag}
        </span>

        <span
          className="ml-8 text-xl transition-all duration-300 inline-block"
          style={{
            color: isActive ? "#ffffff" : "#000000",
            transform: isActive ? "rotate(0deg)" : "rotate(45deg)",
          }}
        >
          ↗
        </span>
      </span>
    </a>
  );
}
