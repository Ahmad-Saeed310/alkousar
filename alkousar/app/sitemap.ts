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

  // Projects — same table/filter as useProjects(), minus the client hook.
  // `updated_at` isn't confirmed to exist on this table (only `created_at`
  // was seen in the original query), so fall back gracefully if it's absent.
  const { data: projects } = await supabase
    .from("projects")
    .select("id, created_at, updated_at")
    .eq("published", true);

  const projectRoutes: MetadataRoute.Sitemap = (projects ?? []).map((p) => ({
    url: `${siteUrl}/projects/${p.id}`,
    lastModified: p.updated_at ?? p.created_at ?? new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Blog posts — same table/filter as useBlogPosts().
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug, created_at, published_at, updated_at")
    .eq("published", true);

  const postRoutes: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified:
      post.updated_at ?? post.published_at ?? post.created_at ?? new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}