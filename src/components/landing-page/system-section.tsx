
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, BookUser, CheckCircle2, Send, Sparkles, Users } from "lucide-react";

export default function SystemSection() {
     const fourSteps = [
        {
            step: "Step 1",
            icon: BookUser,
            title: "Add Products",
            heading: "Define Your Products & Services",
            description: "Simply add your products or services to the platform. SVARAAI.LTD's AI will understand your value proposition and create targeted messaging for each offering.",
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
            description: "Tap into SVARAAI.LTD's massive proprietary database. No external data costs. No outdated lists. Just verified, enriched leads ready for outreach.",
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
    ];

    return (
        <section id="system" className="py-20 bg-card/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold">The 4-Step SVARAAI.LTD System</h2>
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
    );
}
