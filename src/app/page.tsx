import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { features, testimonials, pricingPlans } from '@/lib/landing-page-data';
import Marquee from '@/components/ui/marquee';


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b glassmorphism">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
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
                    Get Started <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </div>
            </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
          <div className="mx-auto bg-primary/10 text-primary px-4 py-1.5 rounded-full w-fit mb-4">
            <span className="font-semibold">The Future of Lead Generation is Here</span>
          </div>
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

        <section id="features" className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold">Why Choose LeadPilot AI?</h2>
                    <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Our platform is designed to streamline your entire lead generation workflow.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <Card key={feature.title} className="glassmorphism hover:shadow-primary/20 transition-shadow duration-300">
                            <CardHeader className="items-center text-center">
                                <div className="p-3 rounded-full mb-4 w-fit bg-primary/10">
                                    <feature.icon className="w-8 h-8 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
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
        
        <section id="testimonials" className="py-20 bg-card overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold">Loved by Sales Teams Worldwide</h2>
                    <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Don't just take our word for it. Here's what our customers are saying.</p>
                </div>
                <div className="relative">
                    <Marquee pauseOnHover className="[--duration:60s]">
                        {testimonials.map((testimonial, index) => (
                             <Card key={`${testimonial.name}-${index}`} className="flex flex-col w-[350px] mx-4 h-full glassmorphism">
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
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-card to-transparent"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-card to-transparent"></div>
                </div>
            </div>
        </section>
        
        <section id="pricing" className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold">Simple, Transparent Pricing</h2>
                    <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Choose the plan that's right for your team.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {pricingPlans.map(plan => (
                        <Card key={plan.title} className={`glassmorphism ${plan.isPopular ? 'border-primary shadow-primary/20' : ''}`}>
                            <CardHeader>
                                {plan.isPopular ? (
                                     <div className="flex justify-between items-center">
                                        <CardTitle className="font-headline text-primary">{plan.title}</CardTitle>
                                        <div className="px-3 py-1 text-sm text-primary-foreground bg-primary rounded-full">Most Popular</div>
                                    </div>
                                ) : (
                                    <CardTitle className="font-headline">{plan.title}</CardTitle>
                                )}
                                <CardDescription>{plan.description}</CardDescription>
                                <div className="text-4xl font-bold pt-4">
                                    {plan.price}
                                    {plan.price !== 'Custom' && <span className="text-lg font-normal text-muted-foreground">/month</span>}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <ul className="space-y-2">
                                    {plan.features.map((feature, index) => (
                                         <li key={index} className="flex items-center">
                                            <CheckCircle2 className={`w-5 h-5 mr-2 ${plan.isPopular ? 'text-primary' : 'text-accent'}`} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button variant={plan.isPopular ? 'default' : 'outline'} className="w-full" asChild>
                                    <Link href={plan.cta.href}>{plan.cta.text}</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        <section className="py-20 bg-card">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                 <h2 className="text-3xl md:text-4xl font-headline font-bold">Ready to Supercharge Your Sales?</h2>
                 <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Join hundreds of companies finding their next customer with LeadPilot AI.</p>
                 <Button size="lg" asChild className="mt-8">
                    <Link href="/signup">
                    Sign Up for Free <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </div>
        </section>

      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                    <Link href="/" className="flex items-center gap-2">
                        <Bot className="w-8 h-8 text-primary" />
                        <span className="text-xl font-bold font-headline">LeadPilot AI</span>
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
                        <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>
             <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
                 <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} LeadPilot AI. All rights reserved.</p>
                 <ThemeSwitcher />
             </div>
        </div>
      </footer>
    </div>
  );
}
