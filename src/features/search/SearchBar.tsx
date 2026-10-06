import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { cn } from '../../lib/utils'

interface SearchBarProps {
  defaultFilters?: Record<string, string>
}

export function SearchBar({ defaultFilters }: SearchBarProps) {
  const [query, setQuery] = useState(defaultFilters?.q || '')

  const handleClear = () => {
    setQuery('')
  }

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search by name, city, community..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 pr-10 h-12"
      />
      {query && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}