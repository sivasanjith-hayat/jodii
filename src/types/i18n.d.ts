declare module 'react-i18next' {
  import { IntoFunctionComponent, IntoFunctionComponentProps, Options, CustomTranslationKeys, CustomResourceKeys } from 'i18next'

  export function useTranslation<TNamespace extends keyof TranslationResources>(
    ns?: TNamespace | readonly TNamespace[],
    options?: Options
  ): [
    TNamespace extends string ? TranslationResources[TNamespace] : CustomTranslationKeys,
    { t: <TKey extends keyof (TNamespace extends string ? TranslationResources[TNamespace] : never)>(
      key: TKey,
      options?: TNamespace extends string ? undefined : Options<TNamespace>
    ) => TranslationResources[TNamespace][TKey] }
  ]

  export function useTranslationWithOptions<TNamespace extends keyof TranslationResources>(
    ns?: TNamespace | readonly TNamespace[],
    options?: Options
  ): [
    TNamespace extends string ? TranslationResources[TNamespace] : CustomTranslationKeys,
    { t: <TKey extends keyof (TNamespace extends string ? TranslationResources[TNamespace] : never)>(
      key: TKey,
      options?: TNamespace extends string ? undefined : Options<TNamespace>
    ) => TranslationResources[TNamespace][TKey] }
  ]
}

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
  profile: {
    view: string
    edit: string
    photos: string
    basic_info: string
    career: string
    lifestyle: string
    family: string
  }
  search: {
    search_profiles: string
    filters: string
    results: string
  }
}