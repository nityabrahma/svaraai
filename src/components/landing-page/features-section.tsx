
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { features } from "@/lib/landing-page-data";

export default function FeaturesSection() {
    return (
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
    );
}
