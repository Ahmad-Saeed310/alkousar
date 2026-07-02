// "use client";

// import Image from "next/image";
// import { useEffect, useRef } from "react";

// /**
//  * Image object shape:
//  * {
//  *   src: "/img.png",
//  *   orientation: "landscape" | "portrait",
//  *   alt: "...",   // optional
//  * }
//  *
//  * Layout rules:
//  *  - landscape                    → full width, own row, h-screen
//  *  - portrait + portrait (consecutive) → side by side, each w-1/2, h-screen
//  *  - portrait alone               → half width, alternates left/right, h-screen
//  *  - missing/unknown orientation  → treated as landscape (safe fallback)
//  */

// // ── Scroll-linked scale animation ────────────────────────────────────────
// function progressToScale(p) {
//   const clamped = Math.min(1, Math.max(0, p));
//   const eased   = 1 - Math.pow(1 - clamped, 2);
//   return 1.2 - eased * 0.2; // 1.2 → 1.0
// }

// function useScrollScale(ref, active) {
//   useEffect(() => {
//     if (!active) return;
//     const el = ref.current;
//     if (!el) return;

//     let raf;
//     function update() {
//       const rect = el.getBoundingClientRect();
//       el.style.transform = `scale(${progressToScale(1 - rect.top / window.innerHeight)})`;
//       raf = requestAnimationFrame(update);
//     }
//     raf = requestAnimationFrame(update);
//     return () => cancelAnimationFrame(raf);
//   }, [ref, active]);
// }

// // ── Img ──────────────────────────────────────────────────────────────────
// function Img({ image, className = "" }) {
//   const innerRef = useRef(null);
//   const hasImage = Boolean(image);

//   useScrollScale(innerRef, hasImage);

//   if (!hasImage) {
//     return <div className={`${className} bg-neutral-100`} />;
//   }

//   const src = typeof image === "string" ? image : (image.image_url ?? image.src ?? "");
//   const alt = image?.title ?? image?.alt ?? "";

//   return (
//     <div className={`relative overflow-hidden shrink-0 ${className}`}>
//       <div
//         ref={innerRef}
//         className="absolute inset-0 will-change-transform"
//         style={{ transform: "scale(1.2)" }}
//       >
//         <Image
//           src={src}
//           alt={alt}
//           fill
//           className="object-cover"
//           sizes="(max-width: 768px) 100vw, 50vw"
//         />
//       </div>
//     </div>
//   );
// }

// // ── Helper: single source of truth for reading orientation ────────────────
// function getOrientation(img) {
//   const raw = (img.orientation ?? "").toLowerCase();
//   return raw === "portrait" ? "portrait" : "landscape";
// }

// // ── Layout grouping ───────────────────────────────────────────────────────
// function buildRows(images) {
//   const rows = [];
//   let i = 0;
//   let portraitSide = "left";

//   while (i < images.length) {
//     const img = images[i];
//     const orientation = getOrientation(img);

//     if (orientation === "landscape") {
//       rows.push({ type: "landscape", images: [img], key: img.src ?? `row-${i}` });
//       i++;
//       continue;
//     }

//     // Collect ALL consecutive portraits, then pair them greedily
//     const run = [];
//     while (i < images.length && getOrientation(images[i]) === "portrait") {
//       run.push(images[i]);
//       i++;
//     }

//     for (let j = 0; j < run.length; j += 2) {
//       const a = run[j];
//       const b = run[j + 1];
//       if (b) {
//         rows.push({
//           type: "portrait-pair",
//           images: [a, b],
//           key: a.src ?? `row-${i}-${j}`,
//         });
//       } else {
//         rows.push({
//           type: "portrait-solo",
//           images: [a],
//           side: portraitSide,
//           key: a.src ?? `row-${i}-${j}`,
//         });
//         portraitSide = portraitSide === "left" ? "right" : "left";
//       }
//     }
//   }

//   return rows;
// }

// // ── Component ─────────────────────────────────────────────────────────────
// export default function ProjectImageGrid({ images = [] }) {
//   if (!images.length) return null;

//   const rows = buildRows(images);

//   return (
//     <>
//       <div className="w-full flex flex-col">
//         {rows.map((row) => {
//           if (row.type === "landscape") {
//             return (
//               <div key={row.key} className="w-full h-screen">
//                 <Img image={row.images[0]} className="w-full h-full" />
//               </div>
//             );
//           }

//           if (row.type === "portrait-pair") {
//             return (
//               <div key={row.key} className="flex w-full h-screen">
//                 <Img image={row.images[0]} className="w-1/2 h-full" />
//                 <Img image={row.images[1]} className="w-1/2 h-full" />
//               </div>
//             );
//           }

//           if (row.type === "portrait-solo") {
//             return (
//               <div key={row.key} className="flex w-full h-screen">
//                 {row.side === "left" ? (
//                   <>
//                     <Img image={row.images[0]} className="w-1/2 h-full" />
//                     <div className="w-1/2 h-full bg-neutral-100" />
//                   </>
//                 ) : (
//                   <>
//                     <div className="w-1/2 h-full bg-neutral-100" />
//                     <Img image={row.images[0]} className="w-1/2 h-full" />
//                   </>
//                 )}
//               </div>
//             );
//           }

