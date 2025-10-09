
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Combine, DatabaseZap, Palette } from "lucide-react";

export default function StandOutSection() {
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
    );
}
