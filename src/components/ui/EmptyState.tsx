import * as React from 'react'
import { cn } from '../../lib/utils'
import { Button } from './Button'

interface EmptyStateProps {
  icon?: 'search' | 'heart' | 'message' | 'user' | 'custom'
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
  children?: React.ReactNode
}

const icons = {
  search: '🔍',
  heart: '❤️',
  message: '💬',
  user: '👤',
  custom: null
}

export function EmptyState({ 
  icon = 'user', 
  title = 'No Results Found', 
  description = 'Try adjusting your search or filters',
  action,
  className,
  children
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center', className)}>
      <div className="text-6xl mb-4">
        {icon ? icons[icon] : '👤'}
      </div>
      
      {children || (
        <>
          <h3 className="font-heading text-xl font-semibold mb-2">
            {title}
          </h3>
          <p className="text-muted-foreground mb-4 max-w-sm">
            {description}
          </p>
          {action && (
            <Button onClick={action.onClick}>
              {action.label}
            </Button>
          )}
        </>
      )}
    </div>
  )
}