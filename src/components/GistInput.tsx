'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function GistInput() {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const extractGistId = (url: string): string | null => {
    // Handle various GitHub Gist URL formats:
    // https://gist.github.com/username/gistId
    // https://gist.github.com/gistId
    // gistId (just the ID)
    
    const trimmedUrl = url.trim()
    
    // If it's just a gist ID (32 char hex string)
    if (/^[a-f0-9]{32}$/i.test(trimmedUrl)) {
      return trimmedUrl
    }
    
    // Extract from full URL
    const gistUrlRegex = /gist\.github\.com\/(?:[^\/]+\/)?([a-f0-9]{32})/i
    const match = trimmedUrl.match(gistUrlRegex)
    
    return match ? match[1] : null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!url) {
      setError('Please enter a GitHub Gist URL')
      return
    }

    const gistId = extractGistId(url)
    if (!gistId) {
      setError('Invalid GitHub Gist URL. Please check the format.')
      return
    }

    setIsLoading(true)

    try {
      // Test if the gist exists by making a quick API call
      const response = await fetch('/api/get-gist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gistId }),
      })

      if (!response.ok) {
        if (response.status === 404) {
          setError('Gist not found. Please check that the gist is public.')
          return
        }
        if (response.status === 429) {
          setError('API rate limit exceeded. Please try again later.')
          return
        }
        throw new Error('Failed to fetch gist')
      }

      // Navigate to the gist page
      router.push(`/gist/${gistId}`)
    } catch (err) {
      setError('Failed to fetch gist. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="gist-url" className="block text-lg font-bold text-foreground mb-3">
              Enter GitHub Gist URL
            </label>
            <div className="relative">
              <input
                id="gist-url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://gist.github.com/username/gist-id"
                disabled={isLoading}
                className="w-full rounded-2xl border-2 border-gray-200 bg-gray-50 px-6 py-5 text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
              />
              {isLoading && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="h-6 w-6 animate-spin rounded-full border-3 border-primary border-t-transparent" />
                </div>
              )}
            </div>
            {error && (
              <div className="mt-3 rounded-2xl bg-red-50 border border-red-200 p-4">
                <p className="text-sm font-semibold text-red-600">{error}</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !url}
            className="group w-full relative overflow-hidden rounded-2xl bg-gradient-poap px-8 py-6 text-xl font-black text-white shadow-2xl transition-all hover:scale-105 hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            <span className="relative z-10">
              {isLoading ? 'Transforming...' : 'Transform into Glyph ✨'}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
          </button>
        </form>
      </div>

      {/* Example URLs - POAP Style */}
      <div className="mt-8 text-center">
        <p className="mb-6 text-lg font-bold text-foreground">Try with an example:</p>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            'https://gist.github.com/octocat/6cad326836d38bd3a7ae',
            'https://gist.github.com/defunkt/6443',
          ].map((exampleUrl, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setUrl(exampleUrl)}
              className="group rounded-2xl border-2 border-primary/20 bg-primary/5 px-6 py-3 font-bold text-primary hover:bg-primary hover:text-white transition-all hover:scale-105 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary group-hover:bg-white"></div>
                Example {index + 1}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Supported formats - POAP Style */}
      <div className="mt-12 rounded-3xl border-2 border-gray-100 bg-white p-8 shadow-xl">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-foreground mb-2">Supported Formats</h3>
          <p className="text-muted-foreground">GitGlyph works with various GitHub Gist URL formats</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="mt-1 h-3 w-3 rounded-full bg-gradient-poap flex-shrink-0"></div>
            <div>
              <p className="font-bold text-foreground">Full URL</p>
              <p className="text-sm text-muted-foreground font-mono">https://gist.github.com/username/gistId</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="mt-1 h-3 w-3 rounded-full bg-gradient-blue flex-shrink-0"></div>
            <div>
              <p className="font-bold text-foreground">Short URL</p>
              <p className="text-sm text-muted-foreground font-mono">https://gist.github.com/gistId</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50">
            <div className="mt-1 h-3 w-3 rounded-full bg-gradient-pink flex-shrink-0"></div>
            <div>
              <p className="font-bold text-foreground">Just ID</p>
              <p className="text-sm text-muted-foreground font-mono">gistId (32 character hex string)</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-6 rounded-2xl bg-gradient-poap/5 border border-primary/20">
          <p className="text-center text-base font-bold text-primary">
            ✨ <strong>Pro Tip:</strong> After transforming, use the <span className="text-accent font-black">Edit</span> feature to customize your Glyph before minting!
          </p>
        </div>
      </div>
    </div>
  )
}