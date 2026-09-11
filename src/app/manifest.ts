import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Charlie Ipsum - The Conservative Lorem Ipsum Generator",
    short_name: "Charlie Ipsum",
    description:
      "The Conservative Lorem Ipsum & Debate Copy Engine dedicated to the rhetorical themes of Charlie Kirk and Turning Point USA.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#060a14",
    theme_color: "#060a14",
    orientation: "portrait-primary",
    categories: ["utilities", "productivity", "developer tools"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/screenshot-wide.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "Charlie Ipsum on Desktop - Discourse Controls and Transcript",
      },
      {
        src: "/screenshot-narrow.png",
        sizes: "750x1334",
        type: "image/png",
        form_factor: "narrow",
        label: "Charlie Ipsum on Mobile - Fast Debate Rhetoric Generation",
      },
    ],
    shortcuts: [
      {
        name: "Campus Clash",
        short_name: "Campus",
        description: "Open mic challenges and free speech debates",
        url: "/?tone=campus-debate",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Constitutional",
        short_name: "Constitution",
        description: "Federalism and constitutional republicanism",
        url: "/?tone=constitutional",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Free Enterprise",
        short_name: "Economics",
        description: "Free markets and sound currency",
        url: "/?tone=economic",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "TPUSA Rally",
        short_name: "Rally",
        description: "National action summit speeches",
        url: "/?tone=rally",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}
