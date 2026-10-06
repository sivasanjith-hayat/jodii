import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'
import { useProfilesStore } from '../../store/profile'
import { Profile, getProfileById, getRecommendedProfiles, getDailyMatches } from '../../data/profiles'
import { calcMatchScore, getCompatibilityDetails } from '../../services/matchingService'
import { useInterestsStore } from '../../store/interests'
import { useNotificationStore } from '../../store/notifications'
import { Badge } from '../../components/ui/Badge'
import { Chip } from '../../components/ui/Chip'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/Avatar'
import { Heart, MessageCircle, Share2, X, Check, Award, Users, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '../../lib/utils'
import confetti from 'canvas-confetti'

interface MatchCardProps {
  profile: Profile
  matchPercentage: number
  compatibilityDetails: ReturnType<typeof getCompatibilityDetails>
  isMyMatch: boolean
  onInterest: () => void
  onShortlist: () => void
  isSwiping?: boolean
}

export default function MatchingDetails() {
  const { user } = useAuthStore()
  const { t } = useTranslation()
  const userId = user?.profileId || 'profile-1'
  const [matches, setMatches] = useState<Profile[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const profile = getProfileById(userId)
    if (profile) {
      const recommended = getRecommendedProfiles(userId)
      setMatches(recommended)
    }
  }, [userId])

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (currentIndex >= matches.length) return
    
    const currentProfile = matches[currentIndex]
    
    if (direction === 'right') {
      const score = calcMatchScore(getProfileById(userId)!, currentProfile)
      
      useInterestsStore.getState().sendInterest(currentProfile.id)
      
      if (score > 70) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 2000)
      }
    }
    
    setCurrentIndex(prev => prev + 1)
  }

  const currentProfile = matches[currentIndex]

  if (!currentProfile) {
    return (
      <div className="p-4">
        <h1 className="font-heading text-2xl font-bold">No more matches!</h1>
        <p className="text-muted-foreground mt-2">Check back tomorrow for new matches</p>
      </div>
    )
  }

  const matchScore = calcMatchScore(getProfileById(userId)!, currentProfile)
  const compatibility = getCompatibilityDetails(getProfileById(userId)!, currentProfile)

  return (
    <div className="p-4 pb-20">
      {showConfetti && (
        <ConfettiTrigger />
      )}

      <motion.div
        key={currentProfile.id}
        initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        exit={{ opacity: 0, scale: 0.9, rotateY: -15 }}
        transition={{ duration: 0.4 }}
        className="mb-4"
      >
        <Card className="overflow-hidden shadow-2xl">
          <div className="relative">
            <img
              src={currentProfile.photos[0]?.url || '/placeholder-avatar.png'}
              alt={currentProfile.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-4 right-4">
              <MatchScoreRing score={matchScore} />
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-heading text-2xl font-bold">{currentProfile.name}</h3>
                <p className="text-muted-foreground">
                  {currentProfile.age} yrs • {currentProfile.height} cm • {currentProfile.motherTongue}
                </p>
                <p className="text-muted-foreground">
                  {currentProfile.career.occupation} • {currentProfile.career.company}
                </p>
              </div>
              
              <TrustBadge score={currentProfile.verification.trustScore} />
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge text={`${currentProfile.religion}`} />
              <Badge text={currentProfile.community} />
              <Badge text={currentProfile.location.country} />
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Match Breakdown</h4>
              <div className="space-y-2">
                <MatchBreakdownItem label="Preferences" score={compatibility.preferences} />
                <MatchBreakdownItem label="Lifestyle" score={compatibility.lifestyle} />
                <MatchBreakdownItem label="Family Values" score={compatibility.familyValues} />
                <MatchBreakdownItem label="Horoscope" score={compatibility.horoscope} />
                <MatchBreakdownItem label="Activity" score={compatibility.activity} />
              </div>
            </div>

            <Button className="w-full mb-3" size="lg">
              <Heart className="h-5 w-5 mr-2" />
              Send Interest
            </Button>
            
            <div className="grid gap-2">
              <Button variant="outline" className="w-full">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button variant="outline" className="w-full">
                <Share2 className="h-4 w-4 mr-2" />
                Share Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex gap-3">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => handleSwipe('left')}
        >
          <X className="h-5 w-5 mr-2" />
          Pass
        </Button>
        <Button 
          className="flex-1 bg-pink-500 hover:bg-pink-600"
          onClick={() => handleSwipe('right')}
        >
          <Heart className="h-5 w-5 mr-2" />
          Like
        </Button>
      </div>
    </div>
  )
}

function MatchScoreRing({ score }: { score: number }) {
  const radius = 35
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative w-16 h-16">
      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#7A1F3D"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-bold text-lg">{score}%</span>
      </div>
    </div>
  )
}

function MatchBreakdownItem({ label, score }: { label: string; score: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${score}%` }}
          />
        </div>
        <span className="text-sm font-medium w-10 text-right">{score}%</span>
      </div>
    </div>
  )
}

function ConfettiTrigger() {
  useEffect(() => {
    const duration = 2000
    const animations = [
      confetti({
        particleCount: 30,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7A1F3D', '#E0527A', '#C9A24B', '#FFF9F3']
      }),
      confetti({
        particleCount: 20,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#7A1F3D', '#E0527A', '#C9A24B', '#FFF9F3']
      }),
      confetti({
        particleCount: 15,
        spread: 120,
        origin: { y: 0.5 },
        colors: ['#7A1F3D', '#E0527A', '#C9A24B', '#FFF9F3']
      })
    ]

    return () => {
      animations.forEach(a => a())
    }
  }, [])

  return null
}