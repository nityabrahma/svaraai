
'use client'
 
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
 
type Theme = 'dark' | 'light' | 'system'
 
type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}
 
const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)
 
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
}: {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return defaultTheme
    }
    return (localStorage.getItem(storageKey) as Theme) || defaultTheme
  })
 
  const applyTheme = useCallback((themeToApply: Theme) => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
 
    if (themeToApply === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
      return
    }
 
    root.classList.add(themeToApply)
  }, [])
 
  useEffect(() => {
    applyTheme(theme)
  }, [theme, applyTheme])
 
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system')
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, applyTheme])
 
  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      if (typeof window !== 'undefined') {
        if (newTheme === 'system') {
          localStorage.removeItem(storageKey)
        } else {
          localStorage.setItem(storageKey, newTheme)
        }
      }
      setTheme(newTheme)
    },
  }
 
  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
 
export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
 
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
 
  return context
}
