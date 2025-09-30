import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GitGlyph - Transform GitHub Gists into NFTs",
    short_name: "GitGlyph",
    description: "Transform your GitHub Gists into beautiful, permanent artifacts on the blockchain.",
    start_url: "/",
    display: "standalone",
    background_color: "#9333ea",
    theme_color: "#9333ea",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
