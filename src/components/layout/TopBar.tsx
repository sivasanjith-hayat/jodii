import { useLocation, Link } from 'react-router-dom'
import { Bell, Search, Menu, User, Settings } from 'lucide-react'
import { cn } from '../../lib/utils'
import { useAuthStore } from '../../store/auth'
import { useNotificationStore } from '../../store/notifications'
import { useTranslation } from 'react-i18next'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar'
import { Sheet, SheetContent, SheetTrigger } from '../ui/Sheet'
import { Button } from '../ui/Button'

export function TopBar() {
  const location = useLocation()
  const { t, i18n, changeLanguage } = useTranslation()
  const { user } = useAuthStore()
  const { unreadCount } = useNotificationStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isMatches = location.pathname === '/matches' || location.pathname.startsWith('/matches')
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 max-w-screen-lg mx-auto">
        <Link to="/" className="font-heading text-2xl font-bold text-primary">
          Jodi
        </Link>
        
        <div className="flex items-center gap-4">
          <select 
            value={i18n.language} 
            onChange={(e) => changeLanguage(e.target.value)}
            className="hidden sm:block border border-input rounded-md px-2 py-1 text-sm bg-background"
          >
            <option value="en">English</option>
            <option value="ta">தமிழ்</option>
          </select>
          
          <Link to="/search" className="hidden sm:block">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </Link>
          
          <Link to="/notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-xs font-bold text-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </div>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </Link>

          {user && (
            <Link to="/profile/me" className="hidden sm:block">
              <Button variant="ghost" size="icon">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.png" alt={user.displayName} />
                  <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
              </Button>
            </Link>
          )}

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="sm:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-4 pt-6">
                <select 
                  value={i18n.language} 
                  onChange={(e) => {
                    changeLanguage(e.target.value)
                    setMobileMenuOpen(false)
                  }}
                  className="border border-input rounded-md px-2 py-1 text-sm bg-background"
                >
                  <option value="en">English</option>
                  <option value="ta">தமிழ்</option>
                </select>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

import { useState } from 'react'