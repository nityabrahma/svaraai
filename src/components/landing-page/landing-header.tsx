
import Link from 'next/link';
import { Bot, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b glassmorphism">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold font-headline">Svara</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Pipeline
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Customers
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Start Free Trial</Link>
            </Button>
          </div>
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-screen max-w-[calc(100vw-2rem)] sm:max-w-xs"
                align="end"
              >
                <DropdownMenuItem asChild>
                  <Link href="#features">Features</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#pricing">Pricing</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#">Pipeline</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#testimonials">Customers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Log In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Start Free Trial</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
