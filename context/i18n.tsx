import { useRouter } from "next/router"
import { createContext, useContext } from "react"
import es from '../locale/es.json'
import en from '../locale/en.json'
import { useCallback } from "react"

type languagesType = {
  [locale: string]: any
}

type languagesContextType = {
  t: (key: any, ...args: any) => any
}

const I18NContext = createContext<languagesContextType>({} as languagesContextType)

const languages: languagesType = { es, en }

export function I18NProvider({ children }: { children: React.ReactNode }) {
  const { locale } = useRouter()

  const t: (key: any, ...args: any) => any = useCallback((key: any, ...args: any) => {
    if(!locale) return 
    let translation = languages[locale][key]
    if (args.length === 0) return translation
    
    args.forEach((value: any, index: any) => {
      translation = translation.replace(`\${${index + 1}}`, value)
    })
  
    return translation
  }, [locale])

  return (
    <I18NContext.Provider value={{ t }}>
      {children}
    </I18NContext.Provider>
  )
}

export function useI18N() {
  const context = useContext(I18NContext)
  if (context === undefined) {
    throw new Error("useI18N must be used within a I18NProvider")
  }
  return context
}