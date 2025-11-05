
'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import { cn } from '@/lib/utils'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Skeleton className="h-10 w-[84px] rounded-full" />
  }

  return (
    <RadioGroup
      value={theme}
      onValueChange={(value: 'light' | 'dark') => setTheme(value)}
      className="flex items-center space-x-1 rounded-full border p-1 bg-background/80"
    >
      <RadioGroupItem value="light" id="light" className="sr-only" />
      <Label
        htmlFor="light"
        className={cn(
            "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-transparent transition-colors hover:bg-primary/10",
            theme === 'light' && 'bg-primary text-primary-foreground'
        )}
      >
        <Sun className="h-5 w-5" />
        <span className="sr-only">Light</span>
      </Label>

      <RadioGroupItem value="dark" id="dark" className="sr-only" />
      <Label
        htmlFor="dark"
        className={cn(
            "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-transparent transition-colors hover:bg-primary/10",
            theme === 'dark' && 'bg-primary text-primary-foreground'
        )}
      >
        <Moon className="h-5 w-5" />
        <span className="sr-only">Dark</span>
      </Label>
    </RadioGroup>
  )
}
