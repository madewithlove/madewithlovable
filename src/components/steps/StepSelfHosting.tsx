import { useWizard } from "@/contexts/WizardContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Download } from "lucide-react";

export function StepSelfHosting() {
  const { nextStep, skipStep, prevStep, currentStep } = useWizard();

  return (
    <div className="w-full max-w-2xl">
      <h2 className="mb-2 text-2xl font-bold text-foreground">Production Self-Hosting</h2>
      <p className="mb-6 text-muted-foreground">
        Set up automated deployments with code review guardrails. This step is optional.
      </p>

      <div className="mb-6 space-y-4">
        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">1. Create a production branch</h3>
          <p className="text-sm text-muted-foreground">
            In your GitHub repository, create a new branch called <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">production</code>.
          </p>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">2. Download Git workflows</h3>
          <Button variant="outline" size="sm" disabled>
            <Download className="mr-2 h-4 w-4" /> Download workflows.zip (coming soon)
          </Button>
          <p className="mt-2 text-sm text-muted-foreground">These workflows automate three things:</p>
          <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-muted-foreground">
            <li>Business users can initiate a merge from main to production — Claude will create a PR and summarise changes</li>
            <li>Claude reviews the PR against your guardrails</li>
            <li>Claude approves the PR if everything looks good</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">3. Prerequisites</h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            <li>Install the Claude GitHub app on your repository</li>
            <li>Add <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ANTHROPIC_KEY</code> as a repository secret</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">4. Hosting with AWS S3 + CloudFront</h3>
          <Button variant="outline" size="sm" disabled>
            <Download className="mr-2 h-4 w-4" /> Download terraform.zip (coming soon)
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            Alternatively, you can create the S3 bucket and CloudFront distribution manually.
          </p>
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
