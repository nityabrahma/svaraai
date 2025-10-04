"use client"

import * as React from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

type SidebarContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
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
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  defaultOpen = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}) {
  const isMobile = useIsMobile();
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

  const open = controlledOpen ?? internalOpen;
  const setOpen = setControlledOpen ?? setInternalOpen;
  
  const value = React.useMemo(() => ({ open, setOpen, isMobile }), [open, setOpen, isMobile]);

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
  const { open, setOpen, isMobile } = useSidebar();
  const state = open && !isMobile ? 'expanded' : 'collapsed';

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-[300px] p-0">
          <div ref={ref} className={cn("h-full", className)} {...props} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      ref={ref}
      data-state={state}
      className={cn(
        "hidden md:flex flex-col transition-all duration-300 ease-in-out",
        {
          "w-64": state === 'expanded',
          "w-16": state === 'collapsed',
        },
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
    const state = open && !isMobile ? 'expanded' : 'collapsed';
  
    return (
        <div
        ref={ref}
        className={cn(
            "transition-all duration-300 ease-in-out",
            {
                "md:ml-64": state === 'expanded',
                "md:ml-16": state === 'collapsed',
            },
            className
        )}
        {...props}
        />
  );
});
SidebarInset.displayName = "SidebarInset";
