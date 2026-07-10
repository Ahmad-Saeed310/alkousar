 
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