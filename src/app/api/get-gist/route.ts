import { NextRequest, NextResponse } from 'next/server'

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

export async function POST(request: NextRequest) {
  try {
    const { gistId } = await request.json()

    if (!gistId) {
      return NextResponse.json(
        { error: 'Gist ID is required' },
        { status: 400 }
      )
    }

    // Fetch from GitHub API
    const response = await fetch(`https://api.github.com/gists/${gistId}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GitGlyph-App',
      },
      next: {
        revalidate: 300, // Cache for 5 minutes
      }
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Gist not found' },
          { status: 404 }
        )
      }
      if (response.status === 403) {
        return NextResponse.json(
          { error: 'API rate limit exceeded' },
          { status: 429 }
        )
      }
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const gistData = await response.json()

    // Extract the first file's content (Gists can have multiple files)
    const files = Object.values(gistData.files) as any[]
    const firstFile = files[0]

    if (!firstFile) {
      return NextResponse.json(
        { error: 'No files found in gist' },
        { status: 400 }
      )
    }

    // Prepare clean response data
    const cleanData: GistData = {
      description: gistData.description || 'Untitled',
      authorLogin: gistData.owner.login,
      authorAvatarUrl: gistData.owner.avatar_url,
      content: firstFile.content,
      filename: firstFile.filename,
      language: firstFile.language || 'text',
      createdAt: gistData.created_at,
      updatedAt: gistData.updated_at,
    }

    // Set cache headers
    return NextResponse.json(cleanData, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })

  } catch (error) {
    console.error('Error fetching gist:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gist data' },
      { status: 500 }
    )
  }
}