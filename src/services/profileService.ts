import { Profile, getProfileById } from '../data/profiles'
import { delay } from './mockService'
import { ProfileData } from '../types'

export const getProfile = async (id: string): Promise<Profile | null> => {
  await delay()
  return getProfileById(id) || null
}

export const updateProfile = async (id: string, data: Partial<ProfileData>): Promise<Profile> => {
  await delay(500, 1000)
  
  const existing = getProfileById(id)
  if (!existing) throw new Error('Profile not found')
  
  const updated = { ...existing, ...data } as Profile
  return updated
}

export const deleteProfile = async (id: string): Promise<boolean> => {
  await delay(800, 1200)
  return true
}

export const hideProfile = async (id: string, hidden: boolean): Promise<void> => {
  await delay(300, 600)
}

export const exportProfileData = async (id: string): Promise<string> => {
  await delay(300, 500)
  const profile = getProfileById(id)
  if (!profile) throw new Error('Profile not found')
  return JSON.stringify(profile, null, 2)
}

export const calculateProfileCompleteness = (profile: Profile): number => {
  const score: Record<string, number> = {
    name: 10,
    gender: 0,
    age: 10,
    height: 5,
    maritalStatus: 5,
    motherTongue: 5,
    religion: 5,
    caste: 5,
    community: 5,
    location: 10,
    career: 15,
    lifestyle: 10,
    family: 15,
    partnerPreferences: 15,
    photos: 10
  }
  
  let total = 0
  let completed = 0
  
  total += score.name; completed += profile.name ? score.name : 0
  total += score.gender; completed += profile.gender ? score.gender : 0
  total += score.age; completed += profile.age ? score.age : 0
  total += score.height; completed += profile.height ? score.height : 0
  total += score.maritalStatus; completed += profile.maritalStatus ? score.maritalStatus : 0
  total += score.motherTongue; completed += profile.motherTongue ? score.motherTongue : 0
  total += score.religion; completed += profile.religion ? score.religion : 0
  total += score.caste; completed += profile.caste ? score.caste : 0
  total += score.community; completed += profile.community ? score.community : 0
  total += score.location; completed += profile.location.currentCity ? score.location : 0
  total += score.career; completed += profile.career.occupation ? score.career : 0
  total += score.lifestyle; completed += profile.lifestyle.diet ? score.lifestyle : 0
  total += score.family; completed += profile.family.fatherOccupation ? score.family : 0
  total += score.partnerPreferences; completed += Object.keys(profile.partnerPreferences).length > 0 ? score.partnerPreferences : 0
  total += score.photos; completed += profile.photos?.length > 0 ? score.photos : 0
  
  return Math.min(100, Math.round((completed / total) * 100))
}

interface ProfileUpdate {
  name?: string
  gender?: 'male' | 'female' | 'other'
  age?: number
  height?: number
  weight?: number
  motherTongue?: string
  religion?: string
  caste?: string
  subCaste?: string
  community?: string
  location?: Profile['location']
  career?: Profile['career']
  lifestyle?: Profile['lifestyle']
  family?: Profile['family']
}

export type { ProfileData, ProfileUpdate }