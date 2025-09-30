"use client"

import Link from "next/link"
import { Github, Twitter, ExternalLink, Sparkles } from "lucide-react"

const navigation = {
  product: [
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" }
  ],
  resources: [
    { name: "Documentation", href: "/docs" },
    { name: "API Reference", href: "/api" },
    { name: "Examples", href: "/examples" },
    { name: "Blog", href: "/blog" }
  ],
  community: [
    { name: "Discord", href: "https://discord.gg/gitglyph" },
    { name: "Twitter", href: "https://twitter.com/gitglyph" },
    { name: "GitHub", href: "https://github.com/gitglyph" },
    { name: "Support", href: "/support" }
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" }
  ]
}

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/gitglyph",
    icon: Github
  },
  {
    name: "Twitter", 
    href: "https://twitter.com/gitglyph",
    icon: Twitter
  }
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        {/* Main footer content */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 via-pink-400 to-orange-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-black" />
              </div>
              <span className="text-xl font-bold text-white">GitGlyph</span>
            </div>
            <p className="text-white/70 leading-relaxed mb-6 max-w-sm">
              Transform your GitHub Gists into permanent, tradeable NFTs on the blockchain. 
              Own your code forever.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Navigation sections */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3">
                {navigation.product.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-3">
                {navigation.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Community</h3>
              <ul className="space-y-3">
                {navigation.community.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-white/60 hover:text-white transition-colors flex items-center gap-1"
                      target={item.href.startsWith('http') ? "_blank" : undefined}
                      rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    >
                      {item.name}
                      {item.href.startsWith('http') && (
                        <ExternalLink className="w-3 h-3" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-3">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="max-w-md">
            <h3 className="font-semibold text-white mb-4">Stay updated</h3>
            <p className="text-white/60 text-sm mb-4">
              Get the latest updates on new features and developer stories.
            </p>
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © 2024 GitGlyph. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <span className="text-white/60">
              Built with ❤️ for developers
            </span>
            <div className="flex items-center gap-2 text-white/60">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}