import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '../../../store/auth'
import { Button } from '../../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/Card'
import { Input } from '../../../components/ui/Input'
import { Label } from '../../../components/ui/Label'
import { Loader2 } from 'lucide-react'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

type LoginFormData = z.infer<typeof loginSchema>

interface DemoAccount {
  email: string
  displayName: string
  role: string
}

const demoAccounts: DemoAccount[] = [
  { email: 'priya@example.com', displayName: 'Priya', role: 'user' },
  { email: 'parent@example.com', displayName: 'Parent', role: 'parent' },
  { email: 'matchmaker@example.com', displayName: 'Matchmaker', role: 'matchmaker' },
  { email: 'admin@example.com', displayName: 'Admin', role: 'admin' }
]

export default function LoginPage() {
  const { t, i18n } = useTranslation()
  const { login, isLoading } = useAuthStore()
  const [otpMode, setOtpMode] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpValue, setOtpValue] = useState('')
  const [otpInput, setOtpInput] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDemoLogin = async (account: DemoAccount) => {
    await login(account.email, 'demo123')
  }

  const handleSendOTP = () => {
    setOtpSent(true)
  }

  const handleVerifyOTP = () => {
    if (otpInput === '123456') {
      login({ email: 'otp@example.com', password: 'otp123' } as any)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory via-card to-ivory flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="font-heading text-4xl font-bold text-primary mb-2">Jodi</h1>
          <p className="text-muted-foreground">100% Free Matrimony Platform</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>{otpMode ? 'Enter OTP' : 'Login'}</CardTitle>
            <CardDescription>
              {otpMode 
                ? 'Enter the 6-digit code sent to your phone' 
                : 'Enter your credentials to continue'}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {otpMode ? (
              <div className="space-y-4">
                <div className="flex gap-2">
                  {[...Array(6)].map((_, i) => (
                    <Input
                      key={i}
                      type="text"
                      maxLength={1}
                      value={otpInput.split('')[i] || ''}
                      onChange={(e) => {
                        const newValue = otpInput.split('')
                        newValue[i] = e.target.value[0]
                        setOtpInput(newValue.join(''))
                      }}
                      className="w-10 h-10 text-center text-lg font-bold"
                      aria-label={`OTP digit ${i + 1}`}
                    />
                  ))}
                </div>
                <Button 
                  className="w-full" 
                  onClick={handleVerifyOTP}
                  disabled={otpInput.length !== 6 || isLoading}
                >
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Verify'}
                </Button>
                <Button 
                  variant="link" 
                  onClick={() => setOtpMode(false)}
                  className="w-full"
                >
                  Back to Login
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="priya@example.com"
                    {...register('email')}
                    error={errors.email?.message}
                  />
                </div>
                
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    {...register('password')}
                    error={errors.password?.message}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Continue
                </Button>
                
                <Button 
                  variant="link" 
                  onClick={() => setOtpMode(true)}
                  className="w-full text-sm"
                >
                  Login with OTP
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="mt-6">
          <p className="text-center text-sm text-muted-foreground mb-4">Or login with</p>
          <div className="grid gap-3">
            <Button variant="outline" onClick={() => {}}>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.28-1.5-.73-2.09l-1.63-1.97c-.23-.31-.54-.47-.91-.47H12v3.3l2.17 1.63c.1.1.15.18.15.3a2.25 2.25 0 0 1-.15.3l-2.17 1.63v4.6h4.09c.67 0 1.2-.54 1.2-1.2v-6.05c.02-.79-.15-1.54-.39-2.2l1.63-1.97c.33-.41.55-.9.55-1.4z" fill="#4285F4"/>
              </svg>
              Continue with Google
            </Button>
            <Button variant="outline" onClick={() => {}}>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10 5.52 0 10-4.48 10-10S17.52 2 12 2zm6.605 4.61a8.502 8.502 0 01-1.93 5.31 7.35 7.35 0 00-2.49-1.63l-.86-1.21a7.35 7.35 0 00-2.49 1.63 8.502 8.502 0 01-1.93-5.31 7.354 7.354 0 00-1.63-2.49l-1.21-.86a7.35 7.35 0 00-1.63-2.49 8.502 8.502 0 01-1.93-5.31 7.354 7.354 0 00-2.49-1.63l-1.21-.86 8.502 8.502-.86 1.21zM12 5.5c1.79 0 3.41.68 4.61 1.79-1.2.6-2.55 1-3.99 1-1.4 0-2.79-.4-3.99-1-1.2-.6-2.55-1-3.99-1-1.79 0-3.41.68-4.61 1.79L2 7.59v-.38c0-1.3.83-2.47 2-2.91l2.01-.55c.33-.09.67-.16 1-.16.23 0 .46.03.69.08l2.01.55 1.92-1.24c.23-.15.46-.3.7-.43l2.01-1.11c.17-.1.35-.18.53-.23l.86-.3c.17-.04.35-.08.53-.08.23 0 .46.03.69.08l.86.3c.17.04.35.08.53.23l.86.3c.17.05.35.1.53.23l2.01 1.11c.23.13.46.23.7.32l.86.3c.17.04.35.08.53.08.17 0 .35-.04.52-.08l.86-.3c.17-.05.35-.1.53-.23l.86-.3c.17-.07.35-.13.52-.18l.86-.3c.16-.05.33-.08.5-.08z"/>
              </svg>
              Continue with Apple
            </Button>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <p className="text-center text-sm font-medium mb-3">Demo Accounts</p>
          <div className="grid gap-2">
            {demoAccounts.map((account) => (
              <Button
                key={account.email}
                variant="outline"
                onClick={() => handleDemoLogin(account)}
                disabled={isLoading}
              >
                {account.displayName} ({account.role})
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Use email: <code>demo@example.com</code> / <code>demo123</code>
          </p>
        </div>
      </motion.div>
    </div>
  )
}