
"use client";

// import "../../gallery.css";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectImageGrid from "../../Components/ImageGrid";
import { GalleryWords } from "../../Components/text";
import Nav from "../../Components/Nav";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectClient({ project, nextProject, prevProject }) {
  const projectNavRef = useRef(null);
  const progressBarRef = useRef(null);
  const projectDescriptionRef = useRef(null);
  const footerRef = useRef(null);
  const nextProjectProgressRef = useRef(null);

  // Refs, not state — mutating these must NOT re-run the effect below.
  const isTransitioningRef = useRef(false);
  const shouldUpdateProgressRef = useRef(true);

  useEffect(() => {
    // Navbar intro animation
    gsap.set(projectNavRef.current, { opacity: 0, y: -100 });
    gsap.to(projectNavRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.25,
      ease: "power3.out",
    });

    // Description intro animation
    gsap.fromTo(
      projectDescriptionRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
    );

    // Top progress bar
    const navScrollTrigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (progressBarRef.current) {
          gsap.set(progressBarRef.current, {
            scaleX: self.progress,
            transformOrigin: "left center",
          });
        }
      },
    });

    // Footer pin + next-project transition
    const footerScrollTrigger = ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top top",
      end: "+=300%",
      pin: true,
      pinSpacing: true,

      onEnter: () => {
        if (!isTransitioningRef.current) {
          gsap.to(projectNavRef.current, {
            y: -100,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      },

      onLeaveBack: () => {
        if (!isTransitioningRef.current) {
          gsap.to(projectNavRef.current, {
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      },

      onUpdate: (self) => {
        if (nextProjectProgressRef.current && shouldUpdateProgressRef.current) {
          gsap.set(nextProjectProgressRef.current, {
            scaleX: self.progress,
            transformOrigin: "left center",
          });
        }

        if (self.progress >= 1 && !isTransitioningRef.current) {
          shouldUpdateProgressRef.current = false;
          isTransitioningRef.current = true;

          const tl = gsap.timeline();

          tl.set(nextProjectProgressRef.current, { scaleX: 1 });

          tl.to(
            [
              footerRef.current?.querySelector(".project-footer-copy"),
              footerRef.current?.querySelector(".next-project-progress"),
            ],
            {
              opacity: 0,
              duration: 0.3,
              ease: "power2.inOut",
            }
          );

          tl.call(() => {
            window.location.href = `/projects/${nextProject.slug}`;
          });
        }
      },
    });

    return () => {
      // Kill only this page's two triggers — reverting the pin unwraps
      // the pin-spacer GSAP injected around footerRef and restores the
      // original DOM structure (kill() defaults to revert: true).
      navScrollTrigger.kill();
      footerScrollTrigger.kill();

      const targets = [
        projectNavRef.current,
        progressBarRef.current,
        projectDescriptionRef.current,
        nextProjectProgressRef.current,
      ].filter(Boolean);

      if (targets.length) {
        gsap.set(targets, { clearProps: "all" });
      }

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };
  }, [nextProject.slug]);

  return (
    <div className="project-page overflow-x-hidden">
      <Nav playIntro={false} />
      <div ref={projectNavRef} className="project-nav fixed top-0 left-1/2 -translate-x-1/2 z-[2] flex justify-between gap-8 p-6   z-10">
        {/* <div className="link">
          <span>&larr;&nbsp;</span>
          <Link href={`/projects/${prevProject.slug}`}>Previous</Link>
        </div> */}

        <div className="project-page-scroll-progress relative flex-2 h-[30px] flex items-center justify-center rounded-lg border border-[#c6c6c6] overflow-hidden bg-white/25 backdrop-blur-[20px] px-4">
          <p className="name">{project.title}</p>
          <div
            ref={progressBarRef}
            className="project-page-scroll-progress-bar absolute top-0 left-0 w-full h-full bg-[#c6c6c6] scale-x-0 origin-left will-change-transform -z-10"
          />
        </div>

        {/* <div className="link">
          <Link href={`/projects/${nextProject.slug}`}>Next</Link>
          <span>&nbsp;&rarr;</span>
        </div> */}
      </div>

      {/* <div className="project-hero h-screen grid grid-cols-7 grid-rows-5">
        <h1 className="col-span-3 row-span-1 row-start-3 col-start-3 px-[5vw] flex items-center justify-center text-[6vw]">
          {project.title}
        </h1>

        <p
          ref={projectDescriptionRef}
          id="project-description"
          className="col-span-2 row-span-2 row-start-4  pl-[2vw] leading-none tracking-tight w-[70%] text-[1.4vw]"
        >
          {project.description}
        </p>

        {project.projectType && (
          <div className="project-meta-item relative col-span-2 row-span-1 row-start-2 col-start-5">
            <GalleryWords
              link="#"
              textss={project.projectType}
              typess="page"
              className="absolute bottom-10"
            />
          </div>
        )}

        {project.location && (
          <div className="project-meta-item relative col-span-2 row-span-1 row-start-5 col-start-3 text-[5vw]">
            <GalleryWords
              link="#"
              textss={project.location}
              typess="page"
              className="project-meta-value absolute bottom-10"
            />
          </div>
        )}

        {project.scale && (
          <div className="project-meta-item relative col-span-2 row-span-1 row-start-4 col-start-5">
            <GalleryWords
              link="#"
              textss={project.scale}
              typess="page"
              className="project-meta-value absolute bottom-10"
            />
          </div>
        )}

        {project.buildTime && (
          <div className="project-meta-item relative col-span-1 row-span-1 row-start-5 col-start-5">
            <GalleryWords
              link="#"
              textss={project.buildTime}
              typess="page"
              className="project-meta-value absolute bottom-10"
            />
          </div>
        )}

        {project.deliveredAt && (
          <div className="project-meta-item relative flex flex-col gap-[1vw] col-span-1 row-span-1 row-start-5 col-start-6 text-[1.2vw]">
            <GalleryWords
              link="#"
              textss={project.deliveredAt}
              typess="page"
              className="project-meta-value flex absolute bottom-10"
            />
          </div>
        )}

        {project.teamMembers?.length > 0 && (
          <div className="project-meta-item relative col-span-2 row-span-1 row-start-4 col-start-3">
            <GalleryWords
              link="#"
              textss={project.teamMembers.join(", ")}
              typess="page"
              className="flex absolute bottom-10"
            />
          </div>
        )}
      </div> */}

      {/* ── Desktop: unchanged grid ─────────────────────────────────────────── */}
<div className="hidden md:grid project-hero h-screen grid-cols-7 grid-rows-5">
  <h1 className="col-span-5 row-span-1 row-start-3 col-start-2 px-[5vw] flex items-center justify-center text-[6vw]">
    {project.title}
  </h1>

  <p
    ref={projectDescriptionRef}
    id="project-description"
    className="col-span-2 row-span-2 row-start-4 pl-[2vw] leading-none tracking-tight w-[70%] text-[1.4vw]"
  >
    {project.description}
  </p>

  {project.projectType && (
    <div className="project-meta-item relative col-span-2 row-span-1 row-start-2 col-start-5">
      <GalleryWords link="#" textss={project.projectType} typess="page" className="absolute bottom-10" />
    </div>
  )}
  {project.location && (
    <div className="project-meta-item relative col-span-2 row-span-1 row-start-5 col-start-3 text-[5vw]">
      <GalleryWords link="#" textss={project.location} typess="page" className="project-meta-value absolute bottom-10" />
    </div>
  )}
  {project.scale && (
    <div className="project-meta-item relative col-span-2 row-span-1 row-start-4 col-start-5">
      <GalleryWords link="#" textss={project.scale} typess="page" className="project-meta-value absolute bottom-10" />
    </div>
  )}
  {project.buildTime && (
    <div className="project-meta-item relative col-span-1 row-span-1 row-start-5 col-start-5">
      <GalleryWords link="#" textss={project.buildTime} typess="page" className="project-meta-value absolute bottom-10" />
    </div>
  )}
  {project.deliveredAt && (
    <div className="project-meta-item relative flex flex-col gap-[1vw] col-span-1 row-span-1 row-start-5 col-start-6 text-[1.2vw]">
      <GalleryWords link="#" textss={project.deliveredAt} typess="page" className="project-meta-value flex absolute bottom-10" />
    </div>
  )}
  {project.teamMembers?.length > 0 && (
    <div className="project-meta-item relative col-span-2 row-span-1 row-start-4 col-start-3">
      <GalleryWords link="#" textss={project.teamMembers.join(", ")} typess="page" className="flex absolute bottom-10" />
    </div>
  )}
</div>

{/* ── Mobile: stacked title/description, meta as a sleek flex-row wrap ─── */}
{/* <div className="flex md:hidden flex-col w-full min-h-screen pt-[26vw] pb-[10vw] px-[6vw]">
  <h1 className="text-[9vw] leading-[1.05] tracking-tight">
    {project.title}
  </h1>

  <p className="mt-[5vw] text-[3.8vw] leading-snug tracking-tight text-black/70 w-full">
    {project.description}
  </p>

  <div className="mt-[9vw] flex flex-row flex-wrap gap-x-[6vw] gap-y-[6vw]">
    {project.projectType && (
      <div className="flex flex-col gap-[1vw] min-w-[38%]">
        <span className="text-[2.6vw] uppercase tracking-[0.15em] text-black/40">Type</span>
        <GalleryWords link="#" textss={project.projectType} typess="page" className="relative text-[4vw]" />
      </div>
    )}
    {project.location && (
      <div className="flex flex-col gap-[1vw] min-w-[38%]">
        <span className="text-[2.6vw] uppercase tracking-[0.15em] text-black/40">Location</span>
        <GalleryWords link="#" textss={project.location} typess="page" className="relative text-[4vw]" />
      </div>
    )}
    {project.scale && (
      <div className="flex flex-col gap-[1vw] min-w-[38%]">
        <span className="text-[2.6vw] uppercase tracking-[0.15em] text-black/40">Scale</span>
        <GalleryWords link="#" textss={project.scale} typess="page" className="relative text-[4vw]" />
      </div>
    )}
    {project.buildTime && (
      <div className="flex flex-col gap-[1vw] min-w-[38%]">
        <span className="text-[2.6vw] uppercase tracking-[0.15em] text-black/40">Build Time</span>
        <GalleryWords link="#" textss={project.buildTime} typess="page" className="relative text-[4vw]" />
      </div>
    )}
    {project.deliveredAt && (
      <div className="flex flex-col gap-[1vw] min-w-[38%]">
        <span className="text-[2.6vw] uppercase tracking-[0.15em] text-black/40">Delivered</span>
        <GalleryWords link="#" textss={project.deliveredAt} typess="page" className="relative text-[4vw]" />
      </div>
    )}
    {project.teamMembers?.length > 0 && (
      <div className="flex flex-col gap-[1vw] w-full">
        <span className="text-[2.6vw] uppercase tracking-[0.15em] text-black/40">Team</span>
        <GalleryWords link="#" textss={project.teamMembers.join(", ")} typess="page" className="relative text-[4vw]" />
      </div>
    )}
  </div>
</div> */}
{/* ── Mobile: grid-based, same tweak pattern as desktop ─────────────────── */}
<div className="grid  md:hidden grid-cols-4 grid-rows-7 px-[2vw]  h-screen w-full min-h-screen pt-[26vw] pb-[10vw] ">
  <h1 className="   col-start-1 col-span-4 text-center row-start-4  row-span-1 text-[9vw] leading-[1.05] tracking-tight">
    {project.title}
  </h1>

  <p className=" col-span-4 row-span-1 row-start-5  text-[3.8vw] leading-snug tracking-tight text-black/70">
    {project.description}
  </p>
<div className="typeScale col-span-2 row-span-1 row-start-6   flex flex-col gap-[1vw]">

  {project.projectType && (
    <div className="  project-meta-item relative col-span-1 row-start-6 col-start-1">
      {/* <span className="text-[2.6vw] uppercase tracking-[0.15em] text-black/40">Type</span> */}
      <GalleryWords link="#" textss={project.projectType} typess="page" className="relative text-[4vw]" />
    </div>
  )}
  {project.scale && (
    <div className="project-meta-item relative flex flex-col gap-[1vw]">
      {/* <span className="text-[2.6vw] uppercase tracking-[0.15em] text-black/40">Scale</span> */}
      <GalleryWords link="#" textss={project.scale} typess="page" className="relative text-[4vw]" />
    </div>
  )}
</div>
  {project.location && (
    <div className="project-meta-item relative col-span-2  col-start-3 row-start-6 flex flex-col gap-[1vw]">
      <span className="text-[2.6vw] uppercase tracking-[0.15em] text-black/40">Location</span>
      <GalleryWords link="#" textss={project.location} typess="page" className="relative text-[4vw]" />
    </div>
  )}
  {/* {project.buildTime && (
    <div className="project-meta-item relative col-span-2 col-start-3  row-start-7 flex flex-col gap-[1vw]">
      <span className="text-[2.6vw] uppercase tracking-[0.15em] text-black/40">Build Time</span>
      <GalleryWords link="#" textss={project.buildTime} typess="page" className="relative text-[4vw]" />
    </div>
  )} */}
  {project.deliveredAt && (
    <div className="project-meta-item relative col-span-2 col-start-3  row-start-7 flex flex-col gap-[1vw]">
      <span className="text-[2.6vw] uppercase tracking-[0.15em] text-black/40">Delivered</span>
      <GalleryWords link="#" textss={project.deliveredAt} typess="page" className="relative text-[4vw]" />
    </div>
  )}
  {project.teamMembers?.length > 0 && (
    <div className="project-meta-item relative col-span-2 col-start-1  row-start-7 flex flex-col gap-[1vw]">
      <span className="text-[2.6vw] uppercase  tracking-[0.15em] text-black/40">Team</span>
      <GalleryWords link="#" textss={project.teamMembers.join(", ")} typess="page" className="relative text-[4vw]" />
    </div>
  )}
</div>

      <ProjectImageGrid images={project.images} />

      <div
        ref={footerRef}
        className="project-footer relative w-screen h-svh flex flex-col items-center justify-center  grid grid-cols-6 grid-rows-5 "
      >
        <h1 className="col-span-6 items-center text-center row-span-1 row-start-3 px-[5vw] md:text-[6vw] text-[9vw] ">
          {nextProject.title}
        </h1>

        <div className="project-footer-copy relative absolute bottom-0  right-0 col-start-5 row-start-5 text-[3vh] gap-[3vw] w-full  px-[5vw]">
          <div className="link ">
            <Link href={`/projects/${nextProject.slug}`}>Next </Link>
            {/* <span>&nbsp;&rarr;</span> */}
          </div>
          <div className="link">
            <Link href="../projects">Home</Link>
            {/* <span>&nbsp;&rarr;</span> */}
          </div>
          <div className="link">
          {/* <span>&larr;&nbsp;</span> */}
          <Link href={`/projects/${prevProject.slug}`}>Previous</Link>
        </div>
          
        </div>

        <div className="next-project-progress absolute bottom-[25%] left-[25%] w-1/2 h-1">
          <div
            ref={nextProjectProgressRef}
            className="next-project-progress-bar absolute top-0 left-0 h-full w-full bg-[#1a1a1a] scale-x-0 origin-left will-change-transform"
          />
        </div>
      </div>
    </div>
  );
}