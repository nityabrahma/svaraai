
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const partners = [
    { name: "CB Engineering works", logo: "/cbeng-logo.png", className: "rotate-2" },
    { name: "LeoSphere Global", className: "-rotate-3" },
    { name: "McKH Technologies", logo: "/McKH-logo.png", className: "rotate-1" },
];

export default function PartnersSection() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Partners Who Trusted Us</h2>
                    <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                        We are proud to collaborate with innovative companies across various sectors.
                    </p>
                </div>
                <div className="relative flex flex-wrap justify-center items-center gap-8 max-w-4xl mx-auto">
                    {partners.map((partner, index) => (
                         <Card key={index} className={cn(
                            "p-6 w-64 h-32 flex items-center justify-center text-center font-headline text-xl glassmorphism transform transition-transform duration-300 hover:scale-105 hover:shadow-primary/20",
                            partner.className
                         )}>
                            {partner.logo ? (
                                <Image
                                    src={partner.logo}
                                    alt={`${partner.name} logo`}
                                    width={180}
                                    height={80}
                                    className="object-contain rounded-lg"
                                />
                            ) : (
                                partner.name
                            )}
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
