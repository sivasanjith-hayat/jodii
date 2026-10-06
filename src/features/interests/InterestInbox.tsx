import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/auth'
import { useInterestsStore } from '../../store/interests'
import { Profile, getProfileById } from '../../data/profiles'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/Avatar'
import { Badge } from '../../components/ui/Badge'
import { EmptyState } from '../../components/ui/EmptyState'
import { Check, X, Heart, RefreshCw } from 'lucide-react'
import { useTranslation } from 'react-i18next'

type Tab = 'received' | 'sent' | 'accepted' | 'declined'

export default function InterestInbox() {
  const { user } = useAuthStore()
  const { t } = useTranslation()
  const userId = user?.profileId || 'profile-1'
  const [activeTab, setActiveTab] = useState<Tab>('received')
  
  const { getInterestsByProfile } = useInterestsStore()
  
  const interests: any[] = []

  const getInterests = (): any[] => {
    const allInterests = getInterestsByProfile(userId, ['sent', 'received', 'accepted', 'declined'])
    
    switch (activeTab) {
      case 'received':
        return allInterests.filter(i => i.toProfileId === userId && i.status === 'sent')
      case 'sent':
        return allInterests.filter(i => i.fromProfileId === userId && i.status === 'sent')
      case 'accepted':
        return allInterests.filter(i => 
          (i.fromProfileId === userId || i.toProfileId === userId) && 
          i.status === 'accepted'
        )
      case 'declined':
        return allInterests.filter(i => 
          (i.fromProfileId === userId || i.toProfileId === userId) && 
          i.status === 'declined'
        )
      default:
        return []
    }
  }

  const tabItems: { id: Tab; label: string; count: number }[] = [
    { id: 'received', label: 'Received', count: 2 },
    { id: 'sent', label: 'Sent', count: 5 },
    { id: 'accepted', label: 'Accepted', count: 3 },
    { id: 'declined', label: 'Declined', count: 1 }
  ]

  const currentInterests = getInterests()

  return (
    <div className="p-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="font-heading text-2xl font-bold">Interest Inbox</h1>
        
        <div className="flex gap-2 overflow-x-auto border-b">
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <Badge className="ml-2" variant="default">
                  {tab.count}
                </Badge>
              )}
            </button>
          ))}
        </div>

        {currentInterests.length === 0 ? (
          <EmptyState
            title={`No ${activeTab} interests`}
            description="Your interest inbox is empty."
            icon="heart"
            action={{
              label: 'View Matches',
              onClick: () => window.location.href = '/matches'
            }}
          />
        ) : (
          <div className="space-y-3">
            {currentInterests.map((interest, index) => {
              const profile = getProfileById(interest.toProfileId === userId ? interest.fromProfileId : interest.toProfileId)
              
              return (
                <motion.div
                  key={interest.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={profile?.photos[0]?.url || '/placeholder-avatar.png'} alt="Profile" />
                          <AvatarFallback>{profile?.name?.charAt(0) || '?'}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <h3 className="font-medium">{profile?.name || 'Profile'}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {interest.message || 'No message'}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge>{profile?.age || 25} yrs • {profile?.height || 165} cm</Badge>
                            <Badge>{profile?.community}</Badge>
                          </div>
                        </div>
                        
                        {activeTab === 'received' && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" onClick={() => {}}>
                              <X className="h-4 w-4" />
                            </Button>
                            <Button size="sm" className="bg-green-500 hover:bg-green-600">
                              <Check className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}
      </motion.div>
    </div>
  )
}