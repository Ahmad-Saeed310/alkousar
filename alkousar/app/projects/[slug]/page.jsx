// "use client"
// import projects from "../../projects";
// import ProjectClient from "./project-client";
// import { useProjectData } from "../../projects";


// export default async function ProjectPage({params}) {

// const { projects, loading } = useProjectData();

//     const {slug} = await params;
//      console.log("slug =", slug);

//   const project = projects.find((p) => p.slug === slug);

//   console.log("project =", project);
//     const currentIndex = projects.findIndex((p) => p.slug === slug);
//     const nextIndex = (currentIndex + 1) % projects.length;
//     const prevIndex = (currentIndex - 1 + projects.length) % projects.length;


//     const nextProject = projects[nextIndex];
//     const prevProject = projects[prevIndex];

//     console.log("proje =", project);

//     console.log("nextProject =", nextProject);
//     console.log("prevProject =", prevProject);
//     return (
//         <ProjectClient
//         project={project}
//         nextProject = {nextProject}
//         prevProject = {prevProject}

//         />
//     );
// }
"use client";
import { useParams } from "next/navigation";
import { useProjectData } from "../../projects"; // adjust path to match File 1's real location
import ProjectClient from "./project-client";

export default function ProjectPage() {
  const { slug } = useParams();
  const { projects, loading } = useProjectData();

  if (loading) {
    return (
      <section className="h-screen w-full flex items-center justify-center">
        <span className="text-sm text-black/50">Loading project…</span>
      </section>
    );
  }

  if (!projects?.length) {
    return (
      <section className="h-screen w-full flex items-center justify-center">
        <span className="text-sm text-black/50">No projects found.</span>
      </section>
    );
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const project = currentIndex !== -1 ? projects[currentIndex] : null;

  if (!project) {
    return (
      <section className="h-screen w-full flex items-center justify-center">
        <span className="text-sm text-black/50">Project not found.</span>
      </section>
    );
  }

  const nextIndex = (currentIndex + 1) % projects.length;
  const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
  const nextProject = projects[nextIndex];
  const prevProject = projects[prevIndex];

  return (
    <ProjectClient
      project={project}
      nextProject={nextProject}
      prevProject={prevProject}
    />
  );
}