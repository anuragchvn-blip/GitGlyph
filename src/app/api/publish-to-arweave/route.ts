import { NextRequest, NextResponse } from 'next/server'
import Bundlr from '@bundlr-network/client'

export interface ArweaveUploadRequest {
  content: string
  description: string
  authorLogin: string
  filename: string
  language: string
}

export interface ArweaveUploadResponse {
  arweaveId: string
  url: string
}

export async function POST(request: NextRequest) {
  try {
    const { content, description, authorLogin, filename, language }: ArweaveUploadRequest = await request.json()

    if (!content || !description || !authorLogin || !filename) {
      return NextResponse.json(
        { error: 'Missing required fields: content, description, authorLogin, filename' },
        { status: 400 }
      )
    }

    // Check for required environment variable
    const bundlrPrivateKey = process.env.BUNDLR_PRIVATE_KEY
    if (!bundlrPrivateKey) {
      console.error('BUNDLR_PRIVATE_KEY environment variable not set')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Create metadata object for the NFT
    const metadata = {
      title: description,
      description: `GitHub Gist by ${authorLogin}: ${description}`,
      content: content,
      author: authorLogin,
      filename: filename,
      language: language,
      platform: 'GitGlyph',
      timestamp: new Date().toISOString(),
      type: 'gist-article'
    }

    // Initialize Bundlr client
    const bundlr = new Bundlr('https://node2.bundlr.network', 'matic', bundlrPrivateKey)

    // Convert metadata to JSON string
    const data = JSON.stringify(metadata, null, 2)

    // Add tags for better discoverability
    const tags = [
      { name: 'Content-Type', value: 'application/json' },
      { name: 'App-Name', value: 'GitGlyph' },
      { name: 'App-Version', value: '1.0.0' },
      { name: 'Type', value: 'gist-article' },
      { name: 'Author', value: authorLogin },
      { name: 'Language', value: language },
      { name: 'Filename', value: filename },
    ]

    // Upload to Arweave via Bundlr
    const transaction = bundlr.createTransaction(data, { tags })
    await transaction.sign()
    
    const response = await transaction.upload()

    const arweaveId = transaction.id
    const arweaveUrl = `https://arweave.net/${arweaveId}`

    console.log(`Successfully uploaded to Arweave: ${arweaveUrl}`)

    return NextResponse.json({
      arweaveId,
      url: arweaveUrl,
    } as ArweaveUploadResponse)

  } catch (error) {
    console.error('Error uploading to Arweave:', error)
    
    // Handle specific Bundlr errors
    if (error instanceof Error) {
      if (error.message.includes('insufficient funds')) {
        return NextResponse.json(
          { error: 'Insufficient funds for upload' },
          { status: 402 }
        )
      }
      if (error.message.includes('network')) {
        return NextResponse.json(
          { error: 'Network error during upload' },
          { status: 503 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Failed to upload to Arweave' },
      { status: 500 }
    )
  }
}