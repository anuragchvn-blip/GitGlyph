"use client"

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { GitGlyphLogo } from './logo'
import Link from 'next/link'
import { Github, Home, FileText, Wallet } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b border-gray-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <GitGlyphLogo size={32} animated />
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                GitGlyph
              </span>
            </Link>
            
            <Separator orientation="vertical" className="h-6" />
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link href="/explore" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                <FileText className="w-4 h-4" />
                <span>Explore</span>
              </Link>
            </nav>
          </div>

          {/* Status and Connect */}
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="hidden sm:flex">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
              Polygon Ready
            </Badge>
            
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
              }) => {
                const ready = mounted
                const connected = ready && account && chain

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      style: {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <Button 
                            onClick={openConnectModal}
                            className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600"
                          >
                            <Wallet className="w-4 h-4 mr-2" />
                            Connect Wallet
                          </Button>
                        )
                      }

                      if (chain.unsupported) {
                        return (
                          <Button 
                            onClick={openChainModal}
                            variant="destructive"
                          >
                            Wrong network
                          </Button>
                        )
                      }

                      return (
                        <div className="flex items-center space-x-2">
                          <Button
                            onClick={openChainModal}
                            variant="outline"
                            size="sm"
                            className="flex items-center space-x-2"
                          >
                            {chain.hasIcon && chain.iconUrl && (
                              <img
                                alt={chain.name ?? 'Chain icon'}
                                src={chain.iconUrl}
                                className="w-3 h-3 rounded-full object-cover mr-1"
                              />
                            )}
                            <span>{chain.name}</span>
                          </Button>

                          <Button
                            onClick={openAccountModal}
                            variant="outline"
                          >
                            {account.displayName}
                            {account.displayBalance
                              ? ` (${account.displayBalance})`
                              : ''}
                          </Button>
                        </div>
                      )
                    })()}
                  </div>
                )
              }}
            </ConnectButton.Custom>
          </div>
        </div>
      </div>
    </header>
  )
}