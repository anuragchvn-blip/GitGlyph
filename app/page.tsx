'use client'

import { useState } from "react"
import AnnouncementBanner from "../components/announcement-banner"
import HeroSection from "../components/hero-section"  
import FeatureSection from "../components/feature-section"
import SaveReviewRestoreSection from "../components/save-review-restore-section"
import WhyNotGitSection from "../components/why-not-git-section"
import TestimonialsSection from "../components/testimonials-section"
import VibeCodingTweetsSection from "../components/vibe-coding-tweets-section"
import FAQSection from "../components/faq-section"
import Footer from "../components/footer"

export default function Page() {
  const [bannerVisible, setBannerVisible] = useState(true)

  return (
    <div className="min-h-screen bg-black text-white font-geist">
      {/* Announcement Banner */}
      <AnnouncementBanner onVisibilityChange={setBannerVisible} />
      
      {/* Main Content */}
      <main className={`${bannerVisible ? 'pt-[44px] sm:pt-[52px]' : ''}`}>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Feature Section */}
        <FeatureSection />
        
        {/* Save, Review, Restore Section */}
        <SaveReviewRestoreSection />
        
        {/* Why Not Git Section */}
        <WhyNotGitSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* Vibe Coding Tweets Section */}
        <VibeCodingTweetsSection />
        
        {/* FAQ Section */}
        <FAQSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}