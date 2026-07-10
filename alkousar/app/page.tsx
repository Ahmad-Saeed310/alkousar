import type { Metadata } from "next";
import Image from "next/image";
import Web from "./Web";

export const metadata: Metadata = {
  title: "Al-Kousar Properties | Real Estate in Bahawalpur, DHA",
  description:
    "Al-Kousar Properties is DHA Bahawalpur's Authorised Dealer (Reg #222), ranked 1st among DHA Bahawalpur dealers in 2025. Explore plots, homes, and investment opportunities in DHA Bahawalpur.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <Web />;
}