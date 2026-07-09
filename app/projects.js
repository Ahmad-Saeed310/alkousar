// const projects = [
//   {
//     id: 0,
//     title: "Cosmic Visualizer1",
//     slug: "cosmic%20Visualizer1",
//     description:
//       "A web application that visualizes cosmic data in an interactive way.",
//     images: [
//       "/project-1-1.png",
//       "/project-1-2.png",
//       "/project-1-3.png",
//       "/project-1-4.png",
//       "/project-1-5.png",
     
//     ],
//   },
//   {
//     id: 1,
//     slug: "cosmic%20Visualizer2",
//     title: "Cosmic Visualizer2",
//     description:
//       "A web application that visualizes cosmic data in an interactive way.",
//     images: [
//       "/project-2-1.png",
//       "/project-2-2.png",
//       "/project-2-3.png",
//       "/project-2-4.png",
//       "/project-2-5.png",
      
//     ],
//   },
//   {
//     id: 2,
//     slug: "cosmic%20Visualizer3",
//     title: "Cosmic Visualizer3",
//     description:
//       "A web application that visualizes cosmic data in an interactive way.",
//     images: [
//       "/project-3-1.png",
//       "/project-3-2.png",
//       "/project-3-3.png",
//       "/project-3-4.png",
//       "/project-3-5.png",
//       "/project-3-5.png",
      
//     ],
//   },
//   {
//     id: 3,
//     slug: "cosmic%20Visualizer4",
//     title: "Cosmic Visualizer4",
//     description:
//       "A web application that visualizes cosmic data in an interactive way.",
//     images: [
//       "/project-4-1.png",
//       "/project-4-2.png",
//       "/project-4-3.png",
//       "/project-4-4.png",
//       "/project-4-5.png",
//       "/project-4-6.png",
      
//     ],
//   },
// ];

// export default projects;


// // const projects = [
// //  { id: 1,  title: "Al-Kousar Properties", slug: "cosmic%20Visualizer4", tag: "Real Estate",    images: [
// //       "/project-1-1.png",
// //       "/project-1-2.png",
// //       "/project-1-3.png",
// //       "/project-1-4.png",
// //       "/project-1-5.png",
     
// //     ], href: "#" },
// //   { id: 2,  title: "Arch Studio",          slug: "cosmic%20Visualizer5", tag: "Architecture",    images: [
// //         "/project-4-1.png",
// //         "/project-4-2.png",
// //         "/project-4-3.png",
// //         "/project-4-4.png",
// //         "/project-4-5.png",
// //         "/project-4-6.png",
        
// //       ], href: "#" },
// //   { id: 3,  title: "Verde Living",         slug: "cosmic%20Visualizer6", tag: "Interior",        images: [
// //         "/project-4-1.png",
// //         "/project-4-2.png",
// //         "/project-4-3.png",
// //         "/project-4-4.png",
// //         "/project-4-5.png",
// //         "/project-4-6.png",
        
// //       ], href: "#" },
// //   { id: 4,  title: "Noir Branding",        slug: "cosmic%20Visualizer7", tag: "Branding",      img: "/project-1-4.png", href: "#" },
// //   { id: 5,  title: "Motion Lab",           slug: "cosmic%20Visualizer8", tag: "Animation",     img: "/project-1-5.png", href: "#" },
// //   { id: 6,  title: "Solis Solar",          slug: "cosmic%20Visualizer9", tag: "Energy",        img: "/project-2-1.png", href: "#" },
// //   { id: 7,  title: "Typeset",              slug: "cosmic%20Visualizer10", tag: "Typography",    img: "/project-2-2.png", href: "#" },
// //   { id: 8,  title: "Pulse Health",         slug: "cosmic%20Visualizer11", tag: "Healthcare",    img: "/project-2-3.png", href: "#" },
// //   { id: 9,  title: "Drift Apparel",        slug: "cosmic%20Visualizer12", tag: "Fashion",       img: "/project-2-4.png", href: "#" },
// //   { id: 10, title: "Lunar Coffee",         slug: "cosmic%20Visualizer13", tag: "F&B",           img: "/project-2-5.png", href: "#" },
// //   { id: 11, title: "Block Chain",          slug: "cosmic%20Visualizer14", tag: "Web3",          img: "/project-3-1.png", href: "#" },
// //   { id: 12, title: "Terrain Maps",         slug: "cosmic%20Visualizer15", tag: "Data Viz",      img: "/project-3-2.png", href: "#" },
// //   { id: 13, title: "Coda Music",           slug: "cosmic%20Visualizer16", tag: "Music",         img: "/project-3-3.png", href: "#" },
// //   { id: 14, title: "Sky Drone",            slug: "cosmic%20Visualizer17", tag: "Aerial",        img: "/project-3-4.png", href: "#" },
// //   { id: 15, title: "Forma Portfolio",      slug: "cosmic%20Visualizer18", tag: "Portfolio",     img: "/project-3-5.png", href: "#" },
// // ];
// // export default projects;  
"use client";
import { useMemo } from "react";
import { useProjects } from "../adminImages/ContentGrid";

export function useProjectData() {
  const { projects: dbProjects, loading } = useProjects();

  const projects = useMemo(() => {
    return dbProjects.map((project) => ({
      id: project.id,
      title: project.title,
      slug: project.id, // replace with project.slug if you add one
      description: project.description ?? "",
      // ── project metadata ──────────────────────────
      projectType: project.project_type ?? "",
      buildTime: project.build_time ?? "",
      deliveredAt: project.delivered_at ?? "",
      scale: project.scale ?? "",
      location: project.location ?? "",
      teamMembers: project.team_members ?? [],
      // ────────────────────────────────────────────────
      images:
        project.project_images
          ?.sort((a, b) => a.sort_order - b.sort_order)
          .map((image) => ({
            id: image.id,
            image_url: image.image_url,
            orientation: image.orientation,
            title: image.title,
          })) ?? [],
      href: `/projects/${project.id}`,
    }));
  }, [dbProjects]);

  return {
    projects,
    loading,
  };
}