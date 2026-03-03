import { useWizard } from "@/contexts/WizardContext";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowRight, ArrowLeft, Download, Globe, Server, ExternalLink, ChevronDown } from "lucide-react";

export function StepSelfHosting() {
  const { nextStep, skipStep, prevStep, currentStep, githubRepo } = useWizard();

  const branchesLink = githubRepo
    ? `https://github.com/${githubRepo.org}/${githubRepo.repo}/branches`
    : null;

  return (
    <div className="w-full max-w-2xl">
      <h2 className="mb-2 text-2xl font-bold text-foreground">Production Self-Hosting</h2>
      <p className="mb-6 text-muted-foreground">
        Decouple your production environment from Lovable's hosting. Host on your own infrastructure for full control over uptime, scaling, and costs.
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
            <Globe className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold text-foreground">Business users stay empowered</h3>
          </div>
          <p className="text-xs text-muted-foreground">Non-technical team members can trigger deployments with a single click. The automation handles the safety checks.</p>
        </div>
      </div>

      <div className="mb-6 space-y-4">
        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">1. Prerequisites</h3>
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
          <h3 className="mb-2 text-sm font-semibold text-foreground">3. Set up AWS S3 + CloudFront</h3>
          <p className="mb-2 text-sm text-muted-foreground">
            You need an S3 bucket (can be private) and a CloudFront distribution. CloudFront's Free or Pay-as-you-go tier will suffice — it uses S3 as the origin and automatically creates the necessary access permissions.
          </p>
          <p className="mb-2 text-sm text-muted-foreground">
            You can either create them manually in the AWS Console or use the Terraform config below.
          </p>
          <p className="mb-3 text-xs text-muted-foreground">
            If you don't have Terraform installed, manually creating the two resources in the AWS Console will likely be faster.
          </p>

          <Collapsible>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href="/terraform.zip" download="terraform.zip">
                  <Download className="mr-2 h-4 w-4" /> Download terraform.zip
                </a>
              </Button>
              <CollapsibleTrigger asChild>
                <button className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 [&[data-state=open]>svg]:rotate-180">
                  Terraform commands <ChevronDown className="h-3 w-3 transition-transform duration-200" />
                </button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className="mt-3 rounded-lg border border-border bg-muted p-4 space-y-1">
                <p className="text-xs text-muted-foreground mb-2"># Set your AWS profile (if not using default)</p>
                <code className="block text-sm text-foreground">export AWS_PROFILE=your-profile-name</code>
                <p className="text-xs text-muted-foreground mt-3 mb-2"># Initialize (downloads AWS provider)</p>
                <code className="block text-sm text-foreground">terraform init</code>
                <p className="text-xs text-muted-foreground mt-3 mb-2"># Preview what will be created</p>
                <code className="block text-sm text-foreground">terraform plan</code>
                <p className="text-xs text-muted-foreground mt-3 mb-2"># Create the resources</p>
                <code className="block text-sm text-foreground">terraform apply</code>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">4. Build and deploy</h3>
          <p className="mb-2 text-sm text-muted-foreground">
            This creates the production build in <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">dist/</code>. Drop all the contents of that folder into your freshly created S3 bucket.
          </p>
          <div className="rounded-lg border border-border bg-muted p-4 space-y-1">
            <p className="text-xs text-muted-foreground mb-2"># If you have npm locally</p>
            <code className="block text-sm text-foreground">npm ci</code>
            <code className="block text-sm text-foreground">npm run build</code>
            <p className="text-xs text-muted-foreground mt-3 mb-2"># Or via Docker (from Step 4)</p>
            <code className="block text-sm text-foreground">docker compose run --rm app sh -c "npm ci && npm run build"</code>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Your site is now available through the public CloudFront URL.
          </p>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">5. Lovable Cloud (Supabase)</h3>
          <p className="mb-2 text-sm text-muted-foreground">
            This is only relevant if you use Lovable Cloud. By default, your self-hosted production frontend will hit the <strong>same</strong> Supabase backend and database as your test environment. For many projects, this is perfectly fine.
          </p>
          <p className="mb-2 text-sm text-muted-foreground">
            If you need a dedicated production database, you'll need to set up a separate managed Supabase project and point your self-hosted app to it. Follow the{" "}
            <a
              href="https://docs.lovable.dev/tips-tricks/external-deployment-hosting#manual-migration-using-the-supabase-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-4 hover:underline inline-flex items-center gap-1"
            >
              manual migration guide <ExternalLink className="h-3 w-3" />
            </a>{" "}
            to set up a managed Supabase instance.
          </p>
          <div className="rounded-lg border border-border bg-accent/10 p-3">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Note:</strong> The{" "}
              <a
                href="https://docs.lovable.dev/features/environments"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-4 hover:underline inline-flex items-center gap-1"
              >
                Lovable Environments (beta) <ExternalLink className="h-3 w-3" />
              </a>{" "}
              feature only applies when using Lovable's published URL — it does not work for self-hosted deployments.
            </p>
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