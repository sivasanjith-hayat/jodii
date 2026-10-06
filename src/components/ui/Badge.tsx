import * as React from 'react'
import { cn } from '../../lib/utils'

export interface BadgeProps {
  text?: string
  className?: string
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'primary'
  asChild?: boolean
  children?: React.ReactNode
}

const badgeVariants = {
  default: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
  success: 'bg-success text-success-foreground hover:bg-success/80',
  warning: 'bg-yellow-500 text-yellow-900 hover:bg-yellow-500/80',
  primary: 'bg-primary text-primary-foreground hover:bg-primary/80'
}

export function Badge({ className, variant = 'default', text, children, ...props }: BadgeProps) {
  const badgeContent = text || children
  
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {badgeContent}
    </span>
  )
}

export function TrustBadge({ score }: { score: number }) {
  const color = score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-gray-400'
  
  return (
    <div className="flex items-center gap-1.5">
      <div className={cn('w-2 h-2 rounded-full', color)} />
      <span className="text-sm font-medium">{score}%</span>
    </div>
  )
}

export function SuccessStatusBadge({ isVerified }: { isVerified: boolean }) {
  return (
    <div className="flex items-center gap-1.5 text-sm">
      {isVerified ? (
        <>
          <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 01-1.414 0L9 11.586 4.707 7.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd" />
          </svg>
          <span className="text-green-600">Verified</span>
        </>
      ) : (
        <>
          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" strokeLinecap="round" />
          </svg>
          <span className="text-gray-500">Pending Verification</span>
        </>
      )}
    </div>
  )
}