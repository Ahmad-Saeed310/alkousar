import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Al-Kousar Properties is DHA Bahawalpur's Authorised Dealer, Reg #222 — ranked 1st among DHA Bahawalpur dealers in 2025 with a 100% client recommend rating. Learn about our team and how we work.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | Al-Kousar Properties",
    description:
      "DHA Bahawalpur's Authorised Dealer, Reg #222 — ranked 1st among DHA Bahawalpur dealers in 2025.",
    url: "/about",
    type: "website",
  },
};

export default function AboutLayout({ children }) {
  return children;
}