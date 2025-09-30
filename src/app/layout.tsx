import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "GitGlyph - Transform GitHub Gists into NFTs",
  description: "Transform your GitHub Gists into beautiful, permanent artifacts on the blockchain.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
