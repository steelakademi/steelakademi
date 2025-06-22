'use client'

import { useState, useEffect } from 'react'

interface Video {
  id: string
  title: string
  description?: string
  url: string
  thumbnail?: string
  duration?: number
  category?: string
  viewCount: number
  createdAt: string
  updatedAt: string
}

interface UseVideosOptions {
  category?: string
  search?: string
}

export function useVideos(options: UseVideosOptions = {}) {
  const [videos, setVideos] = useState<Video[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchVideos = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const params = new URLSearchParams()
      if (options.category) params.append('category', options.category)
      if (options.search) params.append('search', options.search)

      const response = await fetch(`/api/videos?${params.toString()}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Videolar yüklenirken hata oluştu')
      }

      setVideos(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bilinmeyen hata')
    } finally {
      setIsLoading(false)
    }
  }

  const watchVideo = async (videoId: string, progress: number) => {
    try {
      const response = await fetch(`/api/videos/${videoId}/watch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ progress })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Video izleme kaydedilirken hata oluştu')
      }

      return data
    } catch (err) {
      throw err instanceof Error ? err : new Error('Bilinmeyen hata')
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [options.category, options.search])

  return {
    videos,
    isLoading,
    error,
    refetch: fetchVideos,
    watchVideo
  }
} 