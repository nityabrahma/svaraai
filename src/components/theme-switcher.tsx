'use client'

import { Laptop, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

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
    return <Skeleton className="h-10 w-[114px] rounded-full" />
  }

  return (
    <RadioGroup
      value={theme}
      onValueChange={setTheme}
      className="flex items-center space-x-1 rounded-full border p-1"
    >
      <RadioGroupItem value="light" id="light" className="sr-only" />
      <Label
        htmlFor="light"
        className={cn(
            "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-transparent transition-colors hover:bg-accent/50",
            theme === 'light' && 'bg-accent'
        )}
      >
        <Sun className="h-5 w-5" />
        <span className="sr-only">Light</span>
      </Label>

      <RadioGroupItem value="dark" id="dark" className="sr-only" />
      <Label
        htmlFor="dark"
        className={cn(
            "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-transparent transition-colors hover:bg-accent/50",
            theme === 'dark' && 'bg-accent'
        )}
      >
        <Moon className="h-5 w-5" />
        <span className="sr-only">Dark</span>
      </Label>

      <RadioGroupItem value="system" id="system" className="sr-only" />
      <Label
        htmlFor="system"
        className={cn(
            "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-transparent transition-colors hover:bg-accent/50",
            theme === 'system' && 'bg-accent'
        )}
      >
        <Laptop className="h-5 w-5" />
        <span className="sr-only">System</span>
      </Label>
    </RadioGroup>
  )
}
