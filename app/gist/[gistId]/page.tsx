'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ArticleEditor from '../../../components/article-editor'
import Link from 'next/link'

export interface GistData {
  description: string
  authorLogin: string
  authorAvatarUrl: string
  content: string
  filename: string
  language: string
  createdAt: string
  updatedAt: string
}

export default function GistPage() {
  const params = useParams()
  const gistId = params.gistId as string

  const [gistData, setGistData] = useState<GistData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!gistId) return

    const fetchGist = async () => {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch('/api/get-gist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ gistId }),
        })

        if (!response.ok) {
          if (response.status === 404) {
            setError('Gist not found')
            return
          }
          if (response.status === 429) {
            setError('API rate limit exceeded. Please try again later.')
            return
          }
          throw new Error('Failed to fetch gist')
        }

        const data: GistData = await response.json()
        setGistData(data)
      } catch (err) {
        setError('Failed to load gist. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchGist()
  }, [gistId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading GitGlyph...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
          <p className="text-gray-400 mb-8">{error}</p>
          <Link 
            href="/" 
            className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    )
  }

  if (!gistData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <h1 className="text-3xl font-bold mb-4">Gist Not Found</h1>
          <p className="text-gray-400 mb-8">The requested gist could not be found.</p>
          <Link 
            href="/" 
            className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    )
  }

  return <ArticleEditor gistData={gistData} gistId={gistId} />
}