//           return null;
//         })}
//       </div>

//       {/* ── Customisable end section ── */}
//       <div className="h-screen w-full">
//         {/* your content here */}
//       </div>
//     </>
//   );
// }

// Components/ImageGrid.jsx
"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Expected image object shape (from project.images):
 * {
 *   image_url: "https://...supabase.co/...",
 *   orientation: "landscape" | "portrait",
 *   title: "...",   // optional, used as alt text
 * }
 *
 * Layout rules:
 *  - landscape                         → full width, own row, h-screen
 *  - portrait + portrait (consecutive) → side by side, each w-1/2, h-screen
 *  - portrait alone                    → half width, alternates left/right, h-screen
 *  - missing/unknown orientation       → treated as landscape (safe fallback)
 */

// ── Scroll-linked scale animation ────────────────────────────────────────
function progressToScale(p) {
  const clamped = Math.min(1, Math.max(0, p));
  const eased = 1 - Math.pow(1 - clamped, 2);
  return 1.2 - eased * 0.2; // 1.2 → 1.0
}

function useScrollScale(ref, active) {
  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;

    let raf;
    function update() {
      const rect = el.getBoundingClientRect();
      el.style.transform = `scale(${progressToScale(1 - rect.top / window.innerHeight)})`;
      raf = requestAnimationFrame(update);
    }
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [ref, active]);
}

// ── Img ──────────────────────────────────────────────────────────────────
function Img({ image, className = "" }) {
  const innerRef = useRef(null);
  const hasImage = Boolean(image);

  useScrollScale(innerRef, hasImage);

  if (!hasImage) {
    return <div className={`${className} bg-neutral-100`} />;
  }

  const src = typeof image === "string" ? image : (image.image_url ?? image.src ?? "");
  const alt = image?.title ?? image?.alt ?? "";

  return (
    <div className={`relative overflow-hidden shrink-0 ${className}`}>
      <div
        ref={innerRef}
        className="absolute inset-0 will-change-transform"
        style={{ transform: "scale(1.2)" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}

// ── Helper: single source of truth for reading orientation ────────────────
function getOrientation(img) {
  const raw = (img.orientation ?? "").toLowerCase();
  return raw === "portrait" ? "portrait" : "landscape";
}

// ── Layout grouping ───────────────────────────────────────────────────────
function buildRows(images) {
  const rows = [];
  let i = 0;
  let portraitSide = "left";

  while (i < images.length) {
    const img = images[i];
    const orientation = getOrientation(img);

    if (orientation === "landscape") {
      rows.push({ type: "landscape", images: [img], key: img.id ?? img.image_url ?? `row-${i}` });
      i++;
      continue;
    }

    const run = [];
    while (i < images.length && getOrientation(images[i]) === "portrait") {
      run.push(images[i]);
      i++;
    }

    for (let j = 0; j < run.length; j += 2) {
      const a = run[j];
      const b = run[j + 1];
      if (b) {
        rows.push({
          type: "portrait-pair",
          images: [a, b],
          key: a.id ?? a.image_url ?? `row-${i}-${j}`,
        });
      } else {
        rows.push({
          type: "portrait-solo",
          images: [a],
          side: portraitSide,
          key: a.id ?? a.image_url ?? `row-${i}-${j}`,
        });
        portraitSide = portraitSide === "left" ? "right" : "left";
      }
    }
  }

  return rows;
}

// ── Component ─────────────────────────────────────────────────────────────
export default function ImageGrid({ images = [] }) {
console.log('ImageGrid received:', images); // ← add this line

  if (!images.length) return null;

  const rows = buildRows(images);

  return (
    <div className="w-full  flex flex-col gap-[1vw] p-[1vw]">
      {rows.map((row) => {
        if (row.type === "landscape") {
          return (
            <div key={row.key} className="w-full h-[170vh]">
              <Img image={row.images[0]} className="w-full h-full" />
            </div>
          );
        }

        if (row.type === "portrait-pair") {
          return (
            <div key={row.key} className="flex w-full  h-[130vh] gap-[1vw] p-[1vw]">
              <Img image={row.images[0]} className="w-1/2 h-full" />
              <Img image={row.images[1]} className="w-1/2 h-full" />
            </div>
          );
        }

        if (row.type === "portrait-solo") {
          return (
            <div key={row.key} className="flex w-full h-screen">
              {row.side === "left" ? (
                <>
                  <Img image={row.images[0]} className="w-1/2 h-full" />
                  <div className="w-1/2 h-full bg-neutral-100" />
                </>
              ) : (
                <>
                  <div className="w-1/2 h-full bg-neutral-100" />
                  <Img image={row.images[0]} className="w-1/2 h-full" />
                </>
              )}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}