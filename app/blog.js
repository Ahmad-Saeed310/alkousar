"use client";
import { useMemo } from "react";
import { useBlogPosts } from "../adminImages/BlogContentGrid";

export function useBlogData() {
  const { posts: dbPosts, loading } = useBlogPosts();

  const posts = useMemo(() => {
    return dbPosts.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt ?? "",
      content: post.content ?? "",
      coverImage: post.cover_image_url ?? "",
      author: post.author ?? "",
      tags: post.tags ?? [],
      publishedAt: post.published_at ?? post.created_at,
      href: `/blog/${post.slug}`,
    }));
  }, [dbPosts]);

  return {
    posts,
    loading,
  };
}
