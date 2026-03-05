import { useWizard, StepStatus } from "@/contexts/WizardContext";
import { Check, SkipForward, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

function StepIndicator({ status, number }: { status: StepStatus; number: number }) {
  if (status === "completed") {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <Check className="h-4 w-4" />
      </div>
    );
  }
  if (status === "skipped") {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-foreground/50">
        <SkipForward className="h-4 w-4" />
      </div>
    );
  }
  if (status === "current") {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-sm">
        {number}
      </div>
    );
  }
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-sidebar-foreground/20 text-sidebar-foreground/40 text-sm">
      {number}
    </div>
  );
}

function SidebarNav() {
  const { steps } = useWizard();

  return (
    <nav className="space-y-1">
      {steps.map((step) => (
        <div
          key={step.id}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
            step.status === "current" && "bg-sidebar-accent"
          )}
        >
          <StepIndicator status={step.status} number={step.id} />
          <span className={cn(
            step.status === "current" && "font-medium",
            step.status === "pending" && "text-sidebar-foreground/50"
          )}>
            {step.label}
          </span>
        </div>
      ))}
    </nav>
  );
}

export function WizardSidebar() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  if (isMobile) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center gap-3 bg-sidebar p-3 text-sidebar-foreground border-b border-sidebar-border">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-sidebar-foreground">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-sidebar p-6 text-sidebar-foreground">
            <Link to="/"><img src={logo} alt="madewithlovable" className="mb-8 w-full" /></Link>
            <SidebarNav />
          </SheetContent>
        </Sheet>
        <Link to="/"><img src={logo} alt="madewithlovable" className="h-6" /></Link>
      </div>
    );
  }

  return (
    <aside className="w-64 shrink-0 bg-sidebar p-6 text-sidebar-foreground min-h-screen">
      <Link to="/"><img src={logo} alt="madewithlovable" className="mb-8 w-full" /></Link>
      <SidebarNav />
    </aside>
  );
}
