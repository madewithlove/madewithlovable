import { useState } from "react";
import { useWizard } from "@/contexts/WizardContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, ExternalLink, GitBranch, Users, RotateCcw, FileText } from "lucide-react";

const GITHUB_URL_REGEX = /^https?:\/\/github\.com\/[^/]+\/[^/]+\/?$/;

export function StepGitHub() {
  const { projectUuid, githubUrl, setGithubUrl, nextStep, prevStep } = useWizard();
  const [urlError, setUrlError] = useState("");
  const settingsUrl = `https://lovable.dev/projects/${projectUuid}/settings/git`;
  const docsUrl = "https://docs.lovable.dev/integrations/github";

  const handleUrlChange = (value: string) => {
    // Extract base repo URL if user pastes a deep link (e.g. .../blob/main/...)
    const match = value.trim().match(/^(https?:\/\/github\.com\/[^/]+\/[^/]+)/);
    const cleaned = match ? match[1] : value.trim();
    setGithubUrl(cleaned);
    if (cleaned && !GITHUB_URL_REGEX.test(cleaned)) {
      setUrlError("Please enter a valid GitHub repository URL (e.g. https://github.com/org/repo)");
    } else {
      setUrlError("");
    }
  };

  const benefits = [
    {
      icon: GitBranch,
      title: "Version control",
      description: "Every change is tracked with full history. You always know what changed, when, and by whom.",
    },
    {
      icon: Users,
      title: "Bi-directional sync",
      description: "Engineers can contribute directly via code while business users keep building in Lovable. Changes sync both ways automatically.",
    },
    {
      icon: RotateCcw,
      title: "Easy rollbacks",
      description: "Something went wrong? Roll back to any previous version in seconds — no data loss, no guesswork.",
    },
    {
      icon: FileText,
      title: "Changelog & audit trail",
      description: "A complete changelog of every update provides transparency and accountability across your team.",
    },
  ];

  return (
    <div className="w-full max-w-2xl">
      <h2 className="mb-2 text-2xl font-bold text-foreground">Connect to GitHub</h2>
      <p className="mb-6 text-muted-foreground">
        Exporting your code to GitHub is the first step to owning your codebase. This ensures you always have a copy of your code outside of Lovable.
      </p>

      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        {benefits.map((b) => (
          <div key={b.title} className="rounded-lg border border-border bg-card p-4">
            <div className="mb-2 flex items-center gap-2">
              <b.icon className="h-4 w-4 text-accent" />
              <h3 className="text-sm font-semibold text-foreground">{b.title}</h3>
            </div>
            <p className="text-xs text-muted-foreground">{b.description}</p>
          </div>
        ))}
      </div>

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

      <div className="mb-6">
        <label className="mb-1 block text-sm font-medium text-foreground">
          GitHub repository URL <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <Input
          placeholder="https://github.com/your-org/your-repo"
          value={githubUrl}
          onChange={(e) => handleUrlChange(e.target.value)}
          className={urlError ? "border-destructive" : ""}
        />
        {urlError && <p className="mt-1 text-xs text-destructive">{urlError}</p>}
        <p className="mt-1 text-xs text-muted-foreground">
          If provided, we'll generate ready-to-use links in the next steps.
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={nextStep} className="bg-accent text-accent-foreground hover:bg-accent/90">
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
