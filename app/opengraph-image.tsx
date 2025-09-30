import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "GitGlyph - Transform GitHub Gists into Beautiful NFTs"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// This route generates the Open Graph image
export default function Image() {
  return new ImageResponse(
    <div className="flex justify-center items-center w-full h-full">
    
    </div>,
    {
      ...size,
    },
  )
}
