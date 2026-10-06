import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface NotificationSettings {
  newMatch: boolean
  newInterest: boolean
  newMessage: boolean
  profileViewed: boolean
  shortlisted: boolean
  photoRequest: boolean
  contactRequest: boolean
  matchRecommendation: boolean
  verificationStatus: boolean
  safetyAlerts: boolean
  browserPush: boolean
}

export interface PrivacySettings {
  lastSeen: 'everyone' | 'matches' | 'none'
  onlineStatus: 'everyone' | 'matches' | 'none'
  readReceipts: boolean
  profileVisible: boolean
  showAge: boolean
  showHeight: boolean
  showLocation: boolean
}

export interface AppSettings {
  language: 'en' | 'ta'
  darkMode: boolean
  theme: 'light' | 'dark' | 'system'
  notifications: NotificationSettings
  privacy: PrivacySettings
  isFirstTime: boolean
  resetDemoData: () => void
}

export const defaultNotifications: NotificationSettings = {
  newMatch: true,
  newInterest: true,
  newMessage: true,
  profileViewed: true,
  shortlisted: true,
  photoRequest: true,
  contactRequest: true,
  matchRecommendation: true,
  verificationStatus: true,
  safetyAlerts: true,
  browserPush: false
}

export const defaultPrivacy: PrivacySettings = {
  lastSeen: 'matches',
  onlineStatus: 'everyone',
  readReceipts: true,
  profileVisible: true,
  showAge: true,
  showHeight: true,
  showLocation: true
}

export const useSettingsStore = create<AppSettings>()(
  persist(
    (set, get) => ({
      language: 'en',
      darkMode: false,
      theme: 'system',
      notifications: defaultNotifications,
      privacy: defaultPrivacy,
      isFirstTime: true,
      
      resetDemoData: () => {
        localStorage.removeItem('jodi-auth-storage')
        localStorage.removeItem('jodi-profile-storage')
        localStorage.removeItem('jodi-interests-storage')
        localStorage.removeItem('jodi-messaging-storage')
        localStorage.removeItem('jodi-notifications-storage')
        localStorage.removeItem('jodi-settings-storage')
        localStorage.removeItem('jodi-token')
        localStorage.removeItem('jodi-email')
        localStorage.removeItem('jodi-role')
        window.location.reload()
      }
    }),
    {
      name: 'jodi-settings-storage',
      getStorage: () => localStorage
    }
  )
)