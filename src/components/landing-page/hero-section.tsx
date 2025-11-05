
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
          <div className="mx-auto bg-primary/10 text-primary px-4 py-1.5 rounded-full w-fit mb-4">
            <span className="font-semibold">🚀 Turnkey AI Sales Automation Platform</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter mb-6">
            Launch Your Own AI Sales SaaS in 4 Simple Steps
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            From 70M+ business records to AI-generated sequences to white-label deployment - SVARAAI.LTD is the complete sales automation platform that transforms your outreach with intelligent AI automation.
          </p>
          <Button size="lg" asChild>
            <Link href="/dashboard">
              Start Free Trial <ArrowRight className="ml-2" />
            </Link>
          </Button>
           <p className="text-sm text-muted-foreground mt-4">
              Multi-tenant ready • White-label included • 70M+ business records
            </p>
        </section>
    );
}
