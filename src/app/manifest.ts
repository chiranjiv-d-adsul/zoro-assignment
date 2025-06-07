import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JEE main",
    short_name: "Jeemain",
    description: "A jeemain data",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/jee-logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/jee-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
