import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import BackgroundDecorations from '@/components/background-decorations';


export const metadata: Metadata = {
  title: 'LeadPilot AI',
  description: 'High-quality, actionable leads to clients on a freemium subscription model.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
         <ThemeProvider
            storageKey="vite-ui-theme"
        >
            <BackgroundDecorations />
            {children}
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
