import { useWizard } from "@/contexts/WizardContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";

export function StepGitHub() {
  const { projectUuid, nextStep } = useWizard();
  const settingsUrl = `https://lovable.dev/projects/${projectUuid}/settings?tab=github`;
  const docsUrl = "https://docs.lovable.dev/integrations/github";

  return (
    <div className="w-full max-w-2xl">
      <h2 className="mb-2 text-2xl font-bold text-foreground">Connect to GitHub</h2>
      <p className="mb-6 text-muted-foreground">
        Exporting your code to GitHub is the first step to owning your codebase. This ensures you always have a copy of your code outside of Lovable.
      </p>

      <div className="mb-6 space-y-3">
        <a
          href={settingsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Open GitHub settings for your project <ExternalLink className="h-4 w-4" />
        </a>

        <div>
          <a
            href={docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent underline-offset-4 hover:underline"
          >
            Read the Lovable GitHub docs →
          </a>
        </div>
      </div>

      <Button onClick={nextStep} className="bg-accent text-accent-foreground hover:bg-accent/90">
        Next <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
