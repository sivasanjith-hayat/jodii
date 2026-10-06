import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { useProfilesStore } from '../../store/profile'
import { EditProfileForm } from './EditProfileForm'
import { PhotoManager } from './PhotoManager'
import { ProfileView } from './ProfileView'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs'

export default function ProfileEditor() {
  const { user } = useProfilesStore()
  const [activeTab, setActiveTab] = useState('view')

  if (!user) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="pt-6">
            <p>Please log in to view your profile.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>View and edit your matrimony profile</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="view">View Profile</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="edit">Edit Info</TabsTrigger>
            </TabsList>
            
            <TabsContent value="view">
              <ProfileView />
            </TabsContent>
            
            <TabsContent value="photos">
              <PhotoManager 
                photos={user.photos}
                onPhotosChange={(photos) => {
                  console.log('Photos updated:', photos)
                }}
              />
            </TabsContent>
            
            <TabsContent value="edit">
              <EditProfileForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}