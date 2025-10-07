
'use client';

import Header from '@/components/layout/header';
import { useState, useEffect } from 'react';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/app-sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Default to open on desktop, closed on mobile
    if (typeof window !== 'undefined') {
        setSidebarOpen(!isMobile);
    }
  }, [isMobile]);

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <Sidebar>
          <AppSidebar />
      </Sidebar>
      <SidebarInset>
          <div className="flex flex-col min-h-screen">
              <Header onToggleSidebar={() => setSidebarOpen(prev => !prev)} />
              <main className="flex-1 p-4 sm:p-6 lg:p-8">
                  {children}
              </main>
          </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
