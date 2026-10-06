import { Profile, getProfileById, profiles } from '../data/profiles'
import { delay } from './mockService'

const calculateAgeCompatibility = (userAge: number, targetAge: number): number => {
  const diff = Math.abs(userAge - targetAge)
  if (diff <= 3) return 100
  if (diff <= 5) return 85
  if (diff <= 8) return 70
  if (diff <= 12) return 50
  return 30
}

const calculateHeightCompatibility = (userHeight: number, targetHeight: number): number => {
  const [min, max] = [145, 185]
  const userPercentile = (userHeight - min) / (max - min)
  const targetPercentile = (targetHeight - min) / (max - min)
  const diff = Math.abs(userPercentile - targetPercentile)
  return Math.max(0, 100 - diff * 150)
}

const calculateIncomeCompatibility = (userIncome: string, targetIncome: string): number => {
  const tiers = ['Below 2 Lakhs', '2-5 Lakhs', '5-10 Lakhs', '10-20 Lakhs', '20-40 Lakhs', 'Above 40 Lakhs']
  const userTier = tiers.findIndex(t => userIncome.includes(t))
  const targetTier = tiers.findIndex(t => targetIncome.includes(t))
  
  if (userTier === -1 || targetTier === -1) return 100
  const diff = Math.abs(userTier - targetTier)
  return Math.max(0, 100 - diff * 25)
}

const calculateHoroScopeMatch = (profile: Profile, target: Profile): number => {
  const { rasi, nakshatra } = profile.horoscope
  const { rasi: targetRasi, nakshatra: targetNakshatra } = target.horoscope
  
  let score = 50
  
  if (rasi === targetRasi) score += 20
  else if (['Mesha', 'Simha', 'Kanya', 'Vrishabha'].includes(rasi as string) && ['Mesha', 'Simha', 'Kanya', 'Vrishabha'].includes(targetRasi as string)) score += 10
  
  if (nakshatra === targetNakshatra) score += 15
  else score += 5
  
  if (profile.horoscope.manglik && !target.horoscope.manglik) score -= 10
  
  return Math.max(0, Math.min(100, score))
}

export const calcMatchScore = (user: Profile, target: Profile): number => {
  const preferences = target.partnerPreferences
  
  let preferencesScore = 0
  let preferenceWeight = 0
  
  if (preferences.ageRange[0] && preferences.ageRange[1]) {
    preferencesScore += calculateAgeCompatibility(user.age, target.age)
    preferenceWeight += 20
  }
  
  if (preferences.heightRange[0] && preferences.heightRange[1]) {
    preferencesScore += calculateHeightCompatibility(user.height, target.height)
    preferenceWeight += 15
  }
  
  if (preferences.income !== 'Any') {
    preferencesScore += calculateIncomeCompatibility(user.career.income, target.career.income)
    preferenceWeight += 10
  }
  
  if (preferences.religion !== 'Any') {
    if (preferences.religion === target.religion) preferencesScore += 20
    preferenceWeight += 10
  }
  
  if (preferences.caste !== 'Any') {
    if (preferences.caste === target.caste) preferencesScore += 15
    preferenceWeight += 8
  }
  
  if (preferences.motherTongue !== 'Any') {
    if (preferences.motherTongue === target.motherTongue) preferencesScore += 10
    preferenceWeight += 5
  }
  
  if (preferences.diet !== 'Any') {
    if (preferences.diet.toLowerCase() === target.lifestyle.diet.toLowerCase()) preferencesScore += 10
    preferenceWeight += 5
  }
  
  if (preferences.familyValues !== 'Any') {
    if (preferences.familyValues.toLowerCase() === target.family.familyValues.toLowerCase()) preferencesScore += 15
    preferenceWeight += 8
  }
  
  if (preferences.disabilityAcceptable && user.disability) {
    preferencesScore += 20
    preferenceWeight += 5
  }
  
  const lifestyleScore = (
    (target.lifestyle.diet === 'veg' && user.lifestyle.diet !== 'non-veg' ? 25 : 
     target.lifestyle.diet === 'non-veg' ? 20 : 50) +
    (target.lifestyle.smoking === 'never' && user.lifestyle.smoking === 'never' ? 25 : 
     target.lifestyle.smoking === 'occasional' ? 15 : 10) +
    (target.lifestyle.drinking === 'never' && user.lifestyle.drinking === 'never' ? 25 : 
     target.lifestyle.drinking === 'occasional' ? 15 : 10)
  )
  
  const familyScore = (
    (target.family.familyValues === 'traditional' ? 30 : 20) +
    (Math.abs(parseInt(target.family.familyIncome.replace(/[^\d]/g, '') || '0') - parseInt(user.family.familyIncome.replace(/[^\d]/g, '') || '0')) < 500 ? 20 : 15)
  )
  
  const horoscopeScore = calculateHoroScopeMatch(user, target)
  
  const activityScore = target.online ? 20 : 10
  
  const totalScore = (
    (preferencesScore / Math.max(1, preferenceWeight)) * 40 +
    (lifestyleScore / 80) * 15 +
    (familyScore / 60) * 15 +
    horoscopeScore * 0.15 +
    activityScore * 0.10
  )
  
  return Math.round(totalScore)
}

export interface CompatibilityDetails {
  preferences: number
  lifestyle: number
  familyValues: number
  horoscope: number
  activity: number
}

export const getCompatibilityDetails = (user: Profile, target: Profile): CompatibilityDetails => {
  const prefsScore = calcMatchScore(user, target)
  
  return {
    preferences: Math.min(100, Math.round(prefsScore * 0.4)),
    lifestyle: Math.min(100, Math.round(prefsScore * 0.15)),
    familyValues: Math.min(100, Math.round(prefsScore * 0.15)),
    horoscope: Math.min(100, Math.round(prefsScore * 0.15)),
    activity: Math.min(100, Math.round(prefsScore * 0.10))
  }
}

export interface HoroscopeCompatibility {
  overall: number
  porutham: { name: string; passed: boolean; score: number }[]
  ashtakoota: { total: number; max: number; percentage: number }
}

export const getDailyMatches = async (profileId: string): Promise<Profile[]> => {
  await delay()
  
  const user = getProfileById(profileId)
  if (!user) return []
  
  const today = new Date().toISOString().split('T')[0]
  const dayNum = parseInt(today.split('-')[2])
  
  const shuffled = [...profiles]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = (dayNum + i * 7) % shuffled.length
    const temp = shuffled[i]
    shuffled[i] = shuffled[j]
    shuffled[j] = temp
  }
  
  return shuffled
    .filter(p => p.id !== profileId && p.verification.trustScore >= 70)
    .slice(0, 10)
}

export const getRecommendedProfiles = async (profileId: string): Promise<Profile[]> => {
  await delay()
  
  const user = getProfileById(profileId)
  if (!user) return []
  
  return profiles
    .filter(p => p.id !== profileId)
    .map(p => ({
      profile: p,
      score: calcMatchScore(user, p)
    }))
    .filter(item => item.score > 50)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map(item => item.profile)
}

export const findMutualMatches = async (profileIds: string[]): Promise<Profile[]> => {
  await delay()
  
  const mutualIds = new Set<string>()
  for (const id of profileIds) {
    const profile = getProfileById(id)
    if (profile) {
      profile.interests.accepted.forEach(acceptedId => {
        const acceptedProfile = getProfileById(acceptedId)
        if (acceptedProfile && acceptedProfile.interests.accepted.includes(id)) {
          mutualIds.add(id)
          mutualIds.add(acceptedId)
        }
      })
    }
  }
  
  const filtered = profileIds.filter(pid => mutualIds.has(pid))
  const result: Profile[] = []
  for (const pid of filtered) {
    const profile = getProfileById(pid)
    if (profile) {
      result.push(profile)
    }
  }
  return result
}

export const calcHoroscopeCompatibility = (
  user: Profile,
  target: Profile
): HoroscopeCompatibility => {
  const porutham = [
    { name: 'Dina', passed: Math.random() > 0.3, score: 0 },
    { name: 'Gana', passed: Math.random() > 0.2, score: 0 },
    { name: 'Mahendra', passed: Math.random() > 0.4, score: 0 },
    { name: 'Stree Deergha', passed: Math.random() > 0.3, score: 0 },
    { name: 'Yoni', passed: Math.random() > 0.25, score: 0 },
    { name: 'Rasi', passed: Math.random() > 0.4, score: 0 },
    { name: 'Rasiyathipathi', passed: Math.random() > 0.3, score: 0 },
    { name: 'Vasya', passed: Math.random() > 0.35, score: 0 },
    { name: 'Rajju', passed: Math.random() > 0.4, score: 0 },
    { name: 'Vedha', passed: Math.random() > 0.25, score: 0 }
  ]
  
  porutham.forEach((p: any) => { p.score = p.passed ? 10 : 0 })
  const poruthamScore = porutham.reduce((sum: number, p: any) => sum + (p.passed ? 1 : 0), 0)
  
  const ashtakootaTotal = Math.floor(Math.random() * 36) + 15
  const ashtakootaPercentage = Math.round((ashtakootaTotal / 36) * 100)
  
  const overall = Math.round((poruthamScore / 10) * 50 + ashtakootaPercentage * 0.5)
  
  return { 
    overall, 
    porutham, 
    ashtakoota: { 
      total: ashtakootaTotal, 
      max: 36, 
      percentage: ashtakootaPercentage 
    } 
  }
}