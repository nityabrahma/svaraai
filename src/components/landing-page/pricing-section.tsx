
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { allPlansInclude, pricingPlans } from "@/lib/landing-page-data";
import { CheckCircle2 } from "lucide-react";

export default function PricingSection() {
    return (
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
                <Card className="mt-8 w-full glassmorphism border">
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
    );
}
