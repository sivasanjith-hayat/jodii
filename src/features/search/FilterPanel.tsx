import { useState } from 'react'
import { Badge } from '../../components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'

export function FilterPanel() {
  const [open, setOpen] = useState(false)
  const [selectedAge, setSelectedAge] = useState<string>('')
  const [selectedReligion, setSelectedReligion] = useState<string>('')
  
  const religions = ['Hindu', 'Christian', 'Muslim', 'Sikh', 'Jain', 'Buddhist']
  const communities = ['Tamil', 'Telugu', 'Malayalam', 'Kannada', 'Marathi', 'Gujarati', 'Punjabi', 'Bengali', 'Odia']

  const clearFilters = () => {
    setSelectedAge('')
    setSelectedReligion('')
  }

  const hasActiveFilters = selectedAge || selectedReligion

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Filters</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div>
          <h4 className="font-medium mb-2">Age</h4>
          <div className="flex gap-2">
            {['22-25', '26-30', '31-35', '36-40'].map(age => (
              <Badge
                key={age}
                text={age}
                selected={selectedAge === age}
                variant={selectedAge === age ? 'primary' : 'default'}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium mb-2">Religion</h4>
          <div className="flex flex-wrap gap-2">
            {religions.map(religion => (
              <Badge
                key={religion}
                text={religion}
                selected={selectedReligion === religion}
                variant={selectedReligion === religion ? 'primary' : 'default'}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium mb-2">Community</h4>
          <div className="flex flex-wrap gap-2">
            {communities.slice(0, 5).map(community => (
              <Badge key={community} text={community} variant="default" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}