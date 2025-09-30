"use client"

import { cn } from "../lib/utils"

interface GitGlyphLogoProps {
  className?: string
  size?: number
  animated?: boolean
}

export function GitGlyphLogo({ className, size = 40, animated = false }: GitGlyphLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("", className)}
    >
      {/* Background circle with gradient */}
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>

        <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#f472b6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#fb923c" stopOpacity="0.8" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer glow ring */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="none"
        stroke="url(#glowGradient)"
        strokeWidth="0.5"
        opacity="0.6"
        className={animated ? "animate-pulse" : ""}
      />

      {/* Main background */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="url(#bgGradient)"
        className={animated ? "animate-spin [animation-duration:20s]" : ""}
      />

      {/* Minimalist octopus silhouette */}
      <g transform="translate(50, 50)" filter="url(#glow)">
        <path
          d="
            M 0 -20
            C -10 -20 -18 -12 -18 -2
            C -18 6 -15 10 -12 14
            C -14 18 -10 22 -6 20
            C -4 22 -2 24 0 24
            C 2 24 4 22 6 20
            C 10 22 14 18 12 14
            C 15 10 18 6 18 -2
            C 18 -12 10 -20 0 -20
            Z
          "
          fill="#fff"
        />

        {/* Eyes */}
        <circle cx="-6" cy="-6" r="3" fill="#000" />
        <circle cx="6" cy="-6" r="3" fill="#000" />

        {/* Smile */}
        <path
          d="M -4 2 Q 0 6 4 2"
          stroke="#000"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Outer decorative elements */}
      <circle
        cx="20"
        cy="20"
        r="2"
        fill="#22d3ee"
        opacity="0.6"
        className={animated ? "animate-ping" : ""}
      />

      <circle
        cx="80"
        cy="30"
        r="1.5"
        fill="#ec4899"
        opacity="0.6"
        className={animated ? "animate-ping [animation-delay:1s]" : ""}
      />

      <circle
        cx="75"
        cy="75"
        r="2"
        fill="#f97316"
        opacity="0.6"
        className={animated ? "animate-ping [animation-delay:2s]" : ""}
      />
    </svg>
  )
}

export function GitGlyphWordmark({ className, height = 32 }: { className?: string, height?: number }) {
  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <GitGlyphLogo size={height} />
      <svg
        height={height}
        viewBox="0 0 200 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
      >
        <defs>
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>

        <text
          x="0"
          y="28"
          fontSize="24"
          fontWeight="bold"
          fontFamily="system-ui, -apple-system, sans-serif"
          fill="url(#textGradient)"
        >
          GitGlyph
        </text>
      </svg>
    </div>
  )
}
