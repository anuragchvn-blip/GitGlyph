"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import remarkGfm from "remark-gfm"
import { motion } from "framer-motion"
import Link from "next/link"
import { 
  Edit, 
  Save, 
  Eye, 
  EyeOff, 
  FileText, 
  User, 
  Calendar, 
  Code, 
  Wallet, 
  Coins, 
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react"

import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { Badge } from "./ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog"

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

interface ArticleEditorProps {
  gistData: GistData
  gistId: string
}

export default function ArticleEditor({ gistData, gistId }: ArticleEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isPreview, setIsPreview] = useState(false)
  const [editedContent, setEditedContent] = useState(gistData.content)
  const [editedTitle, setEditedTitle] = useState(gistData.description)
  const [isPublished, setIsPublished] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [showWalletDialog, setShowWalletDialog] = useState(false)
  const [showMintDialog, setShowMintDialog] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [publishedUrl, setPublishedUrl] = useState("")
  const [walletAddress, setWalletAddress] = useState("")

  useEffect(() => {
    // Check if wallet is already connected (mock for now)
    const savedWallet = localStorage.getItem('wallet-address')
    if (savedWallet) {
      setIsWalletConnected(true)
      setWalletAddress(savedWallet)
    }
  }, [])

  const handleEdit = () => {
    setIsEditing(true)
    setIsPreview(false)
  }

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to your backend
  }

  const handlePreview = () => {
    setIsPreview(!isPreview)
  }

  const handlePublish = async () => {
    if (!isWalletConnected) {
      setShowWalletDialog(true)
      return
    }

    setIsPublishing(true)
    try {
      // Simulate publishing to Arweave
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsPublished(true)
      setPublishedUrl(`https://arweave.net/${gistId}-article`)
    } catch (error) {
      console.error('Publishing failed:', error)
    } finally {
      setIsPublishing(false)
    }
  }

  const handleConnectWallet = async () => {
    try {
      // Mock wallet connection - in reality you'd use wagmi/rainbowkit
      const mockAddress = "0x742d35Cc6570C4F74B8B5Bf8D4F3F1234567890"
      setWalletAddress(mockAddress)
      setIsWalletConnected(true)
      localStorage.setItem('wallet-address', mockAddress)
      setShowWalletDialog(false)
    } catch (error) {
      console.error('Wallet connection failed:', error)
    }
  }

  const handleMintNFT = async () => {
    setIsMinting(true)
    try {
      // Simulate NFT minting
      await new Promise(resolve => setTimeout(resolve, 3000))
      // In reality, call your mint API here
    } catch (error) {
      console.error('Minting failed:', error)
    } finally {
      setIsMinting(false)
      setShowMintDialog(false)
    }
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
      'css': 'css'
    }
    return languageMap[extension || ''] || 'text'
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 via-pink-400 to-orange-400 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">G</span>
              </div>
              <span className="font-semibold text-xl">GitGlyph</span>
            </Link>
            
            <div className="flex items-center gap-4">
              {isWalletConnected ? (
                <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </div>
              ) : (
                <Button onClick={() => setShowWalletDialog(true)} variant="outline">
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Article Header */}
        <Card className="mb-8 bg-white/5 border-white/10">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="text-2xl font-bold bg-transparent border-b border-white/20 focus:border-cyan-400 outline-none w-full"
                    placeholder="Article title..."
                  />
                ) : (
                  <CardTitle className="text-2xl mb-4">{editedTitle}</CardTitle>
                )}
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <img
                      src={gistData.authorAvatarUrl}
                      alt={gistData.authorLogin}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{gistData.authorLogin}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(gistData.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    <span>{gistData.filename}</span>
                  </div>
                  <Badge variant="secondary">
                    {getLanguageFromFilename(gistData.filename)}
                  </Badge>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button onClick={handlePreview} variant="outline" size="sm">
                      {isPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleEdit} variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Content Editor */}
        <Card className="mb-8 bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {isEditing ? 'Article Editor' : 'Article Content'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Editor */}
                <div>
                  <h3 className="text-sm font-medium text-white/60 mb-2">Editor</h3>
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full h-96 bg-white/5 border border-white/10 rounded-lg p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                    placeholder="Start writing your article..."
                  />
                </div>
                
                {/* Live Preview */}
                {isPreview && (
                  <div>
                    <h3 className="text-sm font-medium text-white/60 mb-2">Live Preview</h3>
                    <div className="h-96 bg-white/5 border border-white/10 rounded-lg p-4 overflow-y-auto">
                      {isMarkdownFile(gistData.filename) ? (
                        <div className="prose prose-invert max-w-none">
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
                                      borderRadius: '0.5rem',
                                      background: 'transparent',
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
                            borderRadius: '0.5rem',
                            background: 'transparent',
                          }}
                        >
                          {editedContent}
                        </SyntaxHighlighter>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Display mode
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                {isMarkdownFile(gistData.filename) ? (
                  <div className="prose prose-invert max-w-none">
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
                                borderRadius: '0.5rem',
                                background: 'transparent',
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
                      borderRadius: '0.5rem',
                      background: 'transparent',
                    }}
                  >
                    {editedContent}
                  </SyntaxHighlighter>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Publishing Actions */}
        <Card className="bg-gradient-to-r from-cyan-400/10 via-pink-400/10 to-orange-400/10 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="w-5 h-5" />
              Publish & Mint
            </CardTitle>
            <CardDescription>
              {isPublished 
                ? "Your article is published! Now you can mint it as an NFT."
                : "Publish your article to Arweave for permanent storage, then mint it as an NFT."
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              {!isPublished ? (
                <Button 
                  onClick={handlePublish} 
                  disabled={isPublishing}
                  className="flex-1"
                >
                  {isPublishing ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <FileText className="w-4 h-4 mr-2" />
                  )}
                  {isPublishing ? 'Publishing...' : 'Publish Article'}
                </Button>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-green-400 flex-1">
                    <CheckCircle className="w-5 h-5" />
                    <span>Published on Arweave</span>
                  </div>
                  <Button onClick={() => setShowMintDialog(true)} className="flex-1">
                    <Coins className="w-4 h-4 mr-2" />
                    Mint as NFT
                  </Button>
                </>
              )}
            </div>
            
            {isPublished && publishedUrl && (
              <div className="mt-4 p-4 bg-white/5 rounded-lg">
                <p className="text-sm text-white/60 mb-2">Permanent URL:</p>
                <a 
                  href={publishedUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 text-sm break-all"
                >
                  {publishedUrl}
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Wallet Connect Dialog */}
      <Dialog open={showWalletDialog} onOpenChange={setShowWalletDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect Your Wallet</DialogTitle>
            <DialogDescription>
              You need to connect your wallet to publish articles and mint NFTs.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Button onClick={handleConnectWallet} className="w-full">
              <Wallet className="w-4 h-4 mr-2" />
              Connect MetaMask
            </Button>
            <Button variant="outline" className="w-full">
              <Wallet className="w-4 h-4 mr-2" />
              WalletConnect
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mint NFT Dialog */}
      <Dialog open={showMintDialog} onOpenChange={setShowMintDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mint Your Article as NFT</DialogTitle>
            <DialogDescription>
              Transform your published article into a permanent, tradeable NFT.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-lg">
              <h4 className="font-medium mb-2">NFT Details</h4>
              <div className="space-y-2 text-sm text-white/60">
                <div>Title: {editedTitle}</div>
                <div>Author: {gistData.authorLogin}</div>
                <div>File: {gistData.filename}</div>
                <div>Estimated Gas: ~$15-25</div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMintDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleMintNFT} disabled={isMinting}>
              {isMinting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Coins className="w-4 h-4 mr-2" />
              )}
              {isMinting ? 'Minting...' : 'Mint NFT'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}