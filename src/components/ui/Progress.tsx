import * as React from 'react'
import { cn } from '../../lib/utils'

interface ProgressProps {
  value: number
  max?: number
  className?: string
}

export function Progress({ value, max = 100, className }: ProgressProps) {
  return (
    <div
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-secondary',
        className
      )}
    >
      <div
        className="h-full w-full transition-all duration-300 bg-primary"
        style={{ transform: `translateX(0)`, width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}