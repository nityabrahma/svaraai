
'use client'
 
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
 
type Theme = 'dark' | 'light'
 
type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}
 
const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)
 
export function ThemeProvider({
  children,
  defaultTheme = 'light',
}: {
  children: React.ReactNode
  defaultTheme?: Theme
}) {
  const storageKey = 'vite-ui-theme';

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return defaultTheme
    }
    const storedTheme = localStorage.getItem(storageKey) as Theme | null;
    if (storedTheme) {
        return storedTheme;
    }
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return systemTheme;
  })
 
  const applyTheme = useCallback((themeToApply: Theme) => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(themeToApply)
  }, [])
 
  useEffect(() => {
    applyTheme(theme)
  }, [theme, applyTheme])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      if (typeof window !== 'undefined') {
          localStorage.setItem(storageKey, newTheme)
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
