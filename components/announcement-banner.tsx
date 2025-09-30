"use client"

import { X } from "lucide-react"
import { useState, useEffect } from "react"

interface AnnouncementBannerProps {
  onVisibilityChange?: (isVisible: boolean) => void
}

interface BannerInfo {
  id: string
  desktopText: string
  mobileText: string
  linkText: string
  linkUrl: string
}

const bannerInfos: BannerInfo[] = [
  {
    id: "product-hunt-launch",
    desktopText: '🎯 We are launching on Product Hunt! Support us and be among the first to mint code NFTs',
    mobileText: '🎯 Launching on Product Hunt!',
    linkText: "Support Us",
    linkUrl: "https://www.producthunt.com/products/gitglyph",
  },
  {
    id: "gitglyph-launch",
    desktopText: '🚀 GitGlyph is LIVE — Turn your GitHub Gists into Beautiful NFTs on the blockchain',
    mobileText: '🚀 GitGlyph — Gists to NFTs',
    linkText: "Start Creating",
    linkUrl: "#hero",
  },
  {
    id: "arweave-permanent",
    desktopText: '💎 Permanent Storage on Arweave — Your code lives forever, truly decentralized',
    mobileText: '💎 Permanent on Arweave',
    linkText: "Learn More",
    linkUrl: "#features",
  },
  {
    id: "web3-ownership",
    desktopText: '🔗 True Web3 Ownership — Own, trade, and showcase your code as verifiable NFTs',
    mobileText: '🔗 True Web3 Ownership',
    linkText: "Explore",
    linkUrl: "#testimonials",
  },
]

export default function AnnouncementBanner({ onVisibilityChange }: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const currentBanner = bannerInfos[currentBannerIndex]

  // Cycle through banners every 8 seconds
  useEffect(() => {
    if (!isVisible || bannerInfos.length <= 1 || isPaused) return

    const interval = setInterval(() => {
      setIsTransitioning(true)

      setTimeout(() => {
        setCurrentBannerIndex((prev) => (prev + 1) % bannerInfos.length)
        setIsTransitioning(false)
      }, 300)
    }, 8000)

    return () => clearInterval(interval)
  }, [isVisible, isPaused])

  const handleClose = () => {
    setIsVisible(false)
    onVisibilityChange?.(false)
  }

  useEffect(() => {
    onVisibilityChange?.(isVisible)
  }, [isVisible, onVisibilityChange])

  if (!isVisible) return null

  const simpleTransition = isTransitioning ? "opacity-0 transform scale-98" : "opacity-100 transform scale-100"

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-black border-b border-white/10">
      <div className="sr-only" aria-live="polite" aria-atomic="true" key={currentBanner.id}>
        {currentBanner.desktopText}
      </div>

      <div
        className="flex items-center justify-center px-4 py-2 sm:py-3 max-w-7xl mx-auto min-h-[44px] sm:min-h-[52px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`flex items-center gap-3 transition-all duration-600 ease-out motion-reduce:transition-none motion-reduce:transform-none ${simpleTransition}`}
        >
          <div
            className={`w-1 h-4 bg-gradient-to-b from-cyan-400 via-orange-400 to-pink-400 rounded-full transition-all duration-300 ease-out motion-reduce:transition-none ${
              isTransitioning ? "scale-110 shadow-lg shadow-cyan-400/50" : "scale-100"
            }`}
          ></div>

          <div
            className={`transition-transform duration-600 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
              isTransitioning ? "delay-[50ms]" : "delay-100"
            }`}
          >
            <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>

          <a
            href={currentBanner.linkUrl}
            className="text-white/90 text-xs sm:text-sm cursor-pointer leading-tight font-geist font-medium tracking-tight leading-[1.3]"
          >
            <span className="hidden sm:inline">{currentBanner.desktopText} → </span>
            <span className="sm:hidden">{currentBanner.mobileText} →</span>
            <span className="text-white hover:text-white/80 transition-colors underline decoration-white/30 hover:decoration-white/60 underline-offset-2">
              {currentBanner.linkText}
            </span>
          </a>
        </div>

        {bannerInfos.length > 1 && (
          <div className="absolute right-16 hidden sm:flex items-center gap-1.5">
            {bannerInfos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBannerIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ease-out motion-reduce:transition-none ${
                  index === currentBannerIndex ? "bg-white w-6 shadow-sm" : "bg-white/30 hover:bg-white/50 w-1.5"
                } ${index === 0 ? "" : index === 1 ? "delay-[50ms]" : index === 2 ? "delay-[100ms]" : "delay-[150ms]"}`}
                aria-label={`Switch to banner ${index + 1}`}
              />
            ))}
          </div>
        )}

        <button
          onClick={handleClose}
          className="absolute right-4 p-1.5 text-white/50 hover:text-white/80 hover:bg-white/5 rounded-md transition-all duration-200 flex-shrink-0 motion-reduce:transition-none"
          aria-label="Close banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}