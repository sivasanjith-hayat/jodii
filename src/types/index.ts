export interface ProfileData {
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
}

export interface Location {
  currentCity: string
  hometown: string
  country: string
  state: string
  citizenship: string
}

export interface Career {
  education: string
  college: string
  occupation: string
  company: string
  income: string
  workLocation: string
}

export interface Lifestyle {
  diet: 'veg' | 'non-veg' | 'jain' | 'other'
  smoking: 'never' | 'occasional' | 'regular'
  drinking: 'never' | 'occasional' | 'regular'
}

export interface Family {
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

export interface PartnerPreferences {
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

export interface Photo {
  url: string
  isPrimary: boolean
  visibility: 'everyone' | 'matches' | 'request' | 'hidden'
  isVerified: boolean
}

export interface Horoscope {
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

export interface Verification {
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

export interface MatchDetails {
  preferences: number
  lifestyle: number
  familyValues: number
  horoscope: number
  activity: number
}

export interface CompatibilityDetail {
  porutham: { name: string; passed: boolean; score: number }[]
  ashtakoota: { total: number; max: number; percentage: number }
}

export interface SuccessStory {
  id: string
  brideName: string
  groomName: string
  bridePhoto: string
  groomPhoto: string
  weddingDate: string
  community: string
  location: string
  story: string
  status: 'pending' | 'published' | 'rejected'
  createdAt: string
}

export interface Testimonial {
  id: string
  name: string
  couple: string
  photo: string
  rating: number
  testimonial: string
  createdAt: string
}

export interface Notification {
  id: string
  type: string
  title: string
  description: string
  timestamp: string
  read: boolean
}

export interface Interest {
  id: string
  fromProfileId: string
  toProfileId: string
  message?: string
  status: 'sent' | 'received' | 'accepted' | 'declined' | 'withdrawn' | 'cancelled'
  timestamp: string
}

export interface Message {
  id: string
  conversationId: string
  fromProfileId: string
  toProfileId: string
  content: string
  timestamp: string
  read: boolean
  type: 'text' | 'image' | 'video' | 'audio' | 'gif'
}

export interface SupportTicket {
  id: string
  userId: string
  userName: string
  subject: string
  description: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  createdAt: string
  updatedAt: string
  adminNotes?: string
}