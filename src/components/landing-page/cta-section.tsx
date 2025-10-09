
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CtaSection() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center glassmorphism rounded-lg py-12 max-w-4xl border">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">Start Your Free Trial Today</h2>
                <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Join thousands of successful sales professionals and agencies transforming their outreach with Svara's AI automation platform.</p>
                <form className="mt-8 max-w-lg mx-auto border p-6 rounded-lg bg-transparent">
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
    );
}
