import { useState, useMemo } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Profile, getProfilesByFilter } from '../../data/profiles'
import { SearchBar } from './SearchBar'
import { FilterPanel } from './FilterPanel'
import { ProfileCard } from './ProfileCard'
import { EmptyState } from '../../components/ui/EmptyState'
import { LoadingSpinner, ProfileCardSkeleton } from '../../components/ui/Loading'
import { Button } from '../../components/ui/Button'
import { LayoutGrid, List } from 'lucide-react'
import { useProfilesStore } from '../../store/profile'

export default function SearchResults() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const [searchMode, setSearchMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  
  const { profiles, isLoading, loadProfiles } = useProfilesStore()

  const filters = useMemo(() => {
    return {
      age: searchParams.get('age'),
      height: searchParams.get('height'),
      religion: searchParams.get('religion'),
      community: searchParams.get('community'),
      location: searchParams.get('location')
    }
  }, [searchParams])

  const filteredProfiles = useMemo(() => {
    if (!profiles || profiles.length === 0) return []
    
    const filterObj: Partial<Profile> = {}
    if (filters.religion && filters.religion !== 'all') {
      filterObj.religion = filters.religion
    }
    if (filters.community && filters.community !== 'all') {
      filterObj.community = filters.community
    }
    
    return getProfilesByFilter(filterObj)
  }, [profiles, filters])

  if (isLoading) {
    return (
      <div className="p-4">
        <ProfileCardSkeleton count={6} />
      </div>
    )
  }

  const matchesCount = filteredProfiles.length
  const isEmpty = matchesCount === 0 && filters

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 pb-20"
    >
      <SearchBar defaultFilters={filters} />
      
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          {isValidNumber(filters.age) ? `${filters.age} years` : 'All ages'}, 
          {isValidNumber(filters.height) ? `${filters.height} cm` : 'All heights'}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={showFilters ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
          
          <div className="flex rounded-md border bg-muted">
            <Button
              variant={searchMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSearchMode('grid')}
              className="rounded-r-none"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={searchMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSearchMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {showFilters && <FilterPanel />}

      {isEmpty ? (
        <EmptyState
          title="No matches found"
          description="Try adjusting your filters to find more profiles"
          action={{
            label: "Clear Filters",
            onClick: () => {
              // Clear filters
            }
          }}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProfiles.slice(0, 20).map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ProfileCard profile={profile} searchMode={searchMode} />
            </motion.div>
          ))}
        </div>
      )}

      {filteredProfiles.length > 20 && (
        <div className="flex justify-center py-8">
          <Button variant="outline">Load More</Button>
        </div>
      )}
    </motion.div>
  )
}

function isValidNumber(value: string | null): boolean {
  return value !== null && !isNaN(Number(value))
}