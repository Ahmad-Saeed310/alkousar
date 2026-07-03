"use client";

import Image from "next/image";

import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import Chars from "../Components/text";
import { Animateword, ScrollWords } from "../Components/text";
import BlogStack from "../Components/BlogStack";
import { useBlogData } from "../blog";

export default function BlogPage() {
  const { posts, loading } = useBlogData();

  return (
    <>
      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <Image
          src="/House1.webp"
          alt="Al-Kousar Properties Blog"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/40" />

        <Nav />

        <div className="relative z-10 flex h-full w-full flex-col justify-end px-[5vw] pb-[10vh]">
          <Animateword
            text="Blog"
            typess="page"
            classname="text-white/70 uppercase tracking-widest"
          />
          <Chars
            type="heading"
            texts="Notes on DHA Bahawalpur"
            className="text-white text-[9vw] md:text-[6vw]"
          />
          <ScrollWords
            textss="Investment guides, market updates, and the occasional look behind the scenes."
            typess="page"
            className="text-white/80 mt-[2vh] text-[3vw] md:text-[1.1vw] max-w-[90vw] md:max-w-[40vw]"
          />
        </div>
      </section>

      {/* Intro strip — matches Who We Are / Our Process sections on /about */}
      <section className="w-full bg-stone-100 px-[5vw] py-[14vh] grid grid-cols-1 md:grid-cols-2 gap-[6vh] md:gap-[4vw]">
        <div>
          <ScrollWords
            textss="Latest Posts"
            typess="heading"
            className="text-black text-[9vw] md:text-[3.6vw] leading-none"
          />
        </div>
        <div>
          <ScrollWords
            textss="Scroll to read through what's new — market notes from DHA Bahawalpur, plot-buying guides, and updates from the team at Al-Kousar Properties."
            typess="paragraph2"
            className="text-black text-[4vw] md:text-[1.4vw] leading-snug"
          />
        </div>
      </section>

      {/* Scroll-stacked posts */}
      {loading && (
        <section className="h-screen w-full bg-black flex items-center justify-center">
          <span className="text-white/40 text-sm uppercase tracking-widest">
            Loading posts…
          </span>
        </section>
      )}

      {!loading && posts.length === 0 && (
        <section className="h-screen w-full bg-black flex items-center justify-center">
          <span className="text-white/40 text-sm uppercase tracking-widest">
            No posts published yet — check back soon.
          </span>
        </section>
      )}

      {!loading && posts.length > 0 && <BlogStack posts={posts} />}

      <Footer />
    </>
  );
}
