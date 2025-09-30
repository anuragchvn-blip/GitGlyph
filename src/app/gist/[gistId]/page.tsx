'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import { motion } from 'framer-motion'
import { Web3ActionsPanel } from '../../../components/Web3ActionsPanel'
import { AnimatedBackground } from '../../../components/ui/animated-background'
import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Card } from '../../../components/ui/card'

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
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState('')
  const [editedTitle, setEditedTitle] = useState('')

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
        setEditedContent(data.content)
        setEditedTitle(data.description)
      } catch (err) {
        setError('Failed to load gist. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchGist()
  }, [gistId])

  const handleStartEditing = () => {
    setIsEditing(true)
  }

  const handleSaveEdit = () => {
    if (gistData) {
      setGistData({
        ...gistData,
        content: editedContent,
        description: editedTitle,
      })
    }
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    if (gistData) {
      setEditedContent(gistData.content)
      setEditedTitle(gistData.description)
    }
    setIsEditing(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const isMarkdownFile = (filename: string) => {
    return filename.toLowerCase().endsWith('.md') || filename.toLowerCase().endsWith('.markdown')
  }

  const getLanguageFromFilename = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase()
    const languageMap: { [key: string]: string } = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'py': 'python',
      'rb': 'ruby',
      'go': 'go',
      'rs': 'rust',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c',
      'cs': 'csharp',
      'php': 'php',
      'sh': 'bash',
      'sql': 'sql',
      'json': 'json',
      'xml': 'xml',
      'html': 'html',
      'css': 'css',
      'scss': 'scss',
      'yaml': 'yaml',
      'yml': 'yaml',
    }
    return languageMap[extension || ''] || 'text'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-4xl">
            <div className="animate-pulse">
              <div className="mb-8 h-10 bg-subtle rounded-lg"></div>
              <div className="mb-6 h-6 bg-subtle rounded w-3/4"></div>
              <div className="mb-6 h-4 bg-subtle rounded w-1/2"></div>
              <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-4 bg-subtle rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Error</h1>
            <p className="text-muted-foreground mb-8 text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors font-semibold"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!gistData) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Gist Not Found</h1>
            <p className="text-muted-foreground text-lg">The requested gist could not be found.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <AnimatedBackground />
      
      {/* Integrated Header */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100/50 shadow-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="h-12 w-12 rounded-2xl bg-gradient-poap flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-lg font-black text-white">G</span>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-pink opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
            </div>
            <span className="text-2xl font-black text-gray-900">GitGlyph</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-10">
            <Link 
              href="/" 
              className="text-base font-semibold text-gray-600 hover:text-gray-900 transition-colors relative group"
            >
              Home
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-poap group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link 
              href="/docs" 
              className="text-base font-semibold text-gray-600 hover:text-gray-900 transition-colors relative group"
            >
              Docs
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-poap group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link 
              href="/gallery" 
              className="text-base font-semibold text-gray-600 hover:text-gray-900 transition-colors relative group"
            >
              Gallery
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-poap group-hover:w-full transition-all duration-300"></div>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <ConnectButton 
              chainStatus="icon"
              accountStatus={{
                smallScreen: 'avatar',
                largeScreen: 'full',
              }}
              showBalance={{
                smallScreen: false,
                largeScreen: true,
              }}
            />
          </div>
        </div>
      </header>
      
      <div className="container relative mx-auto px-6 py-16">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <motion.header 
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-center mb-8">
                <Badge className="mb-4 bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white/90">
                  ✨ GitHub Glyph
                </Badge>
              </div>
              
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="w-full text-4xl font-black text-center bg-transparent border-2 border-gray-200 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="Article title..."
                  />
                </div>
              ) : (
                <motion.h1 
                  className="mb-8 text-5xl font-black text-center text-gray-900 lg:text-6xl xl:text-7xl leading-tight"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {gistData.description}
                </motion.h1>
              )}
              
              <motion.div 
                className="flex flex-col lg:flex-row lg:items-center lg:justify-center mt-12 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Card className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border-gray-200/50">
                    <img
                      src={gistData.authorAvatarUrl}
                      alt={gistData.authorLogin}
                      className="h-12 w-12 rounded-full ring-2 ring-gray-100"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Created by</p>
                      <p className="text-lg font-bold text-gray-900">{gistData.authorLogin}</p>
                    </div>
                  </Card>
                  
                  <Badge className="bg-gradient-purple text-white px-4 py-2 text-sm font-semibold">
                    {formatDate(gistData.createdAt)}
                  </Badge>
                  
                  <Badge className="bg-gradient-pink text-white px-4 py-2 text-sm font-mono font-semibold">
                    {gistData.filename}
                  </Badge>
                </div>
              </motion.div>

              <motion.div 
                className="flex justify-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {isEditing ? (
                  <div className="flex space-x-4">
                    <Button
                      onClick={handleSaveEdit}
                      className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <span className="flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Save Changes</span>
                      </span>
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      variant="outline"
                      className="border-2 border-gray-300 bg-white/80 backdrop-blur-sm px-8 py-3 text-lg font-semibold rounded-2xl hover:bg-white transition-all"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={handleStartEditing}
                    className="bg-gradient-poap hover:opacity-90 text-white px-8 py-3 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <span className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      <span>Edit Glyph ✨</span>
                    </span>
                  </Button>
                )}
              </motion.div>
            </div>
          </div>
          </motion.header>

          {/* Content */}
          <motion.article 
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {isEditing ? (
            <div className="space-y-8">
              <Card className="rounded-3xl border-2 border-gray-200/50 bg-white/80 backdrop-blur-sm shadow-xl overflow-hidden">
                <div className="flex items-center justify-between bg-gradient-poap px-8 py-6">
                  <span className="text-xl font-bold text-white">Content Editor</span>
                  <Badge className="bg-white/20 text-white hover:bg-white/30">
                    {isMarkdownFile(gistData.filename) ? 'Markdown' : getLanguageFromFilename(gistData.filename)}
                  </Badge>
                </div>
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full h-96 bg-white/90 border-0 p-8 text-gray-900 font-mono text-base focus:outline-none focus:ring-0 resize-none placeholder-gray-500"
                  placeholder="Start writing your amazing content..."
                />
              </Card>
              
              {/* Live Preview */}
              <Card className="rounded-3xl border-2 border-gray-200/50 bg-white/80 backdrop-blur-sm shadow-xl overflow-hidden">
                <div className="bg-gradient-pink px-8 py-6">
                  <span className="text-xl font-bold text-white">Live Preview</span>
                </div>
                <div className="p-8 max-h-96 overflow-y-auto">
                  {isMarkdownFile(gistData.filename) ? (
                    <div className="prose prose-lg max-w-none">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code: ({ node, inline, className, children, ...props }: any) => {
                            const match = /language-(\w+)/.exec(className || '')
                            const language = match ? match[1] : 'text'
                            
                            return !inline ? (
                              <SyntaxHighlighter
                                style={oneDark}
                                language={language}
                                PreTag="div"
                                customStyle={{
                                  margin: 0,
                                  borderRadius: '1rem',
                                  background: '#F8FAFC',
                                  border: '1px solid #E2E8F0',
                                }}
                                {...props}
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            ) : (
                              <code className={className} {...props}>
                                {children}
                              </code>
                            )
                          },
                        }}
                      >
                        {editedContent}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={getLanguageFromFilename(gistData.filename)}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        borderRadius: '1rem',
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                      }}
                    >
                      {editedContent}
                    </SyntaxHighlighter>
                  )}
                </div>
              </Card>
            </div>
          ) : (
            <Card className="rounded-3xl border-2 border-gray-200/50 bg-white/80 backdrop-blur-sm shadow-xl overflow-hidden">
              <div className="bg-gradient-blue px-8 py-6">
                <h2 className="text-2xl font-bold text-white">Your Beautiful Glyph ✨</h2>
              </div>
              <div className="p-8">
                <div className="prose prose-lg max-w-none">
                  {isMarkdownFile(gistData.filename) ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code: ({ node, inline, className, children, ...props }: any) => {
                          const match = /language-(\w+)/.exec(className || '')
                          const language = match ? match[1] : 'text'
                      
                      return !inline ? (
                        <SyntaxHighlighter
                          style={oneDark}
                          language={language}
                          PreTag="div"
                          customStyle={{
                            margin: 0,
                            borderRadius: '1rem',
                            background: '#F8FAFC',
                            border: '1px solid #E2E8F0',
                          }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    },
                  }}
                >
                  {gistData.content}
                </ReactMarkdown>
                  ) : (
                    <div className="rounded-2xl overflow-hidden border border-gray-200/50 shadow-lg">
                      <div className="flex items-center justify-between bg-gradient-poap px-6 py-4">
                        <span className="font-mono font-bold text-white">{gistData.filename}</span>
                        <Badge className="bg-white/20 text-white hover:bg-white/30 font-mono">
                          {getLanguageFromFilename(gistData.filename).toUpperCase()}
                        </Badge>
                      </div>
                  <SyntaxHighlighter
                    style={oneDark}
                    language={getLanguageFromFilename(gistData.filename)}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderTop: 'none',
                    }}
                  >
                      {gistData.content}
                    </SyntaxHighlighter>
                  </div>
                  )}
                </div>
              </div>
            </Card>
          )}
        </motion.article>

        {/* Web3 Actions Panel - Only show when not editing */}
        {!isEditing && <Web3ActionsPanel gistData={gistData} gistId={gistId} />}
        </div>
      </div>
    </div>
  )
}