"use client";

import Image from "next/image";

import Nav from "../../Components/Nav";
import Footer from "../../Components/Footer";
import TransitionLink from "../../../animates/TransitionLink";
import { ScrollWords } from "../../Components/text";
import MarkdownBody from "../../Components/MarkdownBody";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostClient({ post, nextPost, prevPost }) {
  return (
    <>
      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />

        <Nav />

        <div className="relative z-10 flex h-full w-full flex-col justify-end px-[5vw] pb-[10vh]">
          {post.tags?.length > 0 && (
            <span className="text-white/70 uppercase tracking-widest text-[3vw] md:text-[1vw] mb-[1vh]">
              {post.tags.join(" · ")}
            </span>
          )}
          <h1 className="text-white text-[9vw] md:text-[5vw] font-black leading-none sanss max-w-[90vw] md:max-w-[60vw]">
            {post.title}
          </h1>
          <div className="flex items-center gap-[2vw] mt-[2vh] text-white/60 text-[3vw] md:text-[1vw]">
            {post.author && <span>{post.author}</span>}
            {post.author && post.publishedAt && <span>·</span>}
            {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="w-full bg-stone-100 px-[6vw] md:px-[25vw] py-[14vh]">
        {post.excerpt && (
          <ScrollWords
            textss={post.excerpt}
            typess="subheading"
            className="text-black/70 text-[4.5vw] md:text-[1.6vw] leading-snug mb-[6vh]"
          />
        )}

        <MarkdownBody content={post.content} />
      </section>

      {/* Prev / Next */}
      <section className="w-full bg-black px-[5vw] py-[10vh] grid grid-cols-1 md:grid-cols-2 gap-[4vh] md:gap-[2vw]">
        <TransitionLink
          href={`/blog/${prevPost.slug}`}
          className="group border-t border-white/15 pt-[3vh]"
        >
          <span className="text-white/40 uppercase tracking-widest text-[3vw] md:text-[0.9vw]">
            Previous
          </span>
          <h4 className="text-white text-[5vw] md:text-[1.8vw] font-medium mt-[1vh] group-hover:text-white/60 transition-colors">
            {prevPost.title}
          </h4>
        </TransitionLink>

        <TransitionLink
          href={`/blog/${nextPost.slug}`}
          className="group border-t border-white/15 pt-[3vh] md:text-right"
        >
          <span className="text-white/40 uppercase tracking-widest text-[3vw] md:text-[0.9vw]">
            Next
          </span>
          <h4 className="text-white text-[5vw] md:text-[1.8vw] font-medium mt-[1vh] group-hover:text-white/60 transition-colors">
            {nextPost.title}
          </h4>
        </TransitionLink>
      </section>

      <Footer />
    </>
  );
}
