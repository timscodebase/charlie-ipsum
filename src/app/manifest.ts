import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Charlie Ipsum - Conservative Lorem Ipsum",
    short_name: "Charlie Ipsum",
    description: "The Conservative Lorem Ipsum & Debate Copy Engine honoring Charlie Kirk",
    start_url: "/",
    display: "standalone",
    background_color: "#060a14",
    theme_color: "#060a14",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
