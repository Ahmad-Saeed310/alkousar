"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "@/context/TransitionContext";
import gsap from "gsap";

export default function TransitionLink({
  href,
  children,
  className,
}) {
  const router = useRouter();
  const { overlayRef } = useTransition();

  const handleClick = (e) => {
    e.preventDefault();

    if (!overlayRef.current) return;

    gsap.set(overlayRef.current, {
      display: "block",
    });

    gsap.fromTo(
      ".stair",
      {
        height: 0,
      },
      {
        height: "100%",
        stagger: -0.08,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          router.push(href);
        },
      }
    );
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
    >
      {children}
    </Link>
  );
}