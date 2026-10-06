import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Profile } from '../../data/profiles'
import { Badge } from '../../components/ui/Badge'
import { Card, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/Avatar'
import { Heart, MessageCircle } from 'lucide-react'
import { cn } from '../../lib/utils'

interface ProfileCardProps {
  profile: Profile
  searchMode?: 'grid' | 'list'
}

export function ProfileCard({ profile, searchMode = 'grid' }: ProfileCardProps) {
  const matchScore = 75

  if (searchMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="border rounded-lg p-4 bg-card hover:shadow-lg transition-shadow"
      >
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile.photos[0]?.url || '/placeholder-avatar.png'} alt={profile.name} />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="font-medium text-lg">{profile.name}</h3>
            <p className="text-sm text-muted-foreground">
              {profile.age} yrs • {profile.height} cm • {profile.career.occupation}
            </p>
            <div className="flex gap-2 mt-2">
              <Badge>{profile.religion}</Badge>
              <Badge>{profile.community}</Badge>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" variant="ghost">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-card rounded-xl overflow-hidden shadow-lg"
    >
      <div className="relative">
        <img
          src={profile.photos[0]?.url || '/placeholder-avatar.png'}
          alt={profile.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white">
            <span className="font-bold text-lg">{matchScore}%</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-heading text-lg font-bold">{profile.name}</h3>
          <p className="text-sm text-muted-foreground">
            {profile.age} yrs • {profile.height} cm • {profile.motherTongue}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {profile.career.occupation} • {profile.career.company}
          </p>
          
          <div className="flex flex-wrap gap-1.5">
            <Badge>{profile.religion}</Badge>
            <Badge>{profile.community}</Badge>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button size="sm" className="flex-1">
              <Heart className="h-4 w-4 mr-1" />
              Interest
            </Button>
            <Button size="sm" variant="outline">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </motion.div>
  )
}