import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/Avatar'
import { Upload, X, Eye, EyeOff } from 'lucide-react'
import { cn } from '../../lib/utils'

interface PhotoManagerProps {
  photos: { url: string; isPrimary: boolean; visibility: 'everyone' | 'matches' | 'hidden' }[]
  onPhotosChange: (photos: typeof photos) => void
}

export function PhotoManager({ photos, onPhotosChange }: PhotoManagerProps) {
  const [dragOver, setDragOver] = useState<string | null>(null)

  const handleUpload = (index: number) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const url = URL.createObjectURL(file)
        const newPhotos = [...photos]
        newPhotos[index] = { ...newPhotos[index], url, isPrimary: index === 0 }
        onPhotosChange(newPhotos)
      }
    }
    input.click()
  }

  const handleUploadNew = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const url = URL.createObjectURL(file)
        const newPhotos = [...photos, { url, isPrimary: false, visibility: 'everyone' }]
        onPhotosChange(newPhotos.slice(0, 5))
      }
    }
    input.click()
  }

  const togglePrimary = (index: number) => {
    const newPhotos = photos.map((photo, i) => ({
      ...photo,
      isPrimary: i === index
    }))
    onPhotosChange(newPhotos)
  }

  const toggleVisibility = (index: number) => {
    const newPhotos = [...photos]
    const current = newPhotos[index].visibility
    newPhotos[index].visibility = current === 'everyone' ? 'matches' : current === 'matches' ? 'hidden' : 'everyone'
    onPhotosChange(newPhotos)
  }

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index)
    if (newPhotos.length === 0) {
      newPhotos.push({ url: '/placeholder-avatar.png', isPrimary: true, visibility: 'everyone' })
    }
    onPhotosChange(newPhotos)
  }

  const visibilityText = {
    everyone: 'Everyone',
    matches: 'Only Matches',
    hidden: 'Hidden'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Photos</CardTitle>
        <CardDescription>Up to 5 photos. The first will be your cover photo.</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {photos.map((photo, index) => (
            <div
              key={index}
              className={cn(
                'relative border-2 rounded-lg overflow-hidden',
                photo.isPrimary && 'border-primary',
                photo.url === '/placeholder-avatar.png' && 'border-dashed'
              )}
              onDragOver={(e) => {
                e.preventDefault()
                setDragOver(photo.url)
              }}
              onDragLeave={() => setDragOver(null)}
              onDrop={(e) => {
                e.preventDefault()
                e.dataTransfer.getData('text/plain')
              }}
            >
              <Avatar className="h-24 w-24">
                <AvatarImage src={photo.url} alt={`Photo ${index + 1}`} />
                <AvatarFallback>{String(index + 1)}</AvatarFallback>
              </Avatar>
              
              {!photo.isPrimary && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePrimary(index)}
                  className="absolute top-1 right-1"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              )}
              
              {photo.isPrimary && (
                <span className="absolute top-1 right-1 bg-primary text-white text-xs px-2 py-1 rounded">
                  Primary
                </span>
              )}
              
              <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 py-0.5 rounded">
                {visibilityText[photo.visibility]}
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => toggleVisibility(index)}>
                    {photo.visibility === 'everyone' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => removePhoto(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {photos.length < 5 && (
            <div
              onClick={handleUploadNew}
              className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-4 cursor-pointer hover:border-primary transition-colors"
            >
              <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Add Photo</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}