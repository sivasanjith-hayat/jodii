import { Profile } from '../data/profiles'
import { delay, getWithError } from './mockService'

export interface DemoAccount {
  email: string
  password: string
  role: 'user' | 'parent' | 'matchmaker' | 'moderator' | 'admin'
  profileId?: string
  displayName: string
}

export const demoAccounts: DemoAccount[] = [
  {
    email: 'priya@example.com',
    password: 'demo123',
    role: 'user',
    profileId: 'profile-1',
    displayName: 'Priya (Self)'
  },
  {
    email: 'parent@example.com',
    password: 'demo123',
    role: 'parent',
    profileId: 'profile-2',
    displayName: 'Parent managing son\'s profile'
  },
  {
    email: 'matchmaker@example.com',
    password: 'demo123',
    role: 'matchmaker',
    displayName: 'Human Matchkeeper'
  },
  {
    email: 'moderator@example.com',
    password: 'demo123',
    role: 'moderator',
    displayName: 'Community Moderator'
  },
  {
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    displayName: 'Admin User'
  }
]

export interface LoginResult {
  success: boolean
  token?: string
  error?: string
  redirectTo?: string
}

export const login = async (email: string, password: string): Promise<LoginResult> => {
  await delay()
  
  const account = demoAccounts.find(a => a.email === email && a.password === password)
  
  if (account) {
    const token = btoa(`${email}:${Date.now()}`)
    localStorage.setItem('jodi_token', token)
    localStorage.setItem('jodi_email', email)
    localStorage.setItem('jodi_role', account.role)
    
    return {
      success: true,
      token,
      redirectTo: account.role === 'admin' ? '/admin' : '/'
    }
  }
  
  return {
    success: false,
    error: 'Invalid email or password'
  }
}

export const loginWithDemo = async (email: string): Promise<LoginResult> => {
  const account = demoAccounts.find(a => a.email === email || a.displayName.includes(email))
  
  if (!account) {
    return { success: false, error: 'Demo account not found' }
  }
  
  return login(account.email, account.password)
}

export const logout = async (): Promise<void> => {
  await delay()
  localStorage.removeItem('jodi_token')
  localStorage.removeItem('jodi_email')
  localStorage.removeItem('jodi_role')
}

export const verifyOTP = async (otp: string): Promise<{ success: boolean; error?: string }> => {
  await delay(500, 1000)
  
  if (otp.length !== 6) {
    return { success: false, error: 'OTP must be 6 digits' }
  }
  
  return { success: true }
}

export const sendOTP = async (phoneOrEmail: string): Promise<{ success: boolean; error?: string }> => {
  await delay()
  
  const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!phoneNumberRegex.test(phoneOrEmail) && !emailRegex.test(phoneOrEmail)) {
    return { success: false, error: 'Invalid phone number or email format' }
  }
  
  return { success: true }
}

export const mockGoogleLogin = async (): Promise<LoginResult> => {
  await delay()
  const accounts = demoAccounts.filter(a => a.role !== 'admin')
  const randomAccount = accounts[Math.floor(Math.random() * accounts.length)]
  return login(randomAccount.email, randomAccount.password)
}

export const mockAppleLogin = async (): Promise<LoginResult> => {
  await delay()
  const accounts = demoAccounts.filter(a => a.role !== 'admin')
  const randomAccount = accounts[Math.floor(Math.random() * accounts.length)]
  return login(randomAccount.email, randomAccount.password)
}

export const register = async (data: {
  email: string
  phone: string
  name: string
  dob: string
}): Promise<LoginResult> => {
  await delay(800, 1500)
  
  if (Math.random() < 0.1) {
    return { success: false, error: 'Registration temporarily unavailable' }
  }
  
  const mockToken = btoa(`${data.email}:${Date.now()}`)
  localStorage.setItem('jodi_token', mockToken)
  localStorage.setItem('jodi_email', data.email)
  localStorage.setItem('jodi_role', 'user')
  
  return { success: true, token: mockToken }
}

export const getCurrentUser = async (): Promise<{ email: string; role: string } | null> => {
  await delay()
  
  const email = localStorage.getItem('jodi_email')
  const role = localStorage.getItem('jodi_role')
  
  if (email && role) {
    return { email, role }
  }
  
  return null
}

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('jodi_token')
  return !!token
}