
import projects from "../../projects";
import ProjectClient from "./project-client";

export default async function ProjectPage({params}) {

    const {slug} = await params;
     console.log("slug =", slug);

  const project = projects.find((p) => p.slug === slug);

  console.log("project =", project);
    const currentIndex = projects.findIndex((p) => p.slug === slug);
    const nextIndex = (currentIndex + 1) % projects.length;
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;


    const nextProject = projects[nextIndex];
    const prevProject = projects[prevIndex];

    console.log("proje =", project);

    console.log("nextProject =", nextProject);
    console.log("prevProject =", prevProject);
    return (
        <ProjectClient
        project={project}
        nextProject = {nextProject}
        prevProject = {prevProject}

        />
    );
}