import { cn } from '../../lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'image' | 'circular' | 'rectangular'
  count?: number
}

export function Skeleton({ className, variant = 'text', count = 1 }: SkeletonProps) {
  const variants = {
    text: 'h-4 w-full rounded-md',
    image: 'h-full w-full rounded-md',
    circular: 'h-10 w-10 rounded-full',
    rectangular: 'h-4 w-[90%]'
  }

  if (count > 1) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={cn(variants[variant], className, i !== count - 1 && 'w-[90%]')}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={cn('animate-pulse bg-muted rounded-md', variants[variant], className)} />
  )
}