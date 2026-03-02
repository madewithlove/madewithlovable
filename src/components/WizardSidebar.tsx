import { useWizard, StepStatus } from "@/contexts/WizardContext";
import { Check, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

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

export function WizardSidebar() {
  const { steps, currentStep } = useWizard();

  return (
    <aside className="w-64 shrink-0 bg-sidebar p-6 text-sidebar-foreground min-h-screen">
      <img src={logo} alt="madewithlovable" className="mb-8 h-8" />
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
    </aside>
  );
}
