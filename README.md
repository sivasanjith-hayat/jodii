# Jodi - 100% Free Matrimony Platform

**Find your perfect match** - A modern, respectful, and family-friendly matrimony platform.

## Features

### Complete Matrimony Platform (Frontend Only)
- ✅ 100% FREE - No premium plans, paywalls, or usage limits
- ✅ Multi-language support (English, Tamil, Hindi, Telugu, Malayalam, Kannada, Bengali, Marathi, Gujarati, Punjabi, Odia)
- ✅ PWA Ready - Installable on mobile without app stores
- ✅ Offline support with cached data
- ✅ No backend required - Runs entirely in the browser with simulated data

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **State Management**: Zustand (with localStorage persistence)
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router DOM
- **Internationalization**: i18next
- **Charts**: Recharts for analytics
- **UI**: Lucide React icons

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Regular User | priya@example.com | demo123 |
| Parent | parent@example.com | demo123 |
| Matchmaker | matchmaker@example.com | demo123 |
| Moderator | moderator@example.com | demo123 |
| Admin | admin@example.com | admin123 |

## Getting Started

### Prerequisites
- Node.js 18+ or higher
- npm, pnpm, or yarn

### Installation

```bash
cd jodi-platform
npm install
# or
pnpm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
src/
├── app/                    # App shell & routing
├── components/             # Shared UI components
│   ├── layout/            # Headers, sidebars, navigation
│   └── ui/                # shadcn/ui style components
├── features/              # Feature modules
│   ├── auth/              # Authentication pages
│   ├── profile/           # Profile management
│   ├── photos/            # Photo management
│   ├── family/            # Family details
│   ├── preferences/       # Partner preferences
│   ├── search/            # Search functionality
│   ├── matching/          # Matching algorithms
│   ├── interests/         # Interest system
│   ├── chat/              # Messaging
│   ├── verification/      # Verification center
│   ├── analytics/         # Profile analytics
│   ├── notifications/     # Notification system
│   ├── horoscope/         # Kundli/astrology
│   ├── nri/               # International matchmaking
│   ├── community/         # Community pages
│   ├── matchmaking/       # Human matchmaking
│   ├── success/           # Success stories
│   └── admin/             # Admin panel
├── data/                  # Mock data (profiles, references)
├── hooks/                 # Custom hooks
├── lib/                   # Utility functions
├── pages/                 # Page components
├── services/              # Mock API/services
├── store/                 # Zustand stores
├── types/                 # TypeScript types
└── i18n/                  # Internationalization
```

## Swapping the Mock Services for Real Backend

The entire app is designed with a service layer abstraction. To connect to a real backend:

1. **Replace `src/services/*.ts`** with real API calls
2. **Keep the same function signatures** - the components use these interfaces
3. **Example service interface:**

```typescript
// src/services/authService.ts
export const login = async (email: string, password: string): Promise<LoginResult> => {
  // Replace with real API call
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
  return response.json()
}

export const getProfile = async (id: string): Promise<Profile | null> => {
  const response = await fetch(`/api/profiles/${id}`)
  return response.json()
}
```

4. **Update the store** to handle async operations properly

5. **Replace `src/data/profiles.ts`** generation with data from your database

## Why This Project?

Jodi is built with these principles:
- **Respectful**: Follows cultural values and family-oriented approach
- **Modern**: Clean, intuitive UI with modern UX patterns
- **Free**: No paywalls, no hidden costs
- **Inclusive**: Supports multiple Indian languages and communities
- **Privacy-first**: Strong privacy controls and data protection

## Contributing

This is a demo platform. Feel free to fork and modify for your needs.

## License

MIT - Free for personal and commercial use.