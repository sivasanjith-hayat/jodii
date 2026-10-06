import { useLocation, Link } from 'react-router-dom'
import { Home, Search, Heart, MessageCircle, User } from 'lucide-react'
import { cn } from '../../lib/utils'
import { useNotificationStore } from '../../store/notifications'

const navItems = [
  { name: 'home', href: '/', icon: Home },
  { name: 'search', href: '/search', icon: Search },
  { name: 'matches', href: '/matches', icon: Heart },
  { name: 'chat', href: '/chat', icon: MessageCircle },
  { name: 'profile', href: '/profile/me', icon: User }
]

export function BottomNav() {
  const location = useLocation()
  const { unreadCount } = useNotificationStore()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur border-t">
      <div className="flex items-center justify-around h-16 max-w-screen-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href || location.pathname.startsWith(item.href)
          const isMatches = item.name === 'matches'
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex flex-col items-center justify-center w-14 rounded-xl transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary',
                isMatches && 'relative'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.name}</span>
              {isMatches && unreadCount > 0 && (
                <div className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-xs font-bold text-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </div>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}