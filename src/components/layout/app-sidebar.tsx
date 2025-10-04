'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Gauge, Search, Settings, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useSidebar } from '../ui/sidebar';
import { ThemeSwitcher } from '../theme-switcher';

const navItems = [
  { href: '/dashboard', icon: Gauge, label: 'Dashboard' },
  { href: '/leads', icon: Search, label: 'Leads' },
  { href: '/scraping', icon: Zap, label: 'Scraping' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <div className="flex h-full flex-col glassmorphism">
        <div className={cn("flex h-16 items-center border-b px-4", state === "expanded" ? "justify-start" : "justify-center")}>
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold font-headline">
            <Bot className="h-6 w-6 text-primary shrink-0" />
            <span className={cn('overflow-hidden transition-all', { 'w-0': state === 'collapsed', 'w-auto': state === 'expanded' })}>LeadPilot AI</span>
            </Link>
        </div>
        <nav className="flex-1 space-y-1 p-2">
            <TooltipProvider>
            {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                <Tooltip key={item.href} delayDuration={0}>
                    <TooltipTrigger asChild>
                    <Link
                        href={item.href}
                        className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                        { 'justify-center': state === 'collapsed'},
                        isActive && 'bg-muted text-primary'
                        )}
                    >
                        <item.icon className="h-5 w-5 shrink-0" />
                        <span className={cn('overflow-hidden transition-all', { 'w-0': state === 'collapsed', 'w-auto': state === 'expanded' })}>{item.label}</span>
                    </Link>
                    </TooltipTrigger>
                    {state === 'collapsed' && (
                        <TooltipContent side="right">
                        <p>{item.label}</p>
                        </TooltipContent>
                    )}
                </Tooltip>
                );
            })}
            </TooltipProvider>
        </nav>
        <div className="mt-auto flex flex-col items-center gap-2 p-4">
            {state === 'expanded' && <ThemeSwitcher />}
        </div>
    </div>
  );
}
