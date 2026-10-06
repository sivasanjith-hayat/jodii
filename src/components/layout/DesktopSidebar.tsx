import { useLocation, Link } from 'react-router-dom'
import { Home, Search, Heart, MessageCircle, User, Settings, Shield } from 'lucide-react'
import { cn } from '../../lib/utils'
import { useAuthStore } from '../../store/auth'
import { useNotificationStore } from '../../store/notifications'

const navItems = [
  { name: 'home', href: '/', icon: Home },
  { name: 'search', href: '/search', icon: Search },
  { name: 'matches', href: '/matches', icon: Heart },
  { name: 'chat', href: '/chat', icon: MessageCircle },
  { name: 'notifications', href: '/notifications', icon: Bell },
  { name: 'profile', href: '/profile/me', icon: User }
]

const adminNavItems = [
  { name: 'admin', href: '/admin', icon: Shield, requiredRole: 'admin' }
]

import { Bell } from 'lucide-react'

export function DesktopSidebar() {
  const location = useLocation()
  const { user } = useAuthStore()
  const { unreadCount } = useNotificationStore()

  return (
    <aside className="hidden md:block w-16 h-screen fixed left-0 top-16 bg-card/95 backdrop-blur border-r">
      <div className="flex flex-col items-center gap-4 py-6">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href || location.pathname.startsWith(item.href)
          const isMatches = item.name === 'matches'
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-colors',
                isActive ? 'text-primary bg-accent/10' : 'text-muted-foreground hover:text-primary hover:bg-accent/5',
                isMatches && 'relative',
                item.name === 'notifications' && 'relative'
              )}
            >
              <Icon className="h-5 w-5" />
              {isMatches && unreadCount > 0 && (
                <div className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-xs font-bold text-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </div>
              )}
            </Link>
          )
        })}

        {user?.role === 'admin' && (
          <div className="pt-4">
            {adminNavItems.filter(n => n.requiredRole === user.role).map((item) => {
              const Icon = item.icon
              const isActive = location.pathname.startsWith(item.href)
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-colors',
                    isActive ? 'text-primary bg-accent/10' : 'text-muted-foreground hover:text-primary hover:bg-accent/5'
                  )}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </aside>
  )
}

export function TopBar() {
  const { user } = useAuthStore()
  const { t, i18n, changeLanguage } = useTranslation()
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/95 backdrop-blur">
      <div className="flex h-16 items-center px-4 max-w-screen-lg mx-between">
        <Link to="/" className="font-heading text-2xl font-bold text-primary">
          Jodi
        </Link>
        
        <div className="flex items-center gap-4">
          <select 
            value={i18n.language} 
            onChange={(e) => changeLanguage(e.target.value)}
            className="border border-input rounded-md px-2 py-1 text-sm bg-background"
          >
            <option value="en">English</option>
            <option value="ta">தமிழ்</option>
          </select>
          
          {user && (
            <Link to="/profile/me" className="hidden md:block">
              <Avatar>
                <AvatarImage src="/placeholder-avatar.png" alt={user.displayName} />
                <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

import { Avatar, AvatarFallback, AvatarImage } from './Avatar'