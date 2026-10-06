import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Profile, profiles, getProfileById } from '../data/profiles'
import { useNotificationStore } from './notifications'

export type InterestStatus = 'sent' | 'received' | 'accepted' | 'declined' | 'withdrawn' | 'cancelled'

export interface Interest {
  id: string
  fromProfileId: string
  toProfileId: string
  message?: string
  status: InterestStatus
  timestamp: string
}

export interface InterestsState {
  interests: Interest[]
  sendInterest: (toProfileId: string, message?: string) => void
  acceptInterest: (interestId: string) => void
  declineInterest: (interestId: string) => void
  withdrawInterest: (interestId: string) => void
  getInterestsByProfile: (profileId: string, status: InterestStatus[]) => Interest[]
  getReceivedInterests: (profileId: string) => Interest[]
  getSentInterests: (profileId: string) => Interest[]
}

export const useInterestsStore = create<InterestsState>()(
  persist(
    (set, get) => ({
      interests: [],
      
      sendInterest: (toProfileId, message) => {
        const userId = localStorage.getItem('jodi_user_id') || 'user-1'
        
        const newInterest: Interest = {
          id: Math.random().toString(36).substring(2, 11),
          fromProfileId: userId,
          toProfileId,
          message,
          status: 'sent',
          timestamp: new Date().toISOString()
        }
        
        set((state) => ({
          interests: [...state.interests, newInterest]
        }))

        useNotificationStore.getState().addNotification({
          type: 'new_interest',
          title: 'New Interest Received',
          description: 'Someone is interested in you! View their profile.',
          data: { profileId: toProfileId }
        })

        setTimeout(() => {
          const randomProfiles = profiles.filter(p => p.id !== userId && p.id !== toProfileId)
          const randomProfile = randomProfiles[Math.floor(Math.random() * randomProfiles.length)]
          
          if (randomProfile && Math.random() > 0.5) {
            const randomInterestId = Math.random().toString(36).substring(2, 11)
            set((state) => ({
              interests: [
                ...state.interests,
                {
                  id: randomInterestId,
                  fromProfileId: randomProfile.id,
                  toProfileId: userId,
                  status: 'received',
                  timestamp: new Date().toISOString()
                }
              ]
            }))
          }
        }, 3000)
      },
      
      acceptInterest: (interestId) => {
        set((state) => ({
          interests: state.interests.map(i => 
            i.id === interestId ? { ...i, status: 'accepted' } : i
          )
        }))

        const interest = get().interests.find(i => i.id === interestId)
        if (interest) {
          useNotificationStore.getState().addNotification({
            type: 'interest_accepted',
            title: 'Interest Accepted!',
            description: 'Your interest has been accepted!',
            data: { interestId, profileId: interest.fromProfileId }
          })

          if (interest.fromProfileId === localStorage.getItem('jodi_user_id')) {
            setTimeout(() => {
              useNotificationStore.getState().addNotification({
                type: 'new_match',
                title: 'It\'s a Match!',
                description: 'You have a mutual match! Start chatting.',
                data: { profileId: interest.toProfileId }
              })
            }, 1000)
          }
        }
      },
      
      declineInterest: (interestId) => {
        set((state) => ({
          interests: state.interests.map(i => 
            i.id === interestId ? { ...i, status: 'declined' } : i
          )
        }))
      },
      
      withdrawInterest: (interestId) => {
        set((state) => ({
          interests: state.interests.map(i => 
            i.id === interestId ? { ...i, status: 'withdrawn' } : i
          )
        }))
      },
      
      getInterestsByProfile: (profileId, statuses) => {
        return get().interests.filter(i => 
          (i.fromProfileId === profileId || i.toProfileId === profileId) &&
          statuses.includes(i.status)
        )
      },
      
      getReceivedInterests: (profileId) => {
        return get().interests.filter(i => 
          i.toProfileId === profileId && i.status !== 'declined' && i.status !== 'withdrawn' && i.status !== 'cancelled'
        )
      },
      
      getSentInterests: (profileId) => {
        return get().interests.filter(i => 
          i.fromProfileId === profileId
        )
      }
    }),
    {
      name: 'jodi-interests-storage',
      getStorage: () => localStorage
    }
  )
)