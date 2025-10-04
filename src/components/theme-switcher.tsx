'use client'

import { Laptop, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'

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
      <RadioGroupItem value="light" id="light" className="peer sr-only" />
      <Label
        htmlFor="light"
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-transparent transition-colors hover:bg-accent/50 [&:has([data-state=checked])]:bg-accent"
      >
        <Sun className="h-5 w-5" />
        <span className="sr-only">Light</span>
      </Label>

      <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
      <Label
        htmlFor="dark"
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-transparent transition-colors hover:bg-accent/50 [&:has([data-state=checked])]:bg-accent"
      >
        <Moon className="h-5 w-5" />
        <span className="sr-only">Dark</span>
      </Label>

      <RadioGroupItem value="system" id="system" className="peer sr-only" />
      <Label
        htmlFor="system"
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-transparent transition-colors hover:bg-accent/50 [&:has([data-state=checked])]:bg-accent"
      >
        <Laptop className="h-5 w-5" />
        <span className="sr-only">System</span>
      </Label>
    </RadioGroup>
  )
}
