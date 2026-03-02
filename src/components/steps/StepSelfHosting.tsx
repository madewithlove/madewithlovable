import { useWizard } from "@/contexts/WizardContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Download, Globe, ShieldCheck, Workflow, Server, ExternalLink } from "lucide-react";

export function StepSelfHosting() {
  const { nextStep, skipStep, prevStep, currentStep, githubRepo } = useWizard();

  const envLink = githubRepo
    ? `https://github.com/${githubRepo.org}/${githubRepo.repo}/blob/main/.env`
    : null;
  const branchesLink = githubRepo
    ? `https://github.com/${githubRepo.org}/${githubRepo.repo}/branches`
    : null;
  const secretsLink = githubRepo
    ? `https://github.com/${githubRepo.org}/${githubRepo.repo}/settings/secrets/actions`
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
            <li>
              Add <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ANTHROPIC_KEY</code> as a{" "}
              {secretsLink ? (
                <a href={secretsLink} target="_blank" rel="noopener noreferrer" className="text-accent underline-offset-4 hover:underline inline-flex items-center gap-1">
                  repository secret <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                "repository secret"
              )}
            </li>
            <li>
              If using Lovable Cloud, also add your Supabase credentials (found in the{" "}
              {envLink ? (
                <a href={envLink} target="_blank" rel="noopener noreferrer" className="text-accent underline-offset-4 hover:underline inline-flex items-center gap-1">
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env</code> <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env</code>
              )}{" "}
              published by Lovable) as repository secrets:
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
            In your GitHub repository, create a new branch called <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">production</code>. Go to{" "}
            {branchesLink ? (
              <a href={branchesLink} target="_blank" rel="noopener noreferrer" className="text-accent underline-offset-4 hover:underline inline-flex items-center gap-1">
                your branches page <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">github.com/&lt;your-org&gt;/&lt;your-repo&gt;/branches</code>
            )}{" "}
            and click <strong>New branch</strong>.
          </p>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">3. Download CI/CD setup</h3>
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
                )}. When clicked, Claude creates a PR from <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">main</code> to <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">production</code> with a summary of all changes — so business users never have to touch Git.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-3">
              <p className="text-sm font-medium text-foreground">
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">ci-guardrails.yml</code>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Triggered on every PR. Claude reviews the changes against your <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">LOVABLE.md</code> guardrails and auto-approves if everything is compliant. Non-compliant changes are blocked.
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
                Builds the application and publishes it to your hosting provider (AWS in this example). You need to set two environment variables in the workflow file:
              </p>
              <ul className="mt-1 ml-4 list-inside list-disc space-y-1 text-xs text-muted-foreground">
                <li><code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">S3_BUCKET_NAME</code> — your S3 bucket name</li>
                <li><code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">CLOUDFRONT_DISTRIBUTION_ID</code> — your CloudFront distribution ID</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">4. Hosting with AWS S3 + CloudFront</h3>
          <Button variant="outline" size="sm" disabled>
            <Download className="mr-2 h-4 w-4" /> Download terraform.zip (coming soon)
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            Alternatively, you can create the S3 bucket and CloudFront distribution manually.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Don't forget to add the S3 bucket name and CloudFront distribution ID to your <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">deploy.yml</code>.
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
