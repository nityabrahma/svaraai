
import Link from 'next/link';
import { Bot } from 'lucide-react';
import { ThemeSwitcher } from '@/components/theme-switcher';

export default function LandingFooter() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Bot className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold font-headline">Svara</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              AI-powered lead generation to fuel your growth.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Product</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="#features" className="hover:text-primary">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="hover:text-primary">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hovertext-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Svara. All rights reserved.
          </p>
          <ThemeSwitcher />
        </div>
      </div>
    </footer>
  );
}
