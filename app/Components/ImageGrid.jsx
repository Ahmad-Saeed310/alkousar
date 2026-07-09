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
 * Desktop layout rules (unchanged from before):
 *  - landscape                         → full width, own row, h-[170vh]
 *  - portrait + portrait (consecutive) → side by side, each w-1/2, h-[130vh]
 *  - portrait alone                    → half width, alternates left/right, h-screen
 *  - missing/unknown orientation       → treated as landscape (safe fallback)
 *
 * Mobile layout rules (new):
 *  - Orientation is ignored entirely — the alternating/pairing logic and
 *    the vh-based heights it relies on are desktop-only concerns.
 *  - Images are simply grouped two at a time into `flex flex-row` rows,
 *    each image at w-1/2, using a fixed aspect ratio instead of vh units
 *    (vh-based heights from the desktop layout would be enormous stacked
 *    on a narrow screen).
 *  - A trailing odd image out gets its own row at full width.
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
function Img({ image, className = "", scroll = true }) {
  const innerRef = useRef(null);
  const hasImage = Boolean(image);

  useScrollScale(innerRef, hasImage && scroll);

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
        style={{ transform: scroll ? "scale(1.2)" : "scale(1)" }}
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

// ── Desktop layout grouping (orientation-aware) ────────────────────────────
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
  if (!images.length) return null;

  return (
    <>
      <DesktopImageGrid images={images} />
      <MobileImageGrid images={images} />
    </>
  );
}

function DesktopImageGrid({ images }) {
  const rows = buildRows(images);

  return (
    <div className="hidden md:flex w-full flex-col gap-[1vw] p-[1vw]">
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
            <div key={row.key} className="flex w-full h-[130vh] gap-[1vw] p-[1vw]">
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

function MobileImageGrid({ images }) {
  return (
    <div className="flex md:hidden w-full flex-col gap-[4vw] p-[2vw]">
      {images.map((img, idx) => {
        const orientation = getOrientation(img);
        return (
          <Img
            key={img.id ?? img.image_url ?? idx}
            image={img}
            scroll={false}
            className={`w-full ${orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"}`}
          />
        );
      })}
    </div>
  );
}