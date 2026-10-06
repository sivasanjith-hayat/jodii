import * as React from 'react'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { X, Check, AlertCircle, Info } from 'lucide-react'

interface Toast {
  id: string
  title?: string
  description?: string
  action?: string
  variant?: 'default' | 'destructive' | 'success' | 'warning'
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 11)
    setToasts(prev => [...prev, { ...toast, id }])
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 5000)
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

const Toaster = () => {
  const { toasts } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={cn(
            'bg-background border shadow-lg rounded-lg p-4 animate-in slide-in-from-right-8',
            toast.variant === 'destructive' && 'border-destructive text-destructive',
            toast.variant === 'success' && 'border-success text-success',
            toast.variant === 'warning' && 'border-yellow-500 text-yellow-700'
          )}
        >
          <div className="flex items-start gap-3">
            {toast.variant === 'success' && <Check className="h-5 w-5 flex-shrink-0 mt-0.5" />}
            {toast.variant === 'destructive' && <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />}
            {toast.variant === 'warning' && <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />}
            {toast.variant === 'default' && <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />}
            
            <div className="flex-1">
              {toast.title && <div className="font-medium">{toast.title}</div>}
              {toast.description && <div className="text-sm text-muted-foreground">{toast.description}</div>}
              {toast.action && (
                <button className="mt-2 text-sm font-medium underline-offset-2 hover:underline">
                  {toast.action}
                </button>
              )}
            </div>
            
            <button
              onClick={() => {
                const context = useToast()
                context.removeToast(toast.id)
              }}
              className="hover:bg-muted rounded-full p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export { ToastProvider }