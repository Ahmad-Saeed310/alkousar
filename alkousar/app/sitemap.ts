import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

// TODO: same domain used in app/layout.tsx's metadataBase — keep these in
// sync, or better, move this into a single shared constant.
const siteUrl = "https://alkousarproperties.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Projects — only selecting columns confirmed to exist (id, created_at,
  // published were all used in the original useProjects() query). Dropped
  // updated_at since it was never confirmed and a nonexistent column makes
  // the whole query fail, not just that field.
  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("id, created_at")
    .eq("published", true);

  if (projectsError) {
    console.error("sitemap: failed to fetch projects", projectsError);
  }

  const projectRoutes: MetadataRoute.Sitemap = (projects ?? []).map((p) => ({
    url: `${siteUrl}/projects/${p.id}`,
    lastModified: p.created_at ?? new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Blog posts — same fix: only confirmed columns (slug, created_at,
  // published_at, published were all used in the original useBlogPosts()
  // query).
  const { data: posts, error: postsError } = await supabase
    .from("blog_posts")
    .select("slug, created_at, published_at")
    .eq("published", true);

  if (postsError) {
    console.error("sitemap: failed to fetch blog_posts", postsError);
  }

  const postRoutes: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.published_at ?? post.created_at ?? new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}