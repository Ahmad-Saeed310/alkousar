import { supabase } from "@/lib/supabase";

// Same reasoning as app/projects/[slug]/layout.jsx: page.jsx in this route
// is "use client" (it fetches via useBlogData() for the interactive
// scroll/transition UI), and generateMetadata can only run in a Server
// Component — so metadata lives here, in a sibling layout.jsx for the same
// [slug] segment, and page.jsx doesn't change at all.
//
// Unlike projects, blog_posts already has a real `slug` column, so this
// queries by slug directly rather than by id.

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) {
    return {
      title: "Post Not Found",
      description: "This post could not be found.",
    };
  }

  const rawDescription = post.excerpt?.trim() || post.title;
  const description =
    rawDescription.length > 160
      ? `${rawDescription.slice(0, 157)}...`
      : rawDescription;

  const publishedTime = post.published_at ?? post.created_at ?? undefined;

  return {
    title: post.title,
    description,
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags ?? undefined,
      images: post.cover_image_url
        ? [
            {
              url: post.cover_image_url,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default function BlogSlugLayout({ children }) {
  return children;
}