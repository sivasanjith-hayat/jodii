import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs'
import { ProfileView } from './ProfileView'
import { EditProfileForm } from './EditProfileForm'
import { PhotoManager } from './PhotoManager'
import { FamilyDetailsView } from '../family/FamilyDetailsView'
import { PartnerPreferencesView } from '../preferences/PartnerPreferencesView'

export default function ProfileEditor() {
  const { profileId } = useParams<{ profileId: string }>()
  const { t } = useTranslation()
  const isOwnProfile = profileId === 'me'

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-screen-lg mx-auto">
      <Tabs defaultValue="view" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="view">View Profile</TabsTrigger>
          <TabsTrigger value="edit">Edit Profile</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="view">
          <ProfileView profileId={profileId || 'me'} isOwnProfile={isOwnProfile} />
        </TabsContent>
        
        <TabsContent value="edit">
          {isOwnProfile && <EditProfileForm />}
        </TabsContent>
        
        <TabsContent value="photos">
          {isOwnProfile && <PhotoManager />}
        </TabsContent>
        
        <TabsContent value="preferences">
          {isOwnProfile && <PartnerPreferencesView />}
        </TabsContent>
      </Tabs>
    </div>
  )
}

import { useProfileStore } from '../../store/profile'
import { useAuthStore } from '../../store/auth'
import { getProfileById } from '../../data/profiles'