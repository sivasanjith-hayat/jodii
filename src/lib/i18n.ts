import i18n from 'i18next'

const translations = {
  en: {
    navigation: {
      home: 'Home',
      search: 'Search',
      matches: 'Matches',
      chat: 'Chat',
      profile: 'Profile'
    },
    auth: {
      login: 'Login',
      email: 'Email',
      password: 'Password',
      demo_login: 'Demo Login',
      sign_in: 'Sign In'
    }
  },
  ta: {
    navigation: {
      home: 'முதல்நிலை',
      search: 'தேடல்',
      matches: 'ஊட்டாசங்கே',
      chat: 'வாணியம்',
      profile: 'சுயவிவரம்'
    },
    auth: {
      login: 'நிரந்தனம்',
      email: 'மின்னஞ்சல்',
      password: 'குறிப்பு',
      demo_login: 'டெமோ நிரந்தனம்',
      sign_in: 'நிரந்தனம்'
    }
  }
}

i18n.init({
  resources: {
    en: { translation: translations.en },
    ta: { translation: translations.ta }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

declare module 'react-i18next' {
  interface TranslationResources {
    navigation: {
      home: string
      search: string
      matches: string
      chat: string
      profile: string
    }
    auth: {
      login: string
      email: string
      password: string
      demo_login: string
      sign_in: string
    }
  }
}

declare module 'i18next' {
  interface TranslationKey {}
}

export default i18n