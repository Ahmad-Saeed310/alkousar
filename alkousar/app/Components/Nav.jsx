"use client";
import Image from "next/image";
import Link from "next/link";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Nav() {
  useGSAP(() => {
    gsap.from(".elems", {
      yPercent: 50,
      delay: 2.6,
      duration: 1,
      opacity: 0,
      ease: "power4.out",
    });
  });

  return (
    <div className="w-full h-[10vh] fixed flex items-center justify-between p-[5vh] elems z-50 mix-blend-difference ">
      <Image
        src="/logoBlack.png"
        width={100}
        height={100}
        alt="Logo"
        className="h-[4vh] w-auto bg-stone-100 mix-blend-difference"
      />

      <div className="elems flex items-center gap-[5vw] uppercase text-sm text-white mix-blend-difference">
        <Link
          href="/about"
          className="group relative block overflow-hidden h-[1.2em] w-fit mix-blend-difference"
        >
          <span className="mix-blend-difference block transition-transform duration-500 ease-out group-hover:-translate-y-full">
            About Us
          </span>

          <span className="mix-blend-difference pointer-events-none absolute left-0 top-0 block translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0">
            About Us
          </span>
        </Link>
        <Link
          href="/contact"
          className="group relative block overflow-hidden h-[1.2em] w-fit"
        >
          <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">
            Contact
          </span>

          <span className="pointer-events-none absolute left-0 top-0 block translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0">
            Contact
          </span>
        </Link>
        <Link
          href="/projects"
          className="group relative block overflow-hidden h-[1.2em] w-fit"
        >
          <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">
            Gallery
          </span>

          <span className="pointer-events-none absolute left-0 top-0 block translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0">
            Gallery
          </span>
        </Link>
        <Link
          href="/Services"
          className="group relative block overflow-hidden h-[1.2em] w-fit"
        >
          <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">
            Services
          </span>

          <span className="pointer-events-none absolute left-0 top-0 block translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0">
            Services
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
