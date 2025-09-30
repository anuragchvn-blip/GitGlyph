"use client"

import { X, Check, ArrowRight } from "lucide-react"

const comparisons = [
  {
    category: "Storage",
    traditional: "Temporary hosting",
    gitglyph: "Permanent on Arweave",
    traditionalIcon: X,
    gitglyphIcon: Check
  },
  {
    category: "Ownership", 
    traditional: "Platform dependent",
    gitglyph: "True Web3 ownership",
    traditionalIcon: X,
    gitglyphIcon: Check
  },
  {
    category: "Monetization",
    traditional: "No built-in options",
    gitglyph: "Tradeable NFT assets",
    traditionalIcon: X,
    gitglyphIcon: Check
  },
  {
    category: "Verification",
    traditional: "Basic authentication",
    gitglyph: "Cryptographic proof",
    traditionalIcon: X,
    gitglyphIcon: Check
  },
  {
    category: "Discoverability",
    traditional: "Limited visibility",
    gitglyph: "NFT marketplaces",
    traditionalIcon: X,
    gitglyphIcon: Check
  }
]

export default function WhyNotGitSection() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Why not just use
            <span className="block bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Regular Gists?
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            GitHub Gists are great for sharing code, but GitGlyph takes it to the next level with 
            true ownership and permanent storage.
          </p>
        </div>

        {/* Comparison table */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-white/5 border-b border-white/10">
            <div className="text-white/60 font-medium">Feature</div>
            <div className="text-white/60 font-medium">Traditional Gists</div>
            <div className="text-white/60 font-medium">GitGlyph NFTs</div>
          </div>

          {/* Comparison rows */}
          {comparisons.map((comparison, index) => {
            const TraditionalIcon = comparison.traditionalIcon
            const GitglyphIcon = comparison.gitglyphIcon
            
            return (
              <div 
                key={comparison.category}
                className={`grid grid-cols-3 gap-4 p-6 ${
                  index < comparisons.length - 1 ? 'border-b border-white/10' : ''
                }`}
              >
                <div className="font-medium text-white">{comparison.category}</div>
                <div className="flex items-center gap-3 text-white/70">
                  <TraditionalIcon className="w-4 h-4 text-red-400 flex-shrink-0" />
                  {comparison.traditional}
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <GitglyphIcon className="w-4 h-4 text-green-400 flex-shrink-0" />
                  {comparison.gitglyph}
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-cyan-400/10 via-pink-400/10 to-orange-400/10 border border-white/10 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Ready to own your code forever?
            </h3>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who have already immortalized their code on the blockchain.
              Your future self will thank you.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition-all hover:scale-105">
              Get Started Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}