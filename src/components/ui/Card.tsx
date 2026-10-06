import { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface CardProps {
  className?: string
  children: ReactNode
  hoverable?: boolean
  glassy?: boolean
}

export function Card({ className, children, hoverable = true, glassy = true }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border bg-card text-card-foreground',
        hoverable && 'transition-shadow duration-200 hover:shadow-lg',
        glassy && 'bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60',
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('flex flex-col space-y-1.5 p-6', className)}>{children}</div>
}

export function CardTitle({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <h3
      className={cn(
        'font-heading text-2xl font-bold leading-none tracking-tight',
        className
      )}
    >
      {children}
    </h3>
  )
}

export function CardDescription({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p
      className={cn('text-sm text-muted-foreground', className)}
    >
      {children}
    </p>
  )
}

export function CardContent({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('p-6 pt-0', className)}>{children}</div>
}

export function CardFooter({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('flex items-center p-6 pt-0 space-x-2', className)}>{children}</div>
}