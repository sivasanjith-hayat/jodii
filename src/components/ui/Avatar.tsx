import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@radix-ui/react-avatar'
import { cn } from '../../lib/utils'

export { Avatar, AvatarFallback, AvatarImage }

export function ProfileAvatar({ 
  src, 
  alt,
  className,
  size = 'md'
}: {
  src?: string
  alt: string
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}) {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  }

  return (
    <Avatar className={cn(sizes[size], className)}>
      <AvatarImage src={src || '/placeholder-avatar.png'} alt={alt} />
      <AvatarFallback className="bg-primary text-primary-foreground">
        {alt?.charAt(0) || '?'}
      </AvatarFallback>
    </Avatar>
  )
}