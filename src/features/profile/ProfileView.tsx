import { motion } from 'framer-motion'
import { Heart, Mail, Share2, UserCheck, Award, MapPin, Briefcase, Home, Users, Star } from 'lucide-react'
import { Profile, profiles, getProfileById } from '../../data/profiles'
import { Badge, TrustBadge } from '../../components/ui/Badge'
import { Chip } from '../../components/ui/Chip'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/Avatar'
import { useAuthStore } from '../../store/auth'
import { useTranslation } from 'react-i18next'
import { cn } from '../../lib/utils'

interface ProfileViewProps {
  profileId?: string
  isOwnProfile?: boolean
}

export function ProfileView({ profileId, isOwnProfile = false }: ProfileViewProps) {
  const { user } = useAuthStore()
  const { t } = useTranslation()
  const id = profileId || (user?.profileId) || 'profile-1'
  const profile = getProfileById(id) || profiles[0]

  if (!profile) {
    return <div>Profile not found</div>
  }

  const isOnline = profile.online
  const isActiveRecently = profile.lastActive && new Date(profile.lastActive) > new Date(Date.now() - 24 * 60 * 60 * 1000)

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-ivory to-card">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-card shadow-lg">
                  <AvatarImage src={profile.photos[0]?.url || '/placeholder-avatar.png'} alt={profile.name} />
                  <AvatarFallback className="text-3xl">
                    {profile.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {isOnline && (
                  <div className="absolute -bottom-2 -right-2 bg-success rounded-full p-2">
                    <div className="h-4 w-4 bg-success-foreground rounded-full" />
                  </div>
                )}
              </div>
              
              <div className="text-center space-y-2">
                <h2 className="font-heading text-3xl font-bold">{profile.name}</h2>
                <div className="flex items-center justify-center gap-2">
                  <Badge text={`${profile.age} yrs`} />
                  <Badge text={`${profile.height} cm`} />
                  <TrustBadge score={profile.verification.trustScore} />
                </div>
                <p className="text-muted-foreground">
                  {profile.motherTongue} • {profile.community} • {profile.religion}
                </p>
              </div>
              
              {!isOwnProfile && (
                <div className="flex gap-3">
                  <Button size="lg" className="flex-1">
                    <Heart className="h-5 w-5 mr-2" />
                    Send Interest
                  </Button>
                  <Button variant="outline" size="lg">
                    <Mail className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {profile.community} professional seeking a compatible match. 
              Values family, tradition, and modern outlook.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Career</span>
              <span className="font-medium">{profile.career.occupation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location</span>
              <span className="font-medium">{profile.location.currentCity}, {profile.location.country}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Income</span>
              <span className="font-medium">{profile.career.income}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Online</span>
              <Badge 
                text={isOnline ? 'Online' : 'Offline'} 
                variant={isOnline ? 'success' : 'default'}
              />
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Active</span>
              <span className="font-medium text-sm">{formatRelativeTime(profile.lastActive)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Partner Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Chip label="Age: 25-32" />
            <Chip label="Height: 5'4&quot; - 5'8&quot;" />
            <Chip label={profile.partnerPreferences.religion} />
            <Chip label={profile.partnerPreferences.caste} />
            <Chip label={profile.partnerPreferences.motherTongue} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function formatRelativeTime(date: string): string {
  const d = new Date(date)
  const now = new Date()
  const diffHours = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60))
  
  if (diffHours < 1) return 'Just now'
  if (diffHours < 24) return `${diffHours}h ago`
  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays}d ago`
}