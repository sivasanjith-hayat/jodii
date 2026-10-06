import { Outlet } from 'react-router-dom'

export function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-card border-b px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold text-primary">Jodi</div>
        <button className="px-3 py-1 rounded-lg border">Tamil</button>
      </div>
    </header>
  )
}

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-card border-t px-4 py-2">
      <div className="flex items-center justify-around">
        <button className="flex-1 py-2">Home</button>
        <button className="flex-1 py-2">Search</button>
        <button className="flex-1 py-2">Matches</button>
        <button className="flex-1 py-2">Chat</button>
        <button className="flex-1 py-2">Profile</button>
      </div>
    </nav>
  )
}

export default function AppShell() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <TopBar />
      
      <main className="flex-1 overflow-y-auto pt-14 pb-16">
        <Outlet />
      </main>
      
      <BottomNav />
    </div>
  )
}