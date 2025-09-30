'use client'

import { useState } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, getOpenSeaUrl } from '../lib/contracts'

interface GistData {
  description: string
  authorLogin: string
  authorAvatarUrl: string
  content: string
  filename: string
  language: string
  createdAt: string
  updatedAt: string
}

interface ArweaveUploadResponse {
  arweaveId: string
  url: string
}

interface Web3ActionsPanelProps {
  gistData: GistData
  gistId: string
}

type WorkflowState = 
  | 'initial'
  | 'publishing'
  | 'published'
  | 'minting'
  | 'minted'
  | 'error'

interface WorkflowData {
  arweaveId?: string
  arweaveUrl?: string
  transactionHash?: string
  tokenId?: string
  error?: string
}

export function Web3ActionsPanel({ gistData, gistId }: Web3ActionsPanelProps) {
  const { address, isConnected } = useAccount()
  const { writeContract, data: hash, isPending: isWritePending, error: writeError } = useWriteContract()
  
  const [workflowState, setWorkflowState] = useState<WorkflowState>('initial')
  const [workflowData, setWorkflowData] = useState<WorkflowData>({})
  
  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed,
    error: txError 
  } = useWaitForTransactionReceipt({
    hash,
  })

  // Check if user owns this gist (simplified check by GitHub username)
  // In a real app, you'd verify GitHub account ownership via OAuth
  const isGistOwner = address && isConnected // Simplified for demo

  const handlePublishToArweave = async () => {
    if (!gistData) return

    setWorkflowState('publishing')
    setWorkflowData({})

    try {
      const response = await fetch('/api/publish-to-arweave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: gistData.content,
          description: gistData.description,
          authorLogin: gistData.authorLogin,
          filename: gistData.filename,
          language: gistData.language,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to publish to Arweave')
      }

      const result: ArweaveUploadResponse = await response.json()
      
      setWorkflowData({
        arweaveId: result.arweaveId,
        arweaveUrl: result.url,
      })
      setWorkflowState('published')
    } catch (error) {
      console.error('Publishing error:', error)
      setWorkflowData({
        error: error instanceof Error ? error.message : 'Failed to publish to Arweave',
      })
      setWorkflowState('error')
    }
  }

  const handleMintNFT = async () => {
    if (!address || !workflowData.arweaveUrl) return

    setWorkflowState('minting')

    try {
      // Call the mint function on the contract
      writeContract({
        address: NFT_CONTRACT_ADDRESS as `0x${string}`,
        abi: NFT_CONTRACT_ABI,
        functionName: 'mintTo',
        args: [address, workflowData.arweaveUrl],
      })
    } catch (error) {
      console.error('Minting error:', error)
      setWorkflowData(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to mint NFT',
      }))
      setWorkflowState('error')
    }
  }

  // Handle transaction confirmation
  if (isConfirmed && workflowState === 'minting') {
    setWorkflowState('minted')
    setWorkflowData(prev => ({
      ...prev,
      transactionHash: hash,
      // In a real implementation, you'd get the tokenId from the transaction logs
      tokenId: 'latest', // Simplified for demo
    }))
  }

  if (writeError || txError) {
    setWorkflowState('error')
    setWorkflowData(prev => ({
      ...prev,
      error: writeError?.message || txError?.message || 'Transaction failed',
    }))
  }

  const getStateMessage = () => {
    switch (workflowState) {
      case 'publishing':
        return 'Anchoring to the permaweb...'
      case 'minting':
        return 'Minting your NFT on Polygon...'
      case 'published':
        return 'Successfully published to Arweave!'
      case 'minted':
        return 'NFT minted successfully!'
      case 'error':
        return `Error: ${workflowData.error}`
      default:
        return ''
    }
  }

  const getActionButtons = () => {
    if (!isConnected) {
      return (
        <div className="text-center">
          <p className="text-muted mb-4">Connect your wallet to publish and mint this gist as an NFT</p>
        </div>
      )
    }

    if (!isGistOwner) {
      return (
        <div className="text-center">
          <p className="text-muted">Only the gist owner can mint it as an NFT</p>
        </div>
      )
    }

    switch (workflowState) {
      case 'initial':
        return (
          <button
            onClick={handlePublishToArweave}
            className="group w-full relative overflow-hidden rounded-2xl bg-gradient-poap px-8 py-6 text-xl font-black text-white shadow-2xl transition-all hover:scale-105 hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-primary/20"
          >
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span>Publish to Arweave ✨</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
          </button>
        )

      case 'publishing':
        return (
          <button disabled className="w-full rounded-2xl bg-gradient-poap/50 px-8 py-6 text-xl font-black text-white cursor-not-allowed">
            <div className="flex items-center justify-center space-x-3">
              <div className="h-6 w-6 animate-spin rounded-full border-3 border-white border-t-transparent" />
              <span>Publishing to Arweave...</span>
            </div>
          </button>
        )

      case 'published':
        return (
          <div className="space-y-4">
            <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4">
              <p className="text-green-400 text-sm font-medium mb-2">✅ Published to Arweave</p>
              <a
                href={workflowData.arweaveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline text-sm break-all"
              >
                {workflowData.arweaveUrl}
              </a>
            </div>
            <button
              onClick={handleMintNFT}
              className="group w-full relative overflow-hidden rounded-2xl bg-gradient-pink px-8 py-6 text-xl font-black text-white shadow-2xl transition-all hover:scale-105 hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-primary/20"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Mint as NFT 🚀</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
            </button>
          </div>
        )

      case 'minting':
        return (
          <button disabled className="w-full rounded-2xl bg-gradient-pink/50 px-8 py-6 text-xl font-black text-white cursor-not-allowed">
            <div className="flex items-center justify-center space-x-3">
              <div className="h-6 w-6 animate-spin rounded-full border-3 border-white border-t-transparent" />
              <span>{isConfirming ? 'Confirming on Blockchain...' : 'Minting NFT...'}</span>
            </div>
          </button>
        )

      case 'minted':
        return (
          <div className="space-y-4">
            <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4">
              <p className="text-green-400 text-sm font-medium mb-2">🎉 NFT Minted Successfully!</p>
              <div className="space-y-2">
                <a
                  href={`https://polygonscan.com/tx/${workflowData.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-accent hover:underline text-sm"
                >
                  View Transaction →
                </a>
                <a
                  href={getOpenSeaUrl(workflowData.tokenId || '1')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-accent hover:underline text-sm"
                >
                  View on OpenSea →
                </a>
              </div>
            </div>
          </div>
        )

      case 'error':
        return (
          <div className="space-y-4">
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4">
              <p className="text-red-400 text-sm">{workflowData.error}</p>
            </div>
            <button
              onClick={() => {
                setWorkflowState('initial')
                setWorkflowData({})
              }}
              className="w-full rounded-2xl border-2 border-primary bg-background px-8 py-6 text-xl font-black text-primary transition-colors hover:bg-primary hover:text-white hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/20"
            >
              Try Again 🔄
            </button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="mt-20">
      <div className="rounded-3xl border-2 border-gray-100 bg-white p-12 shadow-2xl">
        <div className="text-center mb-8">
          <h3 className="mb-4 text-4xl font-black text-foreground">
            MAKE IT{' '}
            <span className="bg-gradient-poap bg-clip-text text-transparent">PERMANENT</span>
          </h3>
          <p className="text-lg text-muted-foreground">
            Transform your code into an immortal digital collectible
          </p>
        </div>
        
        {/* Status Message */}
        {getStateMessage() && (
          <div className="mb-8 rounded-2xl bg-gradient-poap/10 border-2 border-primary/20 p-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="h-4 w-4 rounded-full bg-gradient-poap animate-pulse"></div>
              <p className="text-primary text-lg font-bold">{getStateMessage()}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mb-12">
          {getActionButtons()}
        </div>

        {/* Info Cards - POAP Style */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 border border-purple-100">
            <div className="flex items-start space-x-4">
              <div className="h-12 w-12 rounded-2xl bg-gradient-poap flex items-center justify-center flex-shrink-0">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-foreground mb-2">Arweave Publishing</h4>
                <p className="text-muted-foreground">
                  Your code will be permanently stored on Arweave's decentralized network, 
                  making it censorship-resistant and accessible forever.
                </p>
              </div>
            </div>
          </div>
          
          <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-6 border border-blue-100">
            <div className="flex items-start space-x-4">
              <div className="h-12 w-12 rounded-2xl bg-gradient-blue flex items-center justify-center flex-shrink-0">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-bold text-foreground mb-2">NFT Minting</h4>
                <p className="text-muted-foreground">
                  Create a unique NFT on Polygon blockchain that represents your code, 
                  building a verifiable portfolio of your development work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}