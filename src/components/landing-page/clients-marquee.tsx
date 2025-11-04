
import Marquee from "@/components/ui/marquee";

export default function ClientsMarquee() {
    const marqueeItems = ["DIGITAL AGENCIES", "SALES AUTOMATION", "ENTERPRISE RESELLERS", "SAAS ENTREPRENEURS"];
    return (
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
    );
}
