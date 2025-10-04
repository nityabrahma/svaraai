
"use client"

import * as React from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

type SidebarContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isMobile: boolean;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

export function SidebarProvider({
  children,
  open,
  onOpenChange,
}: {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const value = React.useMemo(() => ({ open, onOpenChange, isMobile }), [open, onOpenChange, isMobile]);

  return (
    <SidebarContext.Provider value={value}>
        {children}
    </SidebarContext.Provider>
  );
}

export const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { open, onOpenChange, isMobile } = useSidebar();

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="w-[300px] p-0 border-r-0">
          <div ref={ref} className={cn("h-full", className)} {...props} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "hidden md:fixed md:top-0 md:left-0 md:h-full md:flex-col md:transition-all md:duration-300 md:ease-in-out z-40",
        open ? "md:w-64" : "md:w-16",
        className
      )}
      {...props}
    />
  );
});
Sidebar.displayName = "Sidebar";


export const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const { open, isMobile } = useSidebar();
  
    return (
        <div
        ref={ref}
        className={cn(
            "transition-all duration-300 ease-in-out",
            !isMobile && (open ? "md:ml-64" : "md:ml-16"),
            className
        )}
        {...props}
        />
  );
});
SidebarInset.displayName = "SidebarInset";
