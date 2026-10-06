import { cn } from '../../lib/utils'
import { X } from 'lucide-react'

interface ChipProps {
  label: string
  selectable?: boolean
  selected?: boolean
  onDelete?: () => void
  className?: string
}

export function Chip({ label, selectable = false, selected = false, onDelete, className }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 text-sm rounded-full transition-colors',
        selectable && 'cursor-pointer',
        selected && 'bg-primary text-primary-foreground',
        !selected && selectable && 'bg-accent/10 text-accent hover:bg-accent/20',
        !selected && !selectable && 'bg-muted text-muted-foreground',
        onDelete && 'bg-destructive/10 text-destructive hover:bg-destructive/20'
      )}
    >
      {label}
      {onDelete && (
        <button 
          onClick={onDelete}
          className="hover:opacity-70 transition-opacity"
          aria-label="Delete"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  )
}

export function ChipGroup({ 
  chips, 
  selected,
  onChange,
  multiple = false,
  className
}: {
  chips: string[]
  selected: string | string[]
  onChange: (value: string | string[]) => void
  multiple?: boolean
  className?: string
}) {
  const isSelected = (chip: string) => {
    if (multiple) {
      return (selected as string[]).includes(chip)
    }
    return selected === chip
  }

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {chips.map(chip => (
        <Chip
          key={chip}
          label={chip}
          selectable
          selected={isSelected(chip)}
          onDelete={multiple && isSelected(chip) ? () => {
            const newSelected = multiple 
              ? (selected as string[]).filter(s => s !== chip)
              : chip
            onChange(newSelected)
          } : undefined}
        />
      ))}
    </div>
  )
}