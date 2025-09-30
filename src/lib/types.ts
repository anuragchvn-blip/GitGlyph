// Types for GitGlyph application

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