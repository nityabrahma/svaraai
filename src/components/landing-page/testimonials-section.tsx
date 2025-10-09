
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Marquee from "@/components/ui/marquee";
import { testimonials } from "@/lib/landing-page-data";

export default function TestimonialsSection() {
    return (
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
    );
}
