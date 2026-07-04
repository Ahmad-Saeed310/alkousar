"use client";

import "../../gallery.css";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectImageGrid from "../../Components/ImageGrid";
import { GalleryWords } from "../../Components/text";
import Nav from "../../Components/Nav";

export default function ProjectClient({ project, nextProject, prevProject }) {
  console.log("project :", project);

  const projectNavRef = useRef(null);
  const progressBarRef = useRef(null);
  const projectDescriptionRef = useRef(null);
  const footerRef = useRef(null);
  const nextProjectProgressRef = useRef(null);

  // ✅ refs, not state — mutating these must NOT re-run the effect below.
  // They previously lived in useState, which meant every time onUpdate
  // called setIsTransitioning/setShouldUpdateProgress mid-scroll, this
  // whole effect tore down (killing every ScrollTrigger app-wide) and
  // rebuilt itself from scratch — that's what was corrupting layout/text
  // both on this page and bleeding into every other page.
  const isTransitioningRef = useRef(false);
  const shouldUpdateProgressRef = useRef(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Navbar animation
    gsap.set(projectNavRef.current, {
      opacity: 0,
      y: -100,
    });

    gsap.to(projectNavRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.25,
      ease: "power3.out",
    });

    // Description animation
    gsap.fromTo(
      projectDescriptionRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      }
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

    // Footer trigger
    const footerScrollTrigger = ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top top",
      end: "+=100%",
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

          tl.set(nextProjectProgressRef.current, {
            scaleX: 1,
          });

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

    // ✅ cleanup: kill only THIS page's two triggers, then reset only the
    // inline styles this effect itself wrote. No more blanket
    // ScrollTrigger.getAll().forEach(kill) — that was killing triggers
    // belonging to other components/pages too.
    return () => {
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
    };
  }, [nextProject.slug]); // ✅ only re-runs on an actual project change

  console.log(project.images[0]);

  return (
    <div className="project-page">
      <div ref={projectNavRef} className="project-nav z-10">
        <div className="link">
          <span>&larr;&nbsp;</span>
          <Link href={`/projects/${prevProject.slug}`}>Previous</Link>
        </div>

        <div className="project-page-scroll-progress">
          <p className="name">{project.title}</p>
          <div
            ref={progressBarRef}
            className="project-page-scroll-progress-bar"
          />
        </div>

        <div className="link">
          <Link href={`/projects/${nextProject.slug}`}>Next</Link>
          <span>&nbsp;&rarr;</span>
        </div>
      </div>

      <div className="project-hero h-screen grid grid-cols-7 grid-rows-5">
        <h1 className="col-span-3 row-span-1 row-start-3 col-start-3 px-[5vw] flex items-center justify-center text-[6vw]">
          {project.title}
        </h1>

        <p
          ref={projectDescriptionRef}
          id="project-description"
          className="col-span-2 row-span-2 row-start-4 p-[10vw] leading-none tracking-tight w-[70%] text-[1.4vw]"
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
        className="project-footer h-screen grid grid-cols-6 grid-rows-5"
      >
        <h1 className="col-span-3 row-span-1 row-start-2 px-[5vw] text-[6vw]">
          {nextProject.title}
        </h1>

        <div className="project-footer-copy">
          <div className="link">
            <Link href={`/projects/${nextProject.slug}`}>Next</Link>
            <span>&nbsp;&rarr;</span>
          </div>
          <div className="link">
            <Link href="../projects">Home</Link>
            <span>&nbsp;&rarr;</span>
          </div>
        </div>

        <div className="next-project-progress">
          <div
            ref={nextProjectProgressRef}
            className="next-project-progress-bar"
          />
        </div>
      </div>
    </div>
  );
}