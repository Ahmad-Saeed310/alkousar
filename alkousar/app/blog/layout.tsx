import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on DHA Bahawalpur — investment guides, market updates, and news from Al-Kousar Properties, DHA Bahawalpur's Authorised Dealer.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Al-Kousar Properties",
    description:
      "Investment guides, market updates, and the occasional look behind the scenes from Al-Kousar Properties.",
    url: "/blog",
    type: "website",
  },
};


export default function AboutLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}