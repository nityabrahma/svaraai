
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Gauge, Settings, Zap, Sparkles, Wand2, Send, Package, Megaphone, Database, Filter, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useSidebar } from '../ui/sidebar';
import { ThemeSwitcher } from '../theme-switcher';
import { ScrollArea } from '../ui/scroll-area';

const navItems = [
  { href: '/dashboard', icon: Gauge, label: 'Dashboard' },
  { href: '/ai-assistant', icon: Sparkles, label: 'AI Assistant' },
  { href: '/campaign-builder', icon: Wand2, label: 'Campaign Builder' },
  { href: '/multi-channel', icon: Send, label: 'Multi-channel' },
  { href: '/products', icon: Package, label: 'Products' },
  { href: '/campaigns', icon: Megaphone, label: 'Campaigns' },
  { href: '/leads-database', icon: Database, label: 'Leads Database' },
  { href: '/lead-generation', icon: Filter, label: 'Lead Generation' },
  { href: '/settings', icon: Settings, label: 'Settings' },
  { href: '/billing', icon: CreditCard, label: 'Billing' },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { open, isMobile } = useSidebar();
  const state = open && !isMobile ? 'expanded' : 'collapsed';

  return (
    <div className="flex h-full flex-col glassmorphism">
        <div className={cn("flex h-16 items-center border-b", state === "expanded" ? "justify-start px-4" : "justify-center")}>
            <Link href="/dashboard" className={cn("flex items-center font-semibold font-headline", state === 'expanded' && 'gap-2')}>
            <Bot className="h-6 w-6 text-primary shrink-0" />
            <span className={cn('overflow-hidden transition-all', { 'w-0': state === 'collapsed', 'w-auto': state === 'expanded' })}>LeadPilot AI</span>
            </Link>
        </div>
        <ScrollArea className="flex-1">
          <nav className="space-y-1 p-2">
              <TooltipProvider>
              {navItems.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                  <Tooltip key={item.href} delayDuration={0}>
                      <TooltipTrigger asChild>
                      <Link
                          href={item.href}
                          className={cn(
                          'flex items-center rounded-lg py-2 text-muted-foreground transition-all hover:text-primary',
                          { 
                              'justify-center': state === 'collapsed',
                              'justify-start px-3 gap-3': state === 'expanded',
                          },
                          isActive && 'bg-muted text-primary'
                          )}
                      >
                          <item.icon className="h-5 w-5 shrink-0" />
                          <span className={cn('overflow-hidden transition-all', { 'w-0': state === 'collapsed', 'w-auto': state === 'expanded' })}>{item.label}</span>
                      </Link>
                      </TooltipTrigger>
                      {(state === 'collapsed' || isMobile) && (
                          <TooltipContent side="right">
                          <p>{item.label}</p>
                          </TooltipContent>
                      )}
                  </Tooltip>
                  );
              })}
              </TooltipProvider>
          </nav>
        </ScrollArea>
        <div className="mt-auto flex flex-col items-center gap-2 p-4">
            {(state === 'expanded' || isMobile) && <ThemeSwitcher />}
        </div>
    </div>
  );
}
