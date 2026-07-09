"use client";
import { useParams } from "next/navigation";
import { useBlogData } from "../../blog";
import BlogPostClient from "./blog-client";

export default function BlogPostPage() {
  const { slug } = useParams();
  const { posts, loading } = useBlogData();

  if (loading) {
    return (
      <section className="h-screen w-full flex items-center justify-center bg-black">
        <span className="text-sm text-white/50">Loading post…</span>
      </section>
    );
  }

  if (!posts?.length) {
    return (
      <section className="h-screen w-full flex items-center justify-center bg-black">
        <span className="text-sm text-white/50">No posts found.</span>
      </section>
    );
  }

  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const post = currentIndex !== -1 ? posts[currentIndex] : null;

  if (!post) {
    return (
      <section className="h-screen w-full flex items-center justify-center bg-black">
        <span className="text-sm text-white/50">Post not found.</span>
      </section>
    );
  }

  const nextIndex = (currentIndex + 1) % posts.length;
  const prevIndex = (currentIndex - 1 + posts.length) % posts.length;
  const nextPost = posts[nextIndex];
  const prevPost = posts[prevIndex];

  return (
    <BlogPostClient post={post} nextPost={nextPost} prevPost={prevPost} />
  );
}
