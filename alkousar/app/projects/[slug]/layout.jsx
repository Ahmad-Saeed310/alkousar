import { supabase } from "@/lib/supabase";

// This layout has ONE job: provide dynamic <head> metadata for each
// project page. generateMetadata can only run in a Server Component, and
// page.jsx in this route is "use client" (it fetches via useProjectData()
// for the interactive scroll/transition UI) — so metadata lives here
// instead, in a sibling layout.jsx for the same [slug] segment. Next.js
// merges the two automatically; page.jsx doesn't need to change at all.
//
// NOTE: `slug` here is actually the project's `id` (per useProjectData:
// `slug: project.id // replace with project.slug if you add one`). If you
// later add a real `slug` column to the `projects` table, change the
// `.eq("id", slug)` below to `.eq("slug", slug)`.

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const { data: project } = await supabase
    .from("projects")
    .select(`*, project_images (*)`)
    .eq("id", slug)
    .eq("published", true)
    .single();

  if (!project) {
    return {
      title: "Project Not Found",
      description: "This project could not be found.",
    };
  }

  const images = (project.project_images ?? [])
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order);
  const coverImage = images[0]?.image_url;

  // Keep descriptions in the ~150-160 char range that search engines
  // actually display; fall back to a generated one-liner if the project
  // has no description written yet.
  const rawDescription =
    project.description?.trim() ||
    `${project.title} — a project by Al-Kousar Properties${
      project.location ? ` in ${project.location}` : ""
    }.`;
  const description =
    rawDescription.length > 160
      ? `${rawDescription.slice(0, 157)}...`
      : rawDescription;

  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      type: "article",
      url: `/projects/${project.id}`,
      images: coverImage
        ? [{ url: coverImage, width: 1200, height: 630, alt: project.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: coverImage ? [coverImage] : undefined,
    },
    alternates: {
      canonical: `/projects/${project.id}`,
    },
  };
}

export default function ProjectSlugLayout({ children }) {
  return children;
}