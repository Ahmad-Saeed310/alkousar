// "use client";
// import Link from "next/link";
// import Image from "next/image";

// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/all";
// import ReactLenis from "lenis/react";

// export default function ProjectClient({ project, nextProject, prevProject }) {

//     const projectNavRef = useRef(null);
//     const progressBarRef = useRef(null);
//     const projectDescriptionRef = useRef(null);
//     const footerRef = useRef(null);
//     const nextProjectProgressBarRef = useRef(null);

//     const [isTransitioning, setIsTransitioning] = useState(false);

//     const [shouldUpdateProgress, setShouldUpdateProgress] = useState(true);

//     useEffect(() => {
//         gsap.registerPlugin(ScrollTrigger);

//         gsap.set(projectNavRef.current, { opacity: 0, y: -100 });
//         gsap.to(projectNavRef.current, {
//             opacity: 1,
//             y: 0,
//             duration: 1,
//             delay: .25,
//             ease: "power3.out"

//         });

//         gsap.set(projectDescriptionRef.current, { opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" });

//         const navScrollTrigger = ScrollTrigger.create({
//             trigger: projectNavRef.current,
//             start: "top top",
//             end: "bottom bottom",
//             onUpdate: (self) => {
//                 if (progressBarRef.current) {
//                     gsap.set(progressBarRef.current, { scaleX: self.progress });
//                 }
//             }

//         });

//         const footerScrollTrigger = ScrollTrigger.create({
//             trigger: footerRef.current,
//             start: "top top",
//             end: "+=${window.innerHeight * 3}px",
//             pin: true,
//             pinSpacing: true,
//             onEnter: () => {
//                 if (projectNavRef.current && !isTransitioning) {
//                     gsap.to(projectNavRef.current, { y: -100, duration: .5, ease: "power2.out" });
//                 }
//             },
//             onLeave: () => {
//                 if (projectNavRef.current && !isTransitioning) {
//                     gsap.to(projectNavRef.current, { y: 0, duration: .5, ease: "power2.out" });
//                 };
//             },
//             onUpdate: (self) => {
//                 if (nextProjectProgressBarRef.current && shouldUpdateProgress) {
//                     gsap.set(nextProjectProgressBarRef.current, { scaleX: self.progress });
//                 };
//                 if (self.progress >= 1 && !isTransitioning) {
//                     setShouldUpdateProgress(false);
//                     setIsTransitioning(true);

//                     const tl = gsap.timeline();

//                     tl.set(nextProjectProgressBarRef.current, { scaleX: 1 });

//                     tl.to(
//                         [footerRef.current?.querySelector(".project-footer-copy"),
//                         footerRef.current ? footerRef.current.querySelector(".next-project-progress") : null], {
//                         opacity: 0,
//                             duration: 0.3,
//                                 ease: "power2.inOut"
//                     });

//                     tl.call(()=>{
//                         window.location.href=`/projects/${nextProject.slug}`;
//                     });

//                 }
//                 return () => {
//                     ScrollTrigger.getAll.foreach((trigger) => trigger.kill());
//                 };
//             }
//                 ,
//                 [nextProject.slug, isTransitioning, shouldUpdateProgress]
//             });
//     })

//     return (
//         <ReactLenis root>
//             <div className="project-page">
//                 <div ref={projectNavRef} className="project-nav">
//                     <div className="link">
//                         <span>{"\u2190"} </span>
//                         <Link href={`/projects/${prevProject.slug}`}>Previous</Link>
//                     </div>
//                     <div className="project-page-scroll-progress">
//                         <p>{project.title}</p>

//                         <div ref={progressBarRef} className="project-page-scroll-progress-bar"></div>
//                     </div>
//                     <div className="link">
//                         <Link href={`/projects/${nextProject.slug}`}>Next</Link>
//                         <span>&nbsp;&#8594;</span>
//                     </div>
//                 </div>
//                 <div className="project-hero">
//                     <h1>{project.title}</h1>
//                     <p ref={projectDescriptionRef} id="project-description">{project.description}</p>
//                 </div>
//                 <div className="project-images">
//                     {project.image &&
//                         project.image.map((image, index) => (
//                             <div key={index} className="project-image">
//                                 <Image src={image} alt="" width={800} height={600} />
//                             </div>
//                         ))}
//                 </div>
//                 <div ref={footerRef} className="project-footer">
//                     <h1>{nextProject.title}</h1>
//                     <div className="project-footer-copy">
//                         <p>Next Project</p>
//                     </div>
//                     <div className="next-project-progress">
//                         <div ref={nextProjectProgressRef} className="next-project-progress-bar"></div>
//                     </div>
//                 </div>
//             </div>
//         </ReactLenis>
//     );
// }




"use client";

import "../../gallery.css"

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";

export default function ProjectClient({ project, nextProject, prevProject }) {
  const projectNavRef = useRef(null);
  const progressBarRef = useRef(null);
  const projectDescriptionRef = useRef(null);
  const footerRef = useRef(null);
  const nextProjectProgressRef = useRef(null);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shouldUpdateProgress, setShouldUpdateProgress] = useState(true);

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
      },
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
    //   start: "top bottom",
    //   end: `+=${window.innerHeight * 3}`,
     start: "top top",
  end: "+=100%",
      pin: true,
      pinSpacing: true,

      onEnter: () => {
        if (!isTransitioning) {
          gsap.to(projectNavRef.current, {
            y: -100,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      },

      onLeaveBack: () => {
        if (!isTransitioning) {
          gsap.to(projectNavRef.current, {
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        }
      },

      onUpdate: (self) => {
        if (nextProjectProgressRef.current && shouldUpdateProgress) {
          gsap.set(nextProjectProgressRef.current, {
            scaleX: self.progress,
            transformOrigin: "left center",
          });
        }

        if (self.progress >= 1 && !isTransitioning) {
          setShouldUpdateProgress(false);
          setIsTransitioning(true);

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
            },
          );

          tl.call(() => {
            window.location.href = `/projects/${nextProject.slug}`;
          });
        }
      },
    });

    return () => {
      navScrollTrigger.kill();
      footerScrollTrigger.kill();
    };
  }, [nextProject.slug, isTransitioning, shouldUpdateProgress]);

  return (
    <ReactLenis root>
      <div className="project-page">
        <div ref={projectNavRef} className="project-nav">
          <div className="link">
            <span>&larr;&nbsp;</span>
            <Link href={`/projects/${prevProject.slug}`}>Previous</Link>
          </div>

          <div className="project-page-scroll-progress">
            <p>{project.title}</p>

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

        <div className="project-hero">
          <h1>{project.title}</h1>

          <p ref={projectDescriptionRef} id="project-description">
            {project.description}
          </p>
        </div>

        <div className="project-images">
          {project.images?.map((image, index) => {
            console.log("Image path:", image);
            return(

            <div key={index} className="project-image">
              <Image
                src={image}
                alt={`Project image ${index + 1}`}
                width={800}
                height={600}
              />
            </div>)

          })}
        </div>

        <div ref={footerRef} className="project-footer">
          <h1>{nextProject.title}</h1>

          <div className="project-footer-copy">
            <p>Next Project</p>
          </div>

          <div className="next-project-progress">
            <div
              ref={nextProjectProgressRef}
              className="next-project-progress-bar"
            />
          </div>
        </div>
      </div>
    </ReactLenis>
  );
}
