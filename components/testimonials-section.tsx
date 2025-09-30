"use client"

import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Frontend Developer",
    company: "Meta",
    avatar: "/avatars/sarah.jpg",
    content: "GitGlyph changed how I think about code ownership. My algorithm implementations are now permanent NFTs that I can showcase and even sell. Incredible!",
    rating: 5
  },
  {
    name: "Marcus Rodriguez",
    role: "Blockchain Developer", 
    company: "Chainlink",
    avatar: "/avatars/marcus.jpg",
    content: "Finally, a way to truly own my code snippets. The Arweave integration is genius - my gists will outlive any centralized platform.",
    rating: 5
  },
  {
    name: "Emily Zhang",
    role: "Full Stack Engineer",
    company: "Vercel", 
    avatar: "/avatars/emily.jpg",
    content: "I've minted over 50 of my best gists as NFTs. It's like having a portfolio that's mathematically provable and permanent. Love it!",
    rating: 5
  },
  {
    name: "David Kim",
    role: "DevOps Engineer",
    company: "Docker",
    avatar: "/avatars/david.jpg", 
    content: "The process is so smooth. Paste URL, customize, mint. My infrastructure scripts are now collectible assets. Mind-blowing concept!",
    rating: 5
  },
  {
    name: "Alex Thompson",
    role: "AI Research Engineer",
    company: "OpenAI",
    avatar: "/avatars/alex.jpg",
    content: "GitGlyph makes my research code immortal. Even if GitHub disappears tomorrow, my algorithms live forever on the blockchain.",
    rating: 5
  },
  {
    name: "Luna Patel",
    role: "Smart Contract Dev",
    company: "Uniswap",
    avatar: "/avatars/luna.jpg",
    content: "Perfect for showcasing my Solidity snippets. Each NFT tells the story of my coding journey. Clients love seeing my verified work history.",
    rating: 5
  }
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24 px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950/30 to-black"></div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Loved by
            <span className="block bg-gradient-to-r from-cyan-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Developers
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            Join thousands of developers who have already transformed their code into permanent digital assets.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              {/* Quote icon */}
              <Quote className="w-6 h-6 text-white/30 mb-4" />
              
              {/* Content */}
              <p className="text-white/80 mb-6 leading-relaxed">
                {`"${testimonial.content}"`}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 via-pink-400 to-orange-400 p-0.5">
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-white/60 text-xs">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/5 via-pink-400/5 to-orange-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-white mb-2">10K+</div>
            <div className="text-white/60">NFTs Minted</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-white mb-2">5K+</div>
            <div className="text-white/60">Developers</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-white mb-2">100+</div>
            <div className="text-white/60">Languages</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-bold text-white mb-2">99.9%</div>
            <div className="text-white/60">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  )
}