'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="h-12 w-12 rounded-2xl bg-gradient-poap flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-lg font-black text-white">G</span>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-pink opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
          </div>
          <span className="text-2xl font-black text-foreground">GitGlyph</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-10">
          <Link 
            href="/" 
            className="text-base font-bold text-muted-foreground hover:text-primary transition-colors relative group"
          >
            Home
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-poap group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link 
            href="/docs" 
            className="text-base font-bold text-muted-foreground hover:text-primary transition-colors relative group"
          >
            Docs
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-poap group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link 
            href="/gallery" 
            className="text-base font-bold text-muted-foreground hover:text-primary transition-colors relative group"
          >
            Gallery
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-poap group-hover:w-full transition-all duration-300"></div>
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ConnectButton 
            chainStatus="icon"
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'full',
            }}
            showBalance={{
              smallScreen: false,
              largeScreen: true,
            }}
          />
        </div>
      </div>
    </header>
  )
}