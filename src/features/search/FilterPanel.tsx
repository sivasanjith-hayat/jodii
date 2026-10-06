import { useState } from 'react'
import { Chip } from '../../components/ui/Chip'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../components/ui/Collapsible'
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
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3.5 py-2.5 text-sm hover:bg-muted/50">
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Advanced Filters
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform ${!open ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-4 pt-4">
            <div>
              <h4 className="font-medium mb-2">Age</h4>
              <div className="flex gap-2">
                {['22-25', '26-30', '31-35', '36-40'].map(age => (
                  <Chip
                    key={age}
                    label={age}
                    selected={selectedAge === age}
                    selectable
                    onClick={() => setSelectedAge(selectedAge === age ? '' : age)}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Religion</h4>
              <div className="flex flex-wrap gap-2">
                {religions.map(religion => (
                  <Chip
                    key={religion}
                    label={religion}
                    selected={selectedReligion === religion}
                    selectable
                    onClick={() => setSelectedReligion(selectedReligion === religion ? '' : religion)}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Community</h4>
              <div className="flex flex-wrap gap-2">
                {communities.map(community => (
                  <Chip key={community} label={community} selectable />
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}