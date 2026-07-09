"use client";

import Image from "next/image";

import TransitionLink from "../../animates/TransitionLink";
import { useProjectData } from "../projects";
import InfiniteScrollRow from "./InfiniteScrollRow";

// Featured-projects strip: pulls live data from useProjectData() (Supabase
// `projects` table) and feeds it into InfiniteScrollRow. Drop this anywhere
// — homepage, /projects, /about — it's fully self-contained.
export default function ProjectsScrollRow() {
  const { projects, loading } = useProjectData();

  if (loading || !projects.length) return null;

  return (
    <InfiniteScrollRow
      items={projects}
      keyExtractor={(project) => project.id}
      gap="gap-[2vw]"
      renderItem={(project) => (
        <TransitionLink
          href={project.href}
          className="group relative block h-[40vh] w-[30vw] shrink-0 overflow-hidden"
        >
          {project.images[0]?.image_url ? (
            <Image
              src={project.images[0].image_url}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 bg-stone-300" />
          )}
          <div className="absolute inset-0 bg-black/30" />
          <span className="absolute bottom-[2vh] left-[1.5vw] right-[1.5vw] text-white text-[1.4vw] font-medium leading-tight sanss">
            {project.title}
          </span>
        </TransitionLink>
      )}
    />
  );
}
