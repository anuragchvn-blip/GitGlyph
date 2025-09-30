"use client"

import { useState } from "react"
import { ArrowRight, Github, Sparkles, Wallet, Code, Star } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { Separator } from "./ui/separator"
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function HeroSection() {
  const [gistUrl, setGistUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (gistUrl) {
      setIsLoading(true)
      const gistId = gistUrl.split('/').pop()
      if (gistId) {
        setTimeout(() => {
          window.location.href = `/gist/${gistId}`
        }, 500)
      }
    }
  }

  return (
    <section id="hero" className="relative px-4 pt-16 pb-32 sm:pt-24 sm:pb-40">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <Badge variant="secondary" className="px-4 py-2 bg-white/5 border border-white/10">
              <Sparkles className="w-4 h-4 text-cyan-400 mr-2" />
              Transform Code into NFTs
              <Star className="w-4 h-4 text-yellow-400 ml-2" />
            </Badge>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight mb-8">
            <span className="block text-white">GitHub Gists to</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Beautiful NFTs
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl lg:text-2xl text-white/70 max-w-4xl mx-auto mb-8 leading-relaxed">
            🚀 Transform your GitHub Gists into <span className="text-cyan-400 font-semibold">permanent NFTs</span>
            <br className="hidden sm:block" />
            <span className="text-pink-400 font-semibold">Own your code forever</span> • <span className="text-orange-400 font-semibold">Trade on any marketplace</span> • <span className="text-green-400 font-semibold">Arweave secured</span>
          </p>

          {/* Wallet Connection Status */}
          <div className="flex justify-center mb-8">
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
                            variant="outline"
                            className="border-gray-700 hover:border-cyan-400 text-gray-300 hover:text-white transition-all duration-300"
                          >
                            <Wallet className="w-4 h-4 mr-2" />
                            Connect Wallet to Start
                          </Button>
                        )
                      }

                      if (chain.unsupported) {
                        return (
                          <Button 
                            onClick={openChainModal}
                            variant="destructive"
                            className="border border-red-500"
                          >
                            Wrong Network - Click to Switch
                          </Button>
                        )
                      }

                      return (
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline" className="bg-green-500/10 border-green-500 text-green-400">
                            ✓ Connected to {chain.name}
                          </Badge>
                          <Button
                            onClick={openAccountModal}
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-white"
                          >
                            {account.displayName}
                          </Button>
                        </div>
                      )
                    })()}
                  </div>
                )
              }}
            </ConnectButton.Custom>
          </div>

          {/* Input form */}
          <Card className="max-w-2xl mx-auto mb-12 bg-white/5 border-white/10">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Github className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input
                    type="url"
                    placeholder="https://gist.github.com/your-username/gist-id"
                    value={gistUrl}
                    onChange={(e) => setGistUrl(e.target.value)}
                    className="pl-12 bg-transparent border-white/10 text-white placeholder-white/40 focus:border-cyan-400/50 focus:ring-cyan-400/50"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={!gistUrl || isLoading}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-semibold transition-all min-w-[140px]"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Code className="w-4 h-4 mr-2" />
                      Create NFT
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Separator className="max-w-md mx-auto mb-8 bg-white/10" />

          {/* Status indicators */}
          <div className="flex items-center justify-center gap-8 text-sm">
            <Badge variant="outline" className="bg-green-500/10 border-green-500/50 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Arweave Ready
            </Badge>
            <Badge variant="outline" className="bg-blue-500/10 border-blue-500/50 text-blue-400">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
              Polygon Network
            </Badge>
            <Badge variant="outline" className="bg-purple-500/10 border-purple-500/50 text-purple-400">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
              Web3 Enabled
            </Badge>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  )
}