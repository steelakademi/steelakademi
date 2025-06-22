'use client'

import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'

interface Notification {
  id: string
  type: string
  title: string
  message: string
  isRead: boolean
  createdAt: string
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated } = useAuth()

  const fetchNotifications = async () => {
    if (!isAuthenticated) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/notifications')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Bildirimler yüklenirken hata oluştu')
      }

      setNotifications(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bilinmeyen hata')
    } finally {
      setIsLoading(false)
    }
  }

  const markAsRead = async (notificationId: string) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'PATCH'
      })

      if (!response.ok) {
        throw new Error('Bildirim okundu olarak işaretlenemedi')
      }

      // Bildirimleri güncelle
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, isRead: true }
            : notification
        )
      )
    } catch (err) {
      console.error('Mark as read error:', err)
    }
  }

  const markAllAsRead = async () => {
    try {
      const response = await fetch('/api/notifications/read-all', {
        method: 'PATCH'
      })

      if (!response.ok) {
        throw new Error('Bildirimler okundu olarak işaretlenemedi')
      }

      // Tüm bildirimleri okundu olarak işaretle
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, isRead: true }))
      )
    } catch (err) {
      console.error('Mark all as read error:', err)
    }
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  useEffect(() => {
    fetchNotifications()
  }, [isAuthenticated])

  return {
    notifications,
    isLoading,
    error,
    unreadCount,
    refetch: fetchNotifications,
    markAsRead,
    markAllAsRead
  }
} 