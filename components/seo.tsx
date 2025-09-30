"use client"

export function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GitGlyph",
    "description": "Transform GitHub Gists into permanent, tradeable NFTs on the blockchain",
    "url": "https://gitglyph.com",
    "logo": "https://gitglyph.com/logo.png",
    "foundingDate": "2024",
    "founders": [
      {
        "@type": "Person",
        "name": "GitGlyph Team"
      }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "support@gitglyph.com",
      "url": "https://gitglyph.com/support"
    },
    "sameAs": [
      "https://twitter.com/gitglyph",
      "https://github.com/gitglyph",
      "https://discord.gg/gitglyph"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US",
      "addressRegion": "Global"
    }
  }

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "GitGlyph",
    "url": "https://gitglyph.com",
    "description": "Transform GitHub Gists into permanent, tradeable NFTs on the blockchain",
    "publisher": {
      "@type": "Organization",
      "name": "GitGlyph"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://gitglyph.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  const softwareApplicationData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "GitGlyph",
    "description": "Web3 platform for transforming GitHub Gists into NFTs",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "GitHub Gist to NFT conversion",
      "Arweave permanent storage",
      "Polygon blockchain minting",
      "Web3 wallet integration",
      "Code syntax highlighting",
      "Metadata customization"
    ]
  }

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is GitGlyph?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "GitGlyph is a Web3 platform that transforms GitHub Gists into permanent, tradeable NFTs on the blockchain using Arweave for storage and Polygon for minting."
        }
      },
      {
        "@type": "Question",
        "name": "How much does it cost to mint an NFT?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Minting costs only the blockchain gas fees on Polygon, typically less than $0.01. There are no additional platform fees."
        }
      },
      {
        "@type": "Question",
        "name": "Is my code stored permanently?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, your code is stored permanently on Arweave, a decentralized storage network that ensures immutable, permanent data preservation."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </>
  )
}

export function GeographicSEO() {
  const geoData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "GitGlyph Web3 Development Platform",
    "provider": {
      "@type": "Organization",
      "name": "GitGlyph"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "United States"
      },
      {
        "@type": "Country", 
        "name": "Canada"
      },
      {
        "@type": "Country",
        "name": "United Kingdom"
      },
      {
        "@type": "Country",
        "name": "Germany"
      },
      {
        "@type": "Country",
        "name": "France"
      },
      {
        "@type": "Country",
        "name": "Australia"
      },
      {
        "@type": "Country",
        "name": "Japan"
      },
      {
        "@type": "Country",
        "name": "Singapore"
      },
      {
        "@type": "Country",
        "name": "India"
      },
      {
        "@type": "Country",
        "name": "Brazil"
      }
    ],
    "serviceType": "Web3 Developer Platform"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(geoData) }}
    />
  )
}