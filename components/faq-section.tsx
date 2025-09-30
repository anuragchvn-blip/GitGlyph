"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

const faqs = [
  {
    question: "What exactly is a GitGlyph NFT?",
    answer: "A GitGlyph NFT is your GitHub Gist transformed into a permanent, verifiable digital asset on the blockchain. It includes your code, metadata, and proof of authorship, stored forever on Arweave."
  },
  {
    question: "How does permanent storage work?",
    answer: "We use Arweave, a decentralized storage network that ensures your code exists permanently. Unlike traditional hosting that can disappear, Arweave creates an immutable, permanent record that lasts forever."
  },
  {
    question: "Can I sell or trade my GitGlyph NFTs?",
    answer: "Absolutely! Your GitGlyph NFTs are standard ERC-721 tokens that can be traded on any NFT marketplace like OpenSea, Foundation, or SuperRare. You have full ownership and control."
  },
  {
    question: "What programming languages are supported?",
    answer: "GitGlyph supports all programming languages that GitHub Gists support! JavaScript, Python, Solidity, Rust, Go, TypeScript, and hundreds more. We also support Markdown files and documentation."
  },
  {
    question: "How much does it cost to mint an NFT?",
    answer: "Minting costs only the blockchain gas fees (typically $5-20 on Ethereum mainnet). We don't charge any additional platform fees. You can also use Layer 2 solutions for lower costs."
  },
  {
    question: "Do I need to own the original Gist?",
    answer: "Yes, you should only mint Gists that you created and own. Our smart contract verifies the connection between your wallet and the GitHub account that created the Gist."
  },
  {
    question: "What happens if GitHub goes down?",
    answer: "Your GitGlyph NFTs are completely independent of GitHub! The full content is stored on Arweave, so even if GitHub disappears tomorrow, your code remains accessible forever."
  },
  {
    question: "Can I update my NFT after minting?",
    answer: "NFTs are immutable by design, which is what makes them permanent. However, you can mint new versions of updated code and create a versioned collection of your work evolution."
  }
]

export default function FAQSection() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <Badge variant="outline" className="px-4 py-2 bg-white/5 border-white/10">
              FAQ
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Frequently Asked
            <span className="block bg-gradient-to-r from-cyan-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            Everything you need to know about transforming your code into permanent digital assets.
          </p>
        </div>

        {/* FAQ items */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border border-white/10 rounded-lg px-6"
              >
                <AccordionTrigger className="text-left text-white hover:text-cyan-400 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/70 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Still have questions */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-cyan-400/10 via-pink-400/10 to-orange-400/10 border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-white/70 mb-6">
              Join our Discord community or reach out to our team directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-black hover:bg-white/90">
                Join Discord
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}