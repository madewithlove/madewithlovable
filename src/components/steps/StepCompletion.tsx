import { useWizard } from "@/contexts/WizardContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, SkipForward, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StepCompletion() {
  const { steps } = useWizard();
  const navigate = useNavigate();

  const completed = steps.filter((s) => s.status === "completed");
  const skipped = steps.filter((s) => s.status === "skipped");

  return (
    <div className="w-full max-w-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 flex items-center gap-3">
          <PartyPopper className="h-10 w-10 text-accent" />
          <h2 className="text-2xl font-bold text-foreground">
            congratulations, your lovable project is now de-risked!
          </h2>
        </div>

        <div className="mb-6 space-y-4">
          {completed.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-semibold text-foreground">completed steps</h3>
              <ul className="space-y-1">
                {completed.map((s) => (
                  <li key={s.id} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 text-accent" /> {s.label}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {skipped.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-semibold text-foreground">skipped steps</h3>
              <ul className="space-y-1">
                {skipped.map((s) => (
                  <li key={s.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <SkipForward className="h-4 w-4" /> {s.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <Button variant="outline" onClick={() => navigate("/")}>
          start over
        </Button>
      </motion.div>
    </div>
  );
}
