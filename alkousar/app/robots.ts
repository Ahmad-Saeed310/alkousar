import { MetadataRoute } from "next";

// TODO: keep in sync with app/sitemap.ts and app/layout.tsx's metadataBase.
const siteUrl = "https://alkousarproperties.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/login", "/test"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}