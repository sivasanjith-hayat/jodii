import * as React from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { cn } from '../../lib/utils'

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & {
    side?: 'left' | 'right' | 'top' | 'bottom'
  }
>(({ className, side = 'right', ...props }, ref) => (
  <SheetPrimitive.Portal>
    <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" />
    <SheetPrimitive.Content
      ref={ref}
      side={side}
      className={cn(
        'fixed z-50 bg-card text-card-foreground shadow-lg',
        side === 'right' && 'right-0 top-0 h-full w-72 border-l',
        side === 'left' && 'left-0 top-0 h-full w-72 border-r',
        side === 'top' && 'top-0 left-0 right-0 h-auto border-b',
        side === 'bottom' && 'bottom-0 left-0 right-0 h-auto border-t',
        className
      )}
      {...props}
    />
  </SheetPrimitive.Portal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

export { Sheet, SheetTrigger, SheetContent }