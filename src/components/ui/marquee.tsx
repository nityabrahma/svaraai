
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: ReactNode;
  [key: string]: any;
}

const Marquee = ({
  className,
  reverse,
  pauseOnHover,
  children,
  ...props
}: MarqueeProps) => {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full overflow-hidden [--duration:40s] [--gap:1rem]",
        className
      )}
    >
      <div
        className={cn("flex w-max animate-marquee items-stretch gap-[--gap]", {
          "[animation-direction:reverse]": reverse,
          "hover:[animation-play-state:paused]": pauseOnHover,
        })}
      >
        {children}
        {children}
      </div>
    </div>
  );
};

export default Marquee;
