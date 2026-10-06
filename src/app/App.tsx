import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import { useEffect, useState } from 'react'
import AppShell from './AppShell'
import LoginPage from '../features/auth/pages/LoginPage'
import ProfileEditor from '../features/profile/ProfileEditor'
import SearchResults from '../features/search/SearchResults'
import MatchingDetails from '../features/matching/MatchingDetails'
import InterestInbox from '../features/interests/InterestInbox'
import { useProfilesStore } from '../store/profile'
import { LoadingSpinner } from '../components/ui/Loading'

function App() {
  const { user, initializeDemo } = useAuthStore()
  const { loadProfiles } = useProfilesStore()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('demo')) {
      initializeDemo()
    }
    loadProfiles()
    setIsInitialized(true)
  }, [initializeDemo, loadProfiles])

  if (!isInitialized) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <LoadingSpinner />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/" element={<AppShell />}>
          <Route index element={<MatchingDetails />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="matches" element={<MatchingDetails />} />
          <Route path="interests" element={<InterestInbox />} />
          <Route path="profile/:profileId" element={<ProfileEditor />} />
        </Route>
        
        <Route path="*" element={
          <div className="p-8">
            <h1 className="font-heading text-2xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
          </div>
        } />
      </Routes>
    </div>
  )
}

export default App