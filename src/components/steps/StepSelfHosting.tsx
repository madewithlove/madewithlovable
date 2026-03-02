import { useWizard } from "@/contexts/WizardContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";

export function StepSelfHosting() {
  const { nextStep, skipStep, currentStep } = useWizard();

  return (
    <div className="max-w-xl">
      <h2 className="mb-2 text-2xl font-bold text-foreground">production self-hosting</h2>
      <p className="mb-6 text-muted-foreground">
        set up automated deployments with code review guardrails. this step is optional.
      </p>

      <div className="mb-6 space-y-4">
        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">1. create a production branch</h3>
          <p className="text-sm text-muted-foreground">
            in your github repository, create a new branch called <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">production</code>.
          </p>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">2. download git workflows</h3>
          <Button variant="outline" size="sm" disabled>
            <Download className="mr-2 h-4 w-4" /> download workflows.zip (coming soon)
          </Button>
          <p className="mt-2 text-sm text-muted-foreground">these workflows automate three things:</p>
          <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-muted-foreground">
            <li>business users can initiate a merge from main to production — claude will create a PR and summarise changes</li>
            <li>claude reviews the PR against your guardrails</li>
            <li>claude approves the PR if everything looks good</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">3. prerequisites</h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            <li>install the claude github app on your repository</li>
            <li>add <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ANTHROPIC_KEY</code> as a repository secret</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">4. hosting with AWS S3 + CloudFront</h3>
          <Button variant="outline" size="sm" disabled>
            <Download className="mr-2 h-4 w-4" /> download terraform.zip (coming soon)
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            alternatively, you can create the S3 bucket and CloudFront distribution manually.
          </p>
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
