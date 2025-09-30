import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Web3Provider } from "../lib/providers"
import Header from "../components/header"
import { StructuredData, GeographicSEO } from "../components/seo"
import '@rainbow-me/rainbowkit/styles.css'

export const metadata: Metadata = {
  metadataBase: new URL("https://gitglyph.com"),
  title: {
    default: "GitGlyph - Transform GitHub Gists into NFTs | Web3 Code Ownership",
    template: "%s | GitGlyph - Web3 Code Platform"
  },
  description: "Transform your GitHub Gists into permanent, tradeable NFTs on the blockchain. Own your code forever with GitGlyph - the premier Web3 platform for developers. Secure storage on Arweave, mint on Polygon.",
  keywords: [
    "GitHub Gist NFT", "Code NFT", "Web3 Developer Tools", "Blockchain Code Storage", 
    "Arweave GitHub", "Polygon NFT Minting", "Developer NFT Platform", "Git NFT",
    "Code Ownership", "Decentralized Code Storage", "GitHub Web3", "Developer Portfolio NFT",
    "Code Monetization", "Smart Contract Code", "Open Source NFT", "Programming NFT",
    "Technical Writing NFT", "Code Snippets Blockchain", "Developer Assets", "Git Repository NFT"
  ],
  authors: [{ name: "GitGlyph Team", url: "https://gitglyph.com/team" }],
  creator: "GitGlyph",
  publisher: "GitGlyph Inc.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gitglyph.com",
    siteName: "GitGlyph",
    title: "GitGlyph - Transform GitHub Gists into NFTs | Web3 Code Ownership",
    description: "The premier platform for transforming GitHub Gists into permanent, tradeable NFTs. Built by developers, for developers. Secure Arweave storage, Polygon minting.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GitGlyph - Transform GitHub Gists into NFTs",
      },
      {
        url: "/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: "GitGlyph Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@gitglyph",
    creator: "@gitglyph",
    title: "GitGlyph - Transform GitHub Gists into NFTs | Web3 Code Ownership",
    description: "Transform your GitHub Gists into permanent, tradeable NFTs. Own your code forever with Web3 technology. #GitGlyph #Web3 #NFT #Developer",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://gitglyph.com",
    languages: {
      'en-US': 'https://gitglyph.com',
      'en-GB': 'https://gitglyph.com/en-gb',
      'en-CA': 'https://gitglyph.com/en-ca',
      'en-AU': 'https://gitglyph.com/en-au',
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: 'Technology',
  classification: 'Web3 Developer Tools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <StructuredData />
        <GeographicSEO />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="Global" />
        <meta name="ICBM" content="37.7749, -122.4194" />
        <meta name="DC.title" content="GitGlyph - Transform GitHub Gists into NFTs" />
        <meta name="DC.creator" content="GitGlyph Team" />
        <meta name="DC.subject" content="Web3, Blockchain, NFT, GitHub, Developer Tools" />
        <meta name="DC.description" content="Transform GitHub Gists into permanent NFTs" />
      </head>
      <body className="bg-black text-white antialiased">
        <Web3Provider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
        </Web3Provider>
      </body>
    </html>
  )
}