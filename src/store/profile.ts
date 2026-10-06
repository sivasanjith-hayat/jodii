import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Profile, profiles, getProfilesByFilter, getRecommendedProfiles, getDailyMatches } from '../data/profiles'
import { calcMatchScore } from '../services/matchingService'
import { useNotificationStore } from './notifications'

export interface ProfileState {
  profiles: Profile[]
  userProfiles: Profile[]
  isLoading: boolean
  likedProfiles: string[]
  shortlistedProfiles: string[]
  viewHistory: string[]
  searchHistory: string[]
  loadProfiles: () => Promise<void>
  getProfile: (id: string) => Profile | undefined
  getRecommendedProfiles: (profileId: string) => Profile[]
  getDailyMatches: (profileId: string) => Profile[]
  addLike: (profileId: string) => void
  addToShortlist: (profileId: string) => void
  addToViewHistory: (profileId: string) => void
  addToSearchHistory: (query: string) => void
  clearSearchHistory: () => void
}

export const useProfilesStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profiles: [],
      userProfiles: [],
      isLoading: false,
      likedProfiles: [],
      shortlistedProfiles: [],
      viewHistory: [],
      searchHistory: [],

      loadProfiles: async () => {
        set({ isLoading: true })
        try {
          const allProfiles = profiles
          set({ profiles: allProfiles })
        } finally {
          set({ isLoading: false })
        }
      },

      getProfile: (id) => {
        return get().profiles.find(p => p.id === id)
      },

      getRecommendedProfiles: (profileId) => {
        return getRecommendedProfiles(profileId)
      },

      getDailyMatches: (profileId) => {
        return getDailyMatches(profileId)
      },

      addLike: (profileId) => {
        set((state) => ({
          likedProfiles: [...new Set([profileId, ...state.likedProfiles])]
        }))
      },

      addToShortlist: (profileId) => {
        set((state) => {
          const updated = state.shortlistedProfiles.includes(profileId)
            ? state.shortlistedProfiles
            : [profileId, ...state.shortlistedProfiles]
          
          useNotificationStore.getState().addNotification({
            type: 'shortlisted',
            title: 'Profile Shortlisted',
            description: 'You added a profile to your shortlist',
            data: { profileId }
          })
          
          return { shortlistedProfiles: updated }
        })
      },

      addToViewHistory: (profileId) => {
        set((state) => ({
          viewHistory: [profileId, ...state.viewHistory.filter(id => id !== profileId)].slice(0, 50)
        }))
      },

      addToSearchHistory: (query) => {
        if (query.trim()) {
          set((state) => ({
            searchHistory: [query, ...state.searchHistory.filter(q => q !== query)].slice(0, 20)
          }))
        }
      },

      clearSearchHistory: () => {
        set({ searchHistory: [] })
      }
    }),
    {
      name: 'jodi-profile-storage',
      getStorage: () => localStorage
    }
  )
)