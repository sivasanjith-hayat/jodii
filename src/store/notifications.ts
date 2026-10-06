import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Notification {
  id: string
  type: 'new_match' | 'new_interest' | 'interest_accepted' | 'new_message' | 'profile_viewed' | 
        'shortlisted' | 'photo_request' | 'contact_request' | 'match_recommendation' | 
        'verification_status' | 'safety_alert'
  title: string
  description: string
  timestamp: string
  read: boolean
  data?: Record<string, any>
}

export interface NotificationsState {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

export const useNotificationStore = create<NotificationsState>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: Math.random().toString(36).substring(2, 11),
          timestamp: new Date().toISOString(),
          read: false
        }
        
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1
        }))

        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(notification.title, {
            body: notification.description,
            icon: '/favicon.ico'
          })
        }
      },
      
      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map(n => 
            n.id === id ? { ...n, read: true } : n
          ),
          unreadCount: Math.max(0, state.unreadCount - 1)
        }))
      },
      
      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map(n => ({ ...n, read: true })),
          unreadCount: 0
        }))
      },
      
      removeNotification: (id) => {
        set((state) => {
          const notification = state.notifications.find(n => n.id === id)
          return {
            notifications: state.notifications.filter(n => n.id !== id),
            unreadCount: notification && !notification.read 
              ? Math.max(0, state.unreadCount - 1) 
              : state.unreadCount
          }
        })
      },
      
      clearAll: () => {
        set({ notifications: [], unreadCount: 0 })
      }
    }),
    {
      name: 'jodi-notifications-storage',
      getStorage: () => localStorage
    }
  )
)