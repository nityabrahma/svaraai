import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, Search, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold font-headline">LeadPilot AI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
                <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
                <Link href="/signup">
                Sign Up <ArrowRight className="ml-2" />
                </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter mb-6">
            Generate High-Quality Leads with AI
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            LeadPilot AI scrapes, enriches, and validates company and contact data, delivering actionable leads so you can focus on closing deals.
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">
              Get Started for Free <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </section>

        <section className="bg-card py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-headline font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 w-fit">
                    <Search className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-2xl">1. Automated Scraping</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our platform automatically scrapes company and contact data from millions of public sources.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-accent/10 p-3 rounded-full mb-4 w-fit">
                    <Zap className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="font-headline text-2xl">2. AI Enrichment & Validation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Generative AI enriches and validates every lead, providing you with up-to-date, accurate information.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4 w-fit">
                    <Bot className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-2xl">3. Intelligent Scoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Leads are automatically scored for quality, so you can prioritize the most promising opportunities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} LeadPilot AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
