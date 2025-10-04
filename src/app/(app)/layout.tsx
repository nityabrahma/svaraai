import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { ThemeProvider } from "@/components/theme-provider";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
    >
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
            <Header />
            <main className="flex-1 bg-background p-4 sm:p-6 lg:p-8">
                {children}
            </main>
        </div>
        </div>
    </ThemeProvider>
  );
}
