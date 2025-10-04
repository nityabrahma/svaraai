'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Gauge, Search, Settings, Webhook, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const navItems = [
  { href: '/dashboard', icon: Gauge, label: 'Dashboard' },
  { href: '/leads', icon: Search, label: 'Leads' },
  { href: '/scraping', icon: Zap, label: 'Scraping' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex h-full flex-col border-r bg-card">
      <div className="flex h-16 items-center justify-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold font-headline">
          <Bot className="h-6 w-6 text-primary" />
          <span>LeadPilot AI</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        <TooltipProvider>
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                      isActive && 'bg-muted text-primary'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>
    </aside>
  );
}
