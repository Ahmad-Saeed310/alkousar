"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Renders blog_posts.content (markdown) with styling that matches the rest
// of the site — font-light body copy, sanss headings, viewport-unit sizing —
// instead of Tailwind Typography defaults.
export default function MarkdownBody({ content, className = "" }) {
  return (
    <div className={`flex flex-col gap-[3vh] ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => (
            <h2
              className="text-black text-[7vw] md:text-[2.6vw] font-black leading-tight sanss mt-[2vh]"
              {...props}
            />
          ),
          h2: (props) => (
            <h3
              className="text-black text-[6vw] md:text-[2vw] font-black leading-tight sanss mt-[2vh]"
              {...props}
            />
          ),
          h3: (props) => (
            <h4
              className="text-black text-[5vw] md:text-[1.5vw] font-bold leading-tight mt-[1vh]"
              {...props}
            />
          ),
          p: (props) => (
            <p
              className="text-black text-[4vw] md:text-[1.15vw] leading-relaxed font-light"
              {...props}
            />
          ),
          a: (props) => (
            <a
              className="underline underline-offset-4 hover:text-black/60 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          ul: (props) => (
            <ul
              className="list-disc pl-[5vw] md:pl-[1.5vw] flex flex-col gap-[1vh] text-black text-[4vw] md:text-[1.15vw] font-light"
              {...props}
            />
          ),
          ol: (props) => (
            <ol
              className="list-decimal pl-[5vw] md:pl-[1.5vw] flex flex-col gap-[1vh] text-black text-[4vw] md:text-[1.15vw] font-light"
              {...props}
            />
          ),
          li: (props) => <li className="leading-relaxed" {...props} />,
          blockquote: (props) => (
            <blockquote
              className="border-l-2 border-black/20 pl-[4vw] md:pl-[1.5vw] italic text-black/70 text-[4vw] md:text-[1.15vw]"
              {...props}
            />
          ),
          strong: (props) => <strong className="font-semibold" {...props} />,
          hr: () => <hr className="border-black/10 my-[2vh]" />,
          img: ({ alt, ...props }) => (
            // Plain <img>, not next/image — markdown authors can paste any
            // external URL and it isn't restricted to next.config.ts's
            // remote-image allowlist.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt={alt || ""}
              className="w-full h-auto my-[2vh] object-cover"
              {...props}
            />
          ),
          table: (props) => (
            <div className="overflow-x-auto">
              <table
                className="w-full text-left text-[3.5vw] md:text-[1vw] border-collapse"
                {...props}
              />
            </div>
          ),
          th: (props) => (
            <th
              className="border-b border-black/20 py-[1vh] pr-[2vw] font-semibold"
              {...props}
            />
          ),
          td: (props) => (
            <td
              className="border-b border-black/10 py-[1vh] pr-[2vw] font-light"
              {...props}
            />
          ),
        }}
      >
        {content || ""}
      </ReactMarkdown>
    </div>
  );
}
