
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, Check, CheckCircle2, Menu, Cpu, Rocket, Target, Users, BookUser, FileText, Send, Sparkles, DatabaseZap, Building2, Combine, Palette, Star, ShieldCheck, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { features, testimonials, pricingPlans, allPlansInclude } from '@/lib/landing-page-data';
import Marquee from '@/components/ui/marquee';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';


export default function Home() {
  const marqueeItems = ["DIGITAL AGENCIES", "SALES AUTOMATION", "ENTERPRISE RESELLERS", "SAAS ENTREPRENEURS"];

  const fourSteps = [
    {
        step: "Step 1",
        icon: BookUser,
        title: "Add Products",
        heading: "Define Your Products & Services",
        description: "Simply add your products or services to the platform. Svara's AI will understand your value proposition and create targeted messaging for each offering.",
        points: [
            "Product catalog with AI-powered descriptions",
            "Automatic value proposition generation",
            "Target market identification",
            "Competitive positioning analysis",
        ],
        cta: "Add Your Products",
        visual: {
            title: "Product Setup Dashboard",
            items: [
                { name: "AI Sales Automation", status: "Active" },
                { name: "Lead Generation Service", status: "Active" },
                { name: "White-Label Platform", status: "Draft" },
            ]
        }
    },
    {
        step: "Step 2",
        icon: Users,
        title: "Create Campaigns",
        heading: "Access 70M+ Business Records & 45M+ LinkedIn Profiles",
        description: "Tap into Svara's massive proprietary database. No external data costs. No outdated lists. Just verified, enriched leads ready for outreach.",
        points: [
            "70M+ US business records with verified contacts",
            "45M+ LinkedIn profiles with engagement data",
            "Real-time data updates and verification",
            "Advanced filtering by industry, size, tech stack",
        ],
        cta: "Browse Database",
        visual: {
            title: "Massive Data Pool",
            items: [
                { name: "US Business Records", value: "70M+" },
                { name: "LinkedIn Profiles", value: "45M+" },
                { name: "Verified Emails", value: "95%+" },
                { name: "Data Freshness", value: "Real-time" },
            ]
        }
    },
    {
        step: "Step 3",
        icon: Sparkles,
        title: "AI Generates Sequences",
        heading: "AI-Powered Campaign Builder",
        description: "Our AI automatically generates personalized email and SMS sequences for each campaign. Human editing supported for review and adjustments.",
        points: [
            "AI-generated personalized sequences (email/SMS)",
            "Human editing and approval workflow",
            "Multi-channel outreach automation",
            "A/B testing and optimization",
        ],
        cta: "Generate Sequences",
        visual: {
            title: "AI Campaign Builder",
            items: [
                { name: "Email Sequence", status: "Generated", description: "5 emails, personalized for SaaS prospects" },
                { name: "SMS Follow-up", status: "Ready", description: "3 SMS messages, trigger-based" },
                { name: "LinkedIn Outreach", status: "Draft", description: "Connection requests + follow-ups" },
            ]
        }
    },
    {
        step: "Step 4",
        icon: Send,
        title: "Launch Outreach",
        heading: "Full Automation Pipeline",
        description: "From lead identification to sequence generation to email/SMS outreach - everything runs automatically. The platform handles everything else.",
        points: [
            "Automated lead identification and scoring",
            "Multi-channel outreach execution",
            "Smart follow-up automation",
            "Real-time performance tracking",
        ],
        cta: "Launch Campaign",
        visual: {
            title: "Campaign Performance",
            items: [
                { name: "Emails Sent", value: "2,847" },
                { name: "Open Rate", value: "24.3%" },
                { name: "Reply Rate", value: "8.7%" },
                { name: "Meetings Booked", value: "47" },
            ]
        }
    },
  ]

    const differentItems = [
        {
            icon: DatabaseZap,
            title: "Owned Data (70M+ Records)",
            description: "Eliminates ongoing data costs. No external subscriptions needed."
        },
        {
            icon: Building2,
            title: "Multi-Tenant SaaS Architecture",
            description: "Launch your own SaaS company instantly with built-in user management."
        },
        {
            icon: Combine,
            title: "AI + Human Control",
            description: "AI generates sequences, humans can edit and approve. Perfect balance."
        },
        {
            icon: Palette,
            title: "White-Label Ready",
            description: "Custom branding, domain, and user role management included."
        }
    ];

    const roiItems = [
        {
            metric: "2-5x",
            description: "Faster campaign deployment vs manual setup"
        },
        {
            metric: "10x",
            description: "Higher response rates via AI personalization"
        },
        {
            metric: "20-40x",
            description: "ROI within first 90 days of implementation"
        },
        {
            metric: "$30K-$50K",
            description: "Development cost saved vs building from scratch"
        }
    ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b glassmorphism">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
                <Bot className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold font-headline">Svara</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
                <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
                <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
                <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">Pipeline</Link>
                <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Customers</Link>
            </div>
            <div className="hidden md:flex items-center gap-4">
                <Button variant="ghost" asChild>
                    <Link href="/dashboard">Log In</Link>
                </Button>
                <Button asChild>
                    <Link href="/dashboard">
                    Start Free Trial
                    </Link>
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
                    <DropdownMenuContent className="w-screen max-w-[calc(100vw-2rem)] sm:max-w-xs" align="end">
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

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
          <div className="mx-auto bg-primary/10 text-primary px-4 py-1.5 rounded-full w-fit mb-4">
            <span className="font-semibold">🚀 Turnkey AI Sales Automation Platform</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter mb-6">
            Launch Your Own AI Sales SaaS in 4 Simple Steps
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            From 70M+ business records to AI-generated sequences to white-label deployment - Svara is the complete sales automation platform that transforms your outreach with intelligent AI automation.
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
        
        <div className="relative py-12">
            <Marquee pauseOnHover className="[--duration:30s]">
                {marqueeItems.map((item) => (
                    <div key={item} className="px-6 py-2 mx-2 text-muted-foreground bg-muted/50 rounded-full border">
                        {item}
                    </div>
                ))}
            </Marquee>
             <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent"></div>
        </div>

        <section id="features" className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold">Why Choose Svara AI?</h2>
                    <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Transform your sales process with intelligent automation and comprehensive lead management.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <Card key={feature.title} className="glassmorphism hover:shadow-primary/20 transition-shadow duration-300 border">
                            <CardHeader className="items-center text-center">
                                <div className="p-3 rounded-full mb-4 w-fit bg-primary/10">
                                    <feature.icon className="w-8 h-8 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-muted-foreground">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
        
        <section id="system" className="py-20 bg-card/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold">The 4-Step Svara System</h2>
                    <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Enterprise-grade AI automation in a simple process that anyone can master. From product setup to campaign launch - everything is automated.</p>
                </div>
                <div className="space-y-24">
                   {fourSteps.map((step, index) => (
                        <div key={step.title} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'lg:grid-flow-row-dense' : ''}`}>
                            <div className={`space-y-6 ${index % 2 !== 0 ? 'lg:col-start-2' : ''}`}>
                                <Badge variant="outline" className="text-primary border-primary py-1 px-3">{`${step.step}: ${step.title}`}</Badge>
                                <h3 className="text-2xl md:text-3xl font-headline font-bold">{step.heading}</h3>
                                <p className="text-muted-foreground">{step.description}</p>
                                <ul className="space-y-3">
                                    {step.points.map(point => (
                                        <li key={point} className="flex items-start">
                                            <CheckCircle2 className="w-5 h-5 mr-3 mt-1 text-accent shrink-0"/>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Button size="lg">
                                    {step.cta} <ArrowRight className="ml-2" />
                                </Button>
                            </div>
                            <div className={`relative ${index % 2 !== 0 ? 'lg:col-start-1' : ''}`}>
                                <Card className="p-6 bg-background shadow-2xl border">
                                    <CardHeader className="p-0 pb-4">
                                        <CardTitle className="text-lg font-semibold flex items-center gap-2"><step.icon className="w-5 h-5 text-primary"/>{step.visual.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="bg-muted/50 p-4 rounded-lg space-y-4">
                                            {step.visual.items.map((item, itemIndex) => (
                                                <div key={itemIndex}>
                                                  {item.value ? (
                                                    <div className="flex justify-between items-center bg-background p-3 rounded-md">
                                                        <span className="text-sm text-muted-foreground">{item.name}</span>
                                                        <span className="text-sm font-semibold">{item.value}</span>
                                                    </div>
                                                  ) : (
                                                    <div className="bg-background p-3 rounded-md">
                                                      <div className="flex justify-between items-center">
                                                          <span className="text-sm font-medium">{item.name}</span>
                                                          <Badge variant={item.status === 'Active' || item.status === 'Generated' || item.status === 'Ready' ? 'default' : 'secondary'}
                                                            className={cn(
                                                                {'bg-green-500/20 text-green-500': item.status === 'Active' || item.status === 'Generated' || item.status === 'Ready'},
                                                                {'bg-amber-500/20 text-amber-500': item.status === 'Draft'},
                                                            )}>
                                                            {item.status}
                                                          </Badge>
                                                      </div>
                                                      {item.description && <p className="text-xs text-muted-foreground mt-1">{item.description}</p>}
                                                  </div>
                                                  )}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                   ))}
                </div>
            </div>
        </section>

        <section id="stand-out" className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold">Why Svara Stands Out</h2>
                    <p className="text-lg text-muted-foreground mt-2">Most sales tools are either too complex (requiring heavy training) or too basic (no real AI automation). Svara bridges this gap with enterprise-grade features in a simple 4-step process.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                     <Card className="glassmorphism border">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">What Makes Svara Different</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {differentItems.map(item => (
                                <div key={item.title} className="flex items-start gap-4">
                                    <item.icon className="w-8 h-8 text-primary shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-lg">{item.title}</h4>
                                        <p className="text-muted-foreground">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                     <Card className="glassmorphism border flex flex-col">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">ROI &amp; Results</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col justify-between flex-grow gap-4">
                             {roiItems.map((item, index) => (
                                <div key={item.metric} className="text-center bg-muted/50 p-4 rounded-lg">
                                    <p className="text-3xl lg:text-4xl font-bold text-primary">{item.metric}</p>
                                    <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
        
        <section id="testimonials" className="py-20 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold">Loved by Sales Teams Worldwide</h2>
                    <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Don't just take our word for it. Here's what our customers are saying.</p>
                </div>
                <div className="relative">
                    <Marquee pauseOnHover className="[--duration:30s]">
                        {testimonials.map((testimonial, index) => (
                             <Card key={`${testimonial.name}-${index}`} className="flex flex-col w-[350px] mx-4 h-full glassmorphism border">
                                <CardContent className="pt-6">
                                    <p className="italic">"{testimonial.testimonial}"</p>
                                </CardContent>
                                 <CardFooter className="mt-auto">
                                    <Avatar>
                                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4">
                                        <p className="font-semibold">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </Marquee>
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent"></div>
                </div>
            </div>
        </section>
        
        <section id="pricing" className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold">Choose Your Plan</h2>
                    <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Start with our free trial and scale as you grow. All plans include our complete AI automation platform.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
                    {pricingPlans.map(plan => (
                        <Card key={plan.title} className={cn('flex flex-col h-full glassmorphism border', {'border-primary ring-2 ring-primary shadow-lg': plan.isPopular})}>
                            <CardHeader className="text-center">
                                {plan.isPopular && <div className="text-sm font-bold text-primary uppercase">Most Popular</div>}
                                <CardTitle className="font-headline text-2xl">{plan.title}</CardTitle>
                                <div className="text-4xl font-bold text-primary pt-4">
                                    {plan.price}
                                    {plan.price !== 'Custom' && <span className="text-lg font-normal text-muted-foreground">/month</span>}
                                </div>
                                <Badge variant="secondary" className="w-fit mx-auto">{plan.leads}</Badge>
                                <CardDescription className="pt-4">{plan.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <ul className="space-y-3">
                                    {plan.features.map((feature, index) => (
                                         <li key={index} className="flex items-start">
                                            <CheckCircle2 className="w-5 h-5 mr-2 mt-1 text-accent shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button variant={plan.isPopular ? 'default' : 'outline'} className="w-full" asChild>
                                    <Link href="/dashboard">Start Free Trial</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                    
                </div>
                <Card className="mt-8 lg:col-span-1 md:col-span-2 w-full glassmorphism border">
                     <CardHeader className="text-center">
                         <CardTitle className="font-headline text-2xl">All Plans Include</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {allPlansInclude.map((item, index) => (
                                <div key={index} className="flex flex-col items-center text-center">
                                    <item.icon className="w-8 h-8 text-primary mb-2" />
                                    <h4 className="font-semibold text-lg">{item.title}</h4>
                                    <p className="text-muted-foreground text-sm">{item.description}</p>
                                </div>
                            ))}
                         </div>
                     </CardContent>
                     <CardFooter className="flex-col gap-2 pt-6">
                         <p className="text-sm text-muted-foreground">Start with any plan and upgrade anytime. Cancel or downgrade without penalties.</p>
                     </CardFooter>
                </Card>
            </div>
        </section>

        <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center glassmorphism rounded-lg py-12 max-w-4xl border">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">Start Your Free Trial Today</h2>
                <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Join thousands of successful sales professionals and agencies transforming their outreach with Svara's AI automation platform.</p>
                <form className="mt-8 max-w-lg mx-auto">
                    <div className="flex flex-col gap-4">
                        <Input type="text" placeholder="Your Name" className="text-left bg-transparent border-input" />
                        <Input type="email" placeholder="your@email.com" className="text-left bg-transparent border-input" />
                        <Textarea placeholder="Your message..." className="text-left bg-transparent border-input" />
                        <Button size="lg" type="submit" className="w-full">
                           Start Free Trial
                        </Button>
                    </div>
                </form>
            </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                    <Link href="/" className="flex items-center gap-2">
                        <Bot className="w-8 h-8 text-primary" />
                        <span className="text-xl font-bold font-headline">Svara</span>
                    </Link>
                    <p className="text-muted-foreground text-sm max-w-xs">AI-powered lead generation to fuel your growth.</p>
                </div>
                <div className="space-y-2">
                    <h4 className="font-semibold">Product</h4>
                    <ul className="space-y-2 text-muted-foreground">
                        <li><Link href="#features" className="hover:text-primary">Features</Link></li>
                        <li><Link href="#pricing" className="hover:text-primary">Pricing</Link></li>
                        <li><Link href="#testimonials" className="hover:text-primary">Testimonials</Link></li>
                    </ul>
                </div>
                 <div className="space-y-2">
                    <h4 className="font-semibold">Company</h4>
                    <ul className="space-y-2 text-muted-foreground">
                        <li><Link href="#" className="hover:text-primary">About Us</Link></li>
                        <li><Link href="#" className="hover:text-primary">Careers</Link></li>
                        <li><Link href="#" className="hover:text-primary">Contact</Link></li>
                    </ul>
                </div>
                 <div className="space-y-2">
                    <h4 className="font-semibold">Legal</h4>
                    <ul className="space-y-2 text-muted-foreground">
                        <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
                        <li><Link href="#" className="hovertext-primary">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>
             <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
                 <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Svara. All rights reserved.</p>
                 <ThemeSwitcher />
             </div>
        </div>
      </footer>
    </div>
  );
}
