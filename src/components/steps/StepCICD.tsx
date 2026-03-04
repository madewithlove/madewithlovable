import { useWizard } from "@/contexts/WizardContext";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowRight, ArrowLeft, Download, ShieldCheck, Workflow, ExternalLink, ChevronDown } from "lucide-react";

export function StepCICD() {
  const { nextStep, skipStep, prevStep, currentStep, githubRepo } = useWizard();

  const secretsLink = githubRepo
    ? `https://github.com/${githubRepo.org}/${githubRepo.repo}/settings/secrets/actions`
    : null;
  const variablesLink = githubRepo
    ? `https://github.com/${githubRepo.org}/${githubRepo.repo}/settings/variables/actions`
    : null;
  const actionsSettingsLink = githubRepo
    ? `https://github.com/organizations/${githubRepo.org}/settings/actions`
    : null;
  const actionsLink = githubRepo
    ? `https://github.com/${githubRepo.org}/${githubRepo.repo}/actions`
    : null;
  const deployYmlLink = githubRepo
    ? `https://github.com/${githubRepo.org}/${githubRepo.repo}/blob/main/.github/workflows/deploy.yml`
    : null;

  return (
    <div className="w-full max-w-2xl">
      <h2 className="mb-2 text-2xl font-bold text-foreground">CI/CD Pipeline</h2>
      <p className="mb-6 text-muted-foreground">
        Automate your deployment process with GitHub Actions. Claude reviews every change against your guardrails before it can reach production.
      </p>

      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <Workflow className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold text-foreground">Automated pipeline</h3>
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
      </div>

      <div className="mb-6 space-y-4">
        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">1. Prerequisites</h3>
          <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
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
            <li>
              Add{" "}
              <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" className="text-accent underline-offset-4 hover:underline inline-flex items-center gap-1">
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ANTHROPIC_KEY</code> <ExternalLink className="h-3 w-3" />
              </a>{" "}
              as a{" "}
              {secretsLink ? (
                <a href={secretsLink} target="_blank" rel="noopener noreferrer" className="text-accent underline-offset-4 hover:underline inline-flex items-center gap-1">
                  repository secret <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                "repository secret"
              )}
            </li>
            <li>
              Add <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">AWS_ACCESS_KEY_ID</code> and <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">AWS_SECRET_ACCESS_KEY</code> as{" "}
              {secretsLink ? (
                <a href={secretsLink} target="_blank" rel="noopener noreferrer" className="text-accent underline-offset-4 hover:underline inline-flex items-center gap-1">
                  repository secrets <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                "repository secrets"
              )}.{" "}
              Create a CI/CD user in{" "}
              <a href="https://console.aws.amazon.com/iam/" target="_blank" rel="noopener noreferrer" className="text-accent underline-offset-4 hover:underline inline-flex items-center gap-1">
                AWS IAM <ExternalLink className="h-3 w-3" />
              </a>{" "}
              with an API key and the following permission policy:
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <button className="mt-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 [&[data-state=open]>svg]:rotate-180">
                    View IAM policy <ChevronDown className="h-3 w-3 transition-transform duration-200" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <pre className="mt-2 rounded-lg border border-border bg-muted p-3 text-xs text-foreground overflow-x-auto">{`{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "<your_S3_bucket_ARN>",
                "<your_S3_bucket_ARN>/*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "cloudfront:CreateInvalidation"
            ],
            "Resource": "*"
        }
    ]
}`}</pre>
                </CollapsibleContent>
              </Collapsible>
              If using Lovable Cloud, also add your Supabase credentials as{" "}
              {secretsLink ? (
                <a href={secretsLink} target="_blank" rel="noopener noreferrer" className="text-accent underline-offset-4 hover:underline inline-flex items-center gap-1">
                  repository secrets <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                "repository secrets"
              )}:
              <ul className="mt-1 ml-4 list-inside list-disc space-y-1">
                <li><code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">VITE_SUPABASE_URL</code></li>
                <li><code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">VITE_SUPABASE_PUBLISHABLE_KEY</code></li>
              </ul>
            </li>
            <li>
              Enable <strong>"Allow GitHub Actions to create and approve pull requests"</strong> in your{" "}
              {actionsSettingsLink ? (
                <a href={actionsSettingsLink} target="_blank" rel="noopener noreferrer" className="text-accent underline-offset-4 hover:underline inline-flex items-center gap-1">
                  organisation Actions settings <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                "organisation Actions settings"
              )}{" "}
              (found at the bottom of the page)
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">2. Download CI/CD workflows</h3>
          <Button variant="outline" size="sm" asChild>
            <a href="/ci-cd.zip" download="ci-cd.zip">
              <Download className="mr-2 h-4 w-4" /> Download ci-cd.zip
            </a>
          </Button>
          <p className="mt-3 text-sm text-muted-foreground">This zip contains three GitHub Actions workflows:</p>

          <div className="mt-3 space-y-3">
            <div className="rounded-lg border border-border bg-card p-3">
              <p className="text-sm font-medium text-foreground">
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">initiate-release.yml</code>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Adds a manual "Run workflow" button in your{" "}
                {actionsLink ? (
                  <a href={actionsLink} target="_blank" rel="noopener noreferrer" className="text-accent underline-offset-4 hover:underline inline-flex items-center gap-1">
                    Actions tab <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  "Actions tab"
                )}. When clicked, Claude creates a PR from <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">main</code> to <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">production</code> with a summary of all changes.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-3">
              <p className="text-sm font-medium text-foreground">
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ci-guardrails.yml</code>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Triggered on every PR. Claude reviews the changes against your <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">LOVABLE.md</code> guardrails and auto-approves if everything is compliant.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-3">
              <p className="text-sm font-medium text-foreground">
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">deploy.yml</code>
                {deployYmlLink && (
                  <a href={deployYmlLink} target="_blank" rel="noopener noreferrer" className="ml-2 text-accent underline-offset-4 hover:underline inline-flex items-center gap-1 text-xs">
                    view <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Builds the application and publishes it to your hosting provider. You need to add two{" "}
                {variablesLink ? (
                  <a href={variablesLink} target="_blank" rel="noopener noreferrer" className="text-accent underline-offset-4 hover:underline inline-flex items-center gap-1">
                    GitHub Actions variables <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  "GitHub Actions variables"
                )}:
              </p>
              <ul className="mt-1 ml-4 list-inside list-disc space-y-1 text-xs text-muted-foreground">
                <li><code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">S3_BUCKET</code> — your S3 bucket name</li>
                <li><code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">CLOUDFRONT_DISTRIBUTION_ID</code> — your CloudFront distribution ID</li>
              </ul>
            </div>
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
