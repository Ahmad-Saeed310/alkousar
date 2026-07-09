
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

      // Force ScrollTrigger to re-measure document height on the next
      // frame, after React has actually finished removing this page's
      // DOM. Without this, the next page's triggers (vh/vw/% based
      // start/end values) can compute against a stale document height
      // left over from this page's pin-spacer, causing every other
      // page's scroll-based animations to fire at the wrong scroll
      // position or land at the wrong offset.
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

      <div className="project-hero h-screen grid grid-cols-7 grid-rows-5">
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
      </div>

      <ProjectImageGrid images={project.images} />

      <div
        ref={footerRef}
        className="project-footer relative w-screen h-svh flex flex-col items-center justify-center  grid grid-cols-6 grid-rows-5 "
      >
        <h1 className="col-span-6 items-center text-center row-span-1 row-start-3 px-[5vw] text-[6vw] ">
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