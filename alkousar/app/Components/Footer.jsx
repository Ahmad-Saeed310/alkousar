"use client";

import Image from "next/image";
import Link from "next/link";

import { Texts } from "./text";
import { Marquee } from "./text";

const navLinks = [
  "Home",
  "About Us",
  "Our Services",
  "Deals We Close",
  "Testimonials",
  "Contact Us",
];

const contactInfo = {
  phone: "0347 7246576",
  email: "connect@alkousarproperties.com",
  address:
    "Office no 03 Alpha Avenue Sector B, DHA Bahawalpur, Bahawalpur, Pakistan",
  hours: "Mon-Fri 9:00-20:00",
};

const socialLinks = [
  { label: "FaceBook ➔", href: "#" },
  { label: "InstaGram ➔", href: "#" },
  { label: "DHA Bahawalpur ➔", href: "#" },
  { label: "Whatsapp ➔", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-stone-100 text-black h-screen font-sans overflow-hidden relative ">
      {/* Top section */}
      <div className="px-8 md:px-16 pt-16 pb-10 grid grid-cols-1  md:grid-cols-3 gap-12  mt-[3vh] ">
        {/* Left — Property image */}
        <div className="flex items-start ">
          <div className="w-full h-full overflow-hidden  relative ">
            <Image
              src="/Apartments.png"
              alt="Al-Kousar property"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Center — Nav links + Logo */}
        <div className="flex flex-col ">
          <nav className="flex flex-col   fo  text-black ">
            {navLinks.map((link) => (
              <Link key={link} href={link} className="group w-fit ">
                <div className="relative h-[7vh] font-semibold text-[3vw] overflow-hidden">
                  <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">
                    {link}
                  </span>

                  <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0">
                    {link}
                  </span>
                </div>
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <div className="w-[10vh] h-[10vh]   overflow-hidden flex items-center justify-center relative">
            <Image
              src="/LogoBlack.png"
              alt="Al-Kousar Properties logo"
              width={88}
              height={88}
              className="object-contain"
            />
          </div>
        </div>

        {/* Right — Contact info + socials */}
        <div className="flex flex-col gap-8 ">
          {/* Contact block */}
          <div>
            <p className="text-base font-medium mb-3">Contact Info:</p>
            <div className="flex flex-col leading-none text-[15px] text-black/80 ">
              <a
                href={`tel:${contactInfo.phone}`}
                className="hover:opacity-60 transition-opacity"
              >
                {contactInfo.phone}
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="hover:opacity-60 transition-opacity break-all"
              >
                {contactInfo.email}
              </a>
              <p className="mt-1">{contactInfo.address}</p>
              <p className="mt-1 text-black/60">{contactInfo.hours}</p>
            </div>
          </div>

          {/* Social links */}
          <div className="flex flex-col ">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-[15px] text-black hover:scale-90 transition-transform duration-200"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom — Giant wordmark */}
      <div className="px-4 md:px-8 pb-2 overflow-hidden  ">
        {/* <p
          className="font-black text-black leading-none absolute bottome-0 tracking-tight select-none"
          style={{ fontSize: "clamp(128px, 16vw, 400px)" }}
        >
          AL KOUSAR
        </p> */}
        {/* <Texts
              texts="AL-KOUSAR"
              type="heading"
              className={` text-[15vw] flex whitespace-nowrap w-full row-span-1 col-span-2 absolute  bottom-0  leading-none`}
            /> */}
        <Marquee text="AL-KOUSAR PROPERTIES" speed={30} />
      </div>
    </footer>
  );
}
