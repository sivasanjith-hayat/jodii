import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DemoAccount, demoAccounts } from '../services/authService'
import { Profile, profiles } from '../data/profiles'

export interface User {
  id: string
  email: string
  role: 'user' | 'parent' | 'matchmaker' | 'moderator' | 'admin'
  displayName: string
  profileId?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  loginWithDemo: (email: string) => Promise<void>
  initializeDemo: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: async (email: string, password: string) => {
        const account = demoAccounts.find(a => a.email === email)
        
        if (account) {
          const token = btoa(`${email}:${Date.now()}`)
          localStorage.setItem('jodi_token', token)
          localStorage.setItem('jodi_email', email)
          localStorage.setItem('jodi_role', account.role)
          localStorage.setItem('jodi_user_id', account.profileId || `user-${email}`)
          
          set({
            user: {
              id: account.role === 'admin' ? 'admin-user' : `user-${email}`,
              email: email,
              role: account.role,
              displayName: account.displayName,
              profileId: account.profileId
            },
            isAuthenticated: true,
            isLoading: false
          })
        } else {
          set({ isLoading: false })
          throw new Error('Invalid credentials')
        }
      },
      
      logout: async () => {
        localStorage.removeItem('jodi_token')
        localStorage.removeItem('jodi_email')
        localStorage.removeItem('jodi_role')
        localStorage.removeItem('jodi_user_id')
        set({ user: null, isAuthenticated: false })
      },
      
      loginWithDemo: async (email: string) => {
        const account = demoAccounts.find(a => a.email === email || a.displayName.toLowerCase().includes(email.toLowerCase()))
        if (account) {
          await login(account.email, 'demo123')
        }
      },
      
      initializeDemo: () => {
        const email = localStorage.getItem('jodi_email')
        const role = localStorage.getItem('jodi_role') as string
        const profileId = localStorage.getItem('jodi_user_id')
        
        if (email && role) {
          const account = demoAccounts.find(a => a.email === email)
          if (account) {
            set({
              user: {
                id: role === 'admin' ? 'admin-user' : `user-${email}`,
                email,
                role: role as any,
                displayName: account.displayName,
                profileId: profileId || account.profileId
              },
              isAuthenticated: true
            })
          }
        }
      }
    }),
    {
      name: 'jodi-auth-storage',
      getStorage: () => localStorage
    }
  )
)