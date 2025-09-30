"use client"

import { Heart, MessageCircle, Repeat, ExternalLink } from "lucide-react"

const tweets = [
  {
    author: "Alex Chen",
    handle: "@alexbuilds",
    avatar: "AC",
    content: "Just minted my first algorithm as an NFT on @GitGlyph 🚀 My code is now immortal on the blockchain. This is the future of developer portfolios!",
    likes: 234,
    replies: 45,
    retweets: 89,
    timestamp: "2h"
  },
  {
    author: "Sarah Dev", 
    handle: "@sarahcodes",
    avatar: "SD",
    content: "GitGlyph is a game-changer! 💎 Finally have true ownership of my code snippets. Just sold my React component NFT for 0.5 ETH. Mind = blown 🤯",
    likes: 456,
    replies: 78,
    retweets: 156,
    timestamp: "4h"
  },
  {
    author: "Marcus Tech",
    handle: "@marcustech",
    avatar: "MT", 
    content: "The fact that my code will exist forever on Arweave while GitHub could disappear tomorrow... GitGlyph just makes sense. Permanent code ownership FTW! 🔥",
    likes: 189,
    replies: 32,
    retweets: 67,
    timestamp: "6h"
  },
  {
    author: "Emily Zhang",
    handle: "@emilybuilds",
    avatar: "EZ",
    content: "Showcasing my smart contracts as NFTs on GitGlyph has attracted so many clients! It's like LinkedIn but with actual proof of work 💪 #Web3Portfolio",
    likes: 324,
    replies: 56,
    retweets: 98,
    timestamp: "8h"
  }
]

export default function VibeCodingTweetsSection() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Developer
            <span className="block bg-gradient-to-r from-cyan-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Community
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            See what developers are saying about GitGlyph and their NFT code collections.
          </p>
        </div>

        {/* Tweets grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {tweets.map((tweet, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              {/* Tweet header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 via-pink-400 to-orange-400 p-0.5 flex-shrink-0">
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {tweet.avatar}
                    </span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white truncate">
                      {tweet.author}
                    </span>
                    <span className="text-white/50 text-sm truncate">
                      {tweet.handle}
                    </span>
                    <span className="text-white/30 text-sm">·</span>
                    <span className="text-white/50 text-sm flex-shrink-0">
                      {tweet.timestamp}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
              </div>

              {/* Tweet content */}
              <p className="text-white/90 mb-4 leading-relaxed">
                {tweet.content}
              </p>

              {/* Tweet actions */}
              <div className="flex items-center justify-between text-white/40">
                <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{tweet.replies}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-green-400 transition-colors">
                  <Repeat className="w-4 h-4" />
                  <span className="text-sm">{tweet.retweets}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-pink-400 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{tweet.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-pink-400 text-black rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-400/25 transition-all">
            <span>Join the Community</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  )
}