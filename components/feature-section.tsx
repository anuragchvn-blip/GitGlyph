"use client"

import { ArrowUpRight, Shield, Zap, Coins, Code, Globe, Lock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Transform your gists into NFTs in seconds with our optimized minting process.",
    color: "from-yellow-400 to-orange-400"
  },
  {
    icon: Shield,
    title: "Permanent Storage",
    description: "Your code is permanently stored on Arweave, ensuring it lasts forever on the decentralized web.",
    color: "from-cyan-400 to-blue-400"
  },
  {
    icon: Coins,
    title: "True Ownership",
    description: "Own your code as verifiable NFTs that you can trade, sell, or showcase in your portfolio.",
    color: "from-pink-400 to-purple-400"
  },
  {
    icon: Code,
    title: "Developer First",
    description: "Built by developers, for developers. Supports all programming languages and markdown files.",
    color: "from-green-400 to-emerald-400"
  },
  {
    icon: Globe,
    title: "Decentralized",
    description: "No central server can take down your NFTs. They live on the blockchain permanently.",
    color: "from-indigo-400 to-purple-400"
  },
  {
    icon: Lock,
    title: "Secure & Verified",
    description: "Cryptographically signed and verified. Your ownership is mathematically provable.",
    color: "from-red-400 to-pink-400"
  }
]

export default function FeatureSection() {
  return (
    <section id="features" className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <Badge variant="outline" className="px-4 py-2 bg-white/5 border-white/10">
              Features
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Why Choose
            <span className="block bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
              GitGlyph?
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            The most powerful way to immortalize your code on the blockchain.
            Built for the modern developer workflow.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="group relative bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${feature.color} transition-opacity duration-300`}></div>
                
                <CardHeader className="relative">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <CardTitle className="text-xl font-semibold text-white flex items-center justify-between">
                    {feature.title}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight className="w-5 h-5 text-white/50" />
                    </div>
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative pt-0">
                  <CardDescription className="text-white/70 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-pink-400 text-black rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300">
            Start Creating NFTs
          </button>
        </div>
      </div>
    </section>
  )
}