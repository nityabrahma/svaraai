
import Image from "next/image";
import { cn } from "@/lib/utils";

const partners = [
    { name: "CB Engineering works", logo: "/cbeng-logo.png", width: 180, height: 80, className: "rotate-6" },
    { name: "LeoSphere Global", logo: "/leoSphere-global.png", width: 200, height: 60, className: "-rotate-3" },
    { name: "McKH Technologies", logo: "/McKH-logo.png", width: 160, height: 90, className: "rotate-2" },
];

export default function PartnersSection() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Partners Who Trusted Us</h2>
                    <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                        We are proud to collaborate with innovative companies across various sectors.
                    </p>
                </div>
                <div className="relative flex flex-wrap justify-center items-center gap-x-12 gap-y-8 lg:gap-x-24 max-w-4xl mx-auto">
                    {partners.map((partner) => (
                         <div key={partner.name} className={cn(
                            "transform transition-transform duration-300 hover:scale-110 hover:z-10",
                            partner.className
                         )}>
                            <Image
                                src={partner.logo}
                                alt={`${partner.name} logo`}
                                width={partner.width}
                                height={partner.height}
                                className="object-contain rounded-lg drop-shadow-2xl"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
