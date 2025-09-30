"use client"

import { Check, ArrowRight, Sparkles } from "lucide-react"

const steps = [
  {
    title: "Paste Gist URL",
    description: "Simply paste your GitHub Gist URL into GitGlyph",
    details: ["Any public GitHub Gist", "Supports all languages", "Markdown files included"]
  },
  {
    title: "Preview & Customize",
    description: "Review your gist and customize the NFT metadata",
    details: ["Beautiful syntax highlighting", "Custom descriptions", "Author attribution"]
  },
  {
    title: "Mint Forever",
    description: "Create your NFT and store it permanently on Arweave",
    details: ["Permanent storage", "Blockchain verified", "Tradeable asset"]
  }
]

export default function SaveReviewRestoreSection() {
  return (
    <section className="relative py-24 px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950/50 to-black"></div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-white/90">Simple 3-Step Process</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            From Code to
            <span className="block bg-gradient-to-r from-cyan-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Collectible
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            Transform your GitHub Gists into permanent NFTs with our streamlined three-step process.
            No complex setup required.
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-white/20 to-transparent"></div>
              )}
              
              <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                {/* Step number */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-pink-400 flex items-center justify-center text-black font-bold text-sm mb-6">
                  {index + 1}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  {step.description}
                </p>

                {/* Details */}
                <ul className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center gap-3 text-sm text-white/60">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Demo section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                See it in action
              </h3>
              <p className="text-white/70 mb-8 leading-relaxed">
                Watch how easy it is to transform your GitHub Gist into a beautiful, 
                permanent NFT that you can own, trade, and showcase.
              </p>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition-colors">
                Try Demo Gist
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            {/* Demo placeholder */}
            <div className="relative">
              <div className="aspect-video rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-white/50" />
                  </div>
                  <p className="text-white/50 text-sm">Interactive Demo Coming Soon</p>
                </div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/20 via-pink-400/20 to-orange-400/20 blur-xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}