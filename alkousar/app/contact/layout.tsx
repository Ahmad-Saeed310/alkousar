import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Al-Kousar Properties. Call +92 347 7246576, email alkousarproperties@gmail.com, or visit our office at Alpha Avenue, Sector-B, DHA Bahawalpur.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Al-Kousar Properties",
    description:
      "Questions about a plot, a home, or an investment in DHA Bahawalpur? Call, email, or visit our office.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactLayout({ children }) {
  return children;
}