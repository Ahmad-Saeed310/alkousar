import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse DHA Bahawalpur plots and properties from Al-Kousar Properties — residential and commercial listings, plot sales and resale, and investment opportunities.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Al-Kousar Properties",
    description:
      "Browse DHA Bahawalpur plots and properties — residential and commercial listings, plot sales and resale, and investment opportunities.",
    url: "/projects",
    type: "website",
  },
};

export default function ProjectsLayout({ children }) {
  return children;
}