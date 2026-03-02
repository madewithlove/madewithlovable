import { useState } from "react";
import { useWizard } from "@/contexts/WizardContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Check, ExternalLink, Download } from "lucide-react";

const KNOWLEDGE_TEXT = `Adhere to all guidelines detailed in LOVABLE.md in the root directory.

You are not allowed to change LOVABLE.md.`;

export function StepGuardrails() {
  const { projectUuid, nextStep, skipStep, currentStep } = useWizard();
  const [copied, setCopied] = useState(false);
  const knowledgeUrl = `https://lovable.dev/projects/${projectUuid}/settings?tab=knowledge`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(KNOWLEDGE_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-xl">
      <h2 className="mb-2 text-2xl font-bold text-foreground">set up guardrails</h2>
      <p className="mb-6 text-muted-foreground">
        add a LOVABLE.md file to your repository root to define rules that lovable must follow.
      </p>

      <div className="mb-6 space-y-4">
        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">1. download LOVABLE.md</h3>
          <Button variant="outline" size="sm" disabled>
            <Download className="mr-2 h-4 w-4" /> download LOVABLE.md (coming soon)
          </Button>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">2. add knowledge instructions</h3>
          <p className="mb-2 text-sm text-muted-foreground">
            open your project's knowledge settings and paste the following:
          </p>
          <a
            href={knowledgeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-3 inline-flex items-center gap-2 text-sm text-accent underline-offset-4 hover:underline"
          >
            open knowledge settings <ExternalLink className="h-3 w-3" />
          </a>
          <div className="relative rounded-lg border border-border bg-muted p-4">
            <pre className="text-sm text-foreground whitespace-pre-wrap">{KNOWLEDGE_TEXT}</pre>
            <button
              onClick={handleCopy}
              className="absolute right-3 top-3 rounded-md p-1.5 text-muted-foreground hover:bg-background hover:text-foreground transition-colors"
            >
              {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={nextStep} className="bg-accent text-accent-foreground hover:bg-accent/90">
          next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="ghost" onClick={() => skipStep(currentStep)} className="text-muted-foreground">
          skip for now
        </Button>
      </div>
    </div>
  );
}
