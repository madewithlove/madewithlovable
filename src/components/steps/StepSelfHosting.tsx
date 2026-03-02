import { useWizard } from "@/contexts/WizardContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Download, Globe, ShieldCheck, Workflow, Server, ExternalLink } from "lucide-react";

export function StepSelfHosting() {
  const { nextStep, skipStep, prevStep, currentStep } = useWizard();

  return (
    <div className="w-full max-w-2xl">
      <h2 className="mb-2 text-2xl font-bold text-foreground">Production Self-Hosting</h2>
      <p className="mb-6 text-muted-foreground">
        Decouple your production environment from Lovable's hosting. Business users keep building in Lovable, but nothing reaches production without automated review — giving you full control over what goes live.
      </p>

      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <Server className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold text-foreground">Own your infrastructure</h3>
          </div>
          <p className="text-xs text-muted-foreground">Host on your own AWS account with S3 and CloudFront. No vendor lock-in, full control over uptime, scaling, and costs.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <Workflow className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold text-foreground">Automated CI/CD pipeline</h3>
          </div>
          <p className="text-xs text-muted-foreground">GitHub Actions automatically handle the merge, review, and deployment process — no manual steps needed.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold text-foreground">AI-powered code review</h3>
          </div>
          <p className="text-xs text-muted-foreground">Claude reviews every change against your guardrails before it can reach production. Non-compliant code is blocked automatically.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <Globe className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold text-foreground">Business users stay empowered</h3>
          </div>
          <p className="text-xs text-muted-foreground">Non-technical team members can trigger deployments with a single click. The automation handles the safety checks.</p>
        </div>
      </div>

      <div className="mb-6 space-y-4">
        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">1. Prerequisites</h3>

          <p className="mb-1 text-sm font-medium text-foreground">CI/CD pipeline</p>
          <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground mb-3">
            <li>
              Install and configure the Claude GitHub app on your repository:{" "}
              <a
                href="https://github.com/apps/claude"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-4 hover:underline inline-flex items-center gap-1"
              >
                github.com/apps/claude <ExternalLink className="h-3 w-3" />
              </a>
            </li>
            <li>Add <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ANTHROPIC_KEY</code> as a repository secret</li>
          </ul>

          <p className="mb-1 text-sm font-medium text-foreground">Hosting</p>
          <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
            <li>An AWS account (used in this example for S3 + CloudFront)</li>
            <li>
              Other hosting options are available — see the{" "}
              <a
                href="https://docs.lovable.dev/tips-tricks/external-deployment-hosting"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-4 hover:underline inline-flex items-center gap-1"
              >
                Lovable deployment docs <ExternalLink className="h-3 w-3" />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">2. Create a production branch</h3>
          <p className="text-sm text-muted-foreground">
            In your GitHub repository, create a new branch called <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">production</code>.
          </p>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">3. Download CI/CD setup</h3>
          <Button variant="outline" size="sm" asChild>
            <a href="/ci-cd.zip" download="ci-cd.zip">
              <Download className="mr-2 h-4 w-4" /> Download ci-cd.zip
            </a>
          </Button>
          <p className="mt-2 text-sm text-muted-foreground">These workflows automate three things:</p>
          <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-muted-foreground">
            <li>Business users can initiate a merge from main to production — Claude will create a PR and summarise changes</li>
            <li>Claude reviews the PR against your guardrails</li>
            <li>Claude approves the PR if everything looks good</li>
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
