export interface Profile {
  id: string
  name: string
  gender: 'male' | 'female' | 'other'
  age: number
  height: number
  weight: number
  maritalStatus: 'never' | 'divorced' | 'widowed'
  motherTongue: string
  religion: string
  caste: string
  subCaste: string
  community: string
  location: {
    currentCity: string
    hometown: string
    country: string
    state: string
    citizenship: string
  }
  career: {
    education: string
    college: string
    occupation: string
    company: string
    income: string
    workLocation: string
  }
  lifestyle: {
    diet: 'veg' | 'non-veg' | 'jain' | 'other'
    smoking: 'never' | 'occasional' | 'regular'
    drinking: 'never' | 'occasional' | 'regular'
  }
  disability?: {
    type: string
    level: 'mild' | 'moderate' | 'severe'
  }
  family: {
    fatherOccupation: string
    motherOccupation: string
    siblings: Array<{ name: string; age: number; maritalStatus: string }>
    familyIncome: string
    familyType: 'nuclear' | 'joint'
    familyValues: 'traditional' | 'modern' | 'liberal'
    familyLocation: string
    nativePlace: string
    familyBackground: string
    familyExpectations: string
  }
  partnerPreferences: {
    ageRange: [number, number]
    heightRange: [number, number]
    religion: string
    caste: string
    motherTongue: string
    education: string
    occupation: string
    income: string
    location: string
    country: string
    maritalStatus: string
    diet: string
    smoking: string
    drinking: string
    children: 'yes' | 'no' | 'any'
    familyType: string
    familyValues: string
    disabilityAcceptable: boolean
    manglik: boolean
  }
  photos: Array<{
    url: string
    isPrimary: boolean
    visibility: 'everyone' | 'matches' | 'hidden'
    isVerified: boolean
  }>
  horoscope: {
    dateOfBirth: string
    timeOfBirth: string
    placeOfBirth: string
    rasi: string
    nakshatra: string
    lagnam: string
    gothram: string
    dosham: string
    manglik: boolean
    kundliUrl?: string
  }
  verification: {
    mobile: boolean
    email: boolean
    photo: 'not_started' | 'pending' | 'verified' | 'rejected'
    govId: 'not_started' | 'pending' | 'verified' | 'rejected'
    aadhaar: 'not_started' | 'pending' | 'verified' | 'rejected'
    pan: 'not_started' | 'pending' | 'verified' | 'rejected'
    video: 'not_started' | 'pending' | 'verified' | 'rejected'
    education: 'not_started' | 'pending' | 'verified' | 'rejected'
    employment: 'not_started' | 'pending' | 'verified' | 'rejected'
    trustScore: number
  }
  online: boolean
  lastActive: string
  interests: {
    received: string[]
    sent: string[]
    accepted: string[]
    declined: string[]
  }
  shortlisted: string[]
  chatContacts: string[]
  createdAt: string
  profileCreatedBy: 'self' | 'parent' | 'sibling' | 'friend' | 'relative'
  matchPercentage?: number
  compatibilityDetails?: {
    preferences: number
    lifestyle: number
    familyValues: number
    horoscope: number
    activity: number
  }
}

import { generateProfiles } from './generateProfiles'
export const profiles = generateProfiles()

export const getProfileById = (id: string): Profile | undefined => {
  return profiles.find(p => p.id === id)
}

export const getProfilesByFilter = (filters: Partial<Profile>): Profile[] => {
  return profiles.filter(profile => {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === 'age') {
          if (Array.isArray(value)) {
            if (profile.age < value[0] || profile.age > value[1]) return false
          } else {
            if (profile.age !== value) return false
          }
        } else if (key === 'income') {
          const profileIncomeNum = parseInt(profile.career.income.replace(/[^\d]/g, '')) || 0
          const filterIncomeNum = parseInt(String(value).replace(/[^\d]/g, '')) || 0
          if (profileIncomeNum < filterIncomeNum) return false
        } else {
          const profileVal = (profile as any)[key]
          if (profileVal !== value) return false
        }
      }
    })
    return true
  })
}

import { calcMatchScore } from '../services/matchingService'

export const getRecommendedProfiles = (profileId: string): Profile[] => {
  const user = getProfileById(profileId)
  if (!user) return []
  
  return profiles
    .filter(p => p.id !== profileId && calcMatchScore(user, p) > 50)
    .sort((a, b) => (calcMatchScore(user, a) || 0) - (calcMatchScore(user, b) || 0))
    .slice(0, 20)
}

export const getDailyMatches = (profileId: string): Profile[] => {
  const allProfiles = [...profiles]
  const today = new Date()
  const seed = today.getDate()
  
  // Simple shuffle with fixed seed
  for (let i = allProfiles.length - 1; i > 0; i--) {
    const j = (seed + i * 7) % allProfiles.length
    const temp = allProfiles[i]
    allProfiles[i] = allProfiles[j]
    allProfiles[j] = temp
  }
  
  return allProfiles
    .filter(p => p.id !== profileId && p.verification.trustScore >= 70)
    .slice(0, 10)
}