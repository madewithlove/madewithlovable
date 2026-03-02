import { useState } from "react";
import { useWizard } from "@/contexts/WizardContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Copy, Check, ExternalLink, Download, ShieldCheck, BookOpen, GitBranch } from "lucide-react";
import heartIcon from "@/assets/heart-icon.png";

const KNOWLEDGE_TEXT = `Adhere to all guidelines detailed in LOVABLE.md in the root directory.

You are not allowed to change LOVABLE.md.`;

export function StepGuardrails() {
  const { projectUuid, nextStep, skipStep, prevStep, currentStep } = useWizard();
  const [copied, setCopied] = useState(false);
  const knowledgeUrl = `https://lovable.dev/projects/${projectUuid}/settings?tab=knowledge`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(KNOWLEDGE_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl">
      <h2 className="mb-2 text-2xl font-bold text-foreground">Set Up Guardrails</h2>
      <p className="mb-2 text-muted-foreground">
        Engineers need to enforce rules that Lovable must respect. A LOVABLE.md file in your repository root acts as the single source of truth for what can and can't be changed.
      </p>
      <p className="mb-6 flex items-center gap-1.5 text-muted-foreground">
        Add guardrails to your <img src={heartIcon} alt="heart" className="inline h-5 w-5" />'s content. Think about what needs guardrails without limiting the business user too much — we don't want to remove the fun.
      </p>

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold text-foreground">Protect critical code</h3>
          </div>
          <p className="text-xs text-muted-foreground">Lock down business logic, API integrations, and security-sensitive code that must not be overridden.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold text-foreground">Coding guidelines</h3>
          </div>
          <p className="text-xs text-muted-foreground">Define naming conventions, architecture patterns, and standards that Lovable must follow when generating code.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold text-foreground">Automated review</h3>
          </div>
          <p className="text-xs text-muted-foreground">Because it lives in Git, these rules can be enforced automatically during code review before anything reaches production.</p>
        </div>
      </div>

      <div className="mb-6 space-y-4">
        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">1. Download LOVABLE.md</h3>
          <Button variant="outline" size="sm" asChild>
            <a href="/LOVABLE.md" download="LOVABLE.md">
              <Download className="mr-2 h-4 w-4" /> Download LOVABLE.md
            </a>
          </Button>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">2. Add knowledge instructions</h3>
          <p className="mb-2 text-sm text-muted-foreground">
            Open your project's knowledge settings and paste the following:
          </p>
          <a
            href={knowledgeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-3 inline-flex items-center gap-2 text-sm text-accent underline-offset-4 hover:underline"
          >
            Open knowledge settings <ExternalLink className="h-3 w-3" />
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
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={nextStep} className="bg-accent text-accent-foreground hover:bg-accent/90">
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="ghost" onClick={() => skipStep(currentStep)} className="text-muted-foreground">
          Skip for now
        </Button>
      </div>
    </div>
  );
}
