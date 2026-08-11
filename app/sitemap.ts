import type { MetadataRoute } from "next";
import { contact } from "@/lib/contact";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: contact.site,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${contact.site}/card`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
