import { useState } from "react";
import { useWizard } from "@/contexts/WizardContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Copy, Check, Download, ExternalLink, Code, Terminal, Cpu } from "lucide-react";

export function StepLocalSetup() {
  const { nextStep, skipStep, prevStep, currentStep, githubRepo, githubUrl } = useWizard();
  const [copied, setCopied] = useState(false);
  const [cloneMethod, setCloneMethod] = useState<"https" | "ssh">("https");

  const getCloneCmd = () => {
    if (!githubRepo) return "git clone <your-github-repo-url>";
    if (cloneMethod === "ssh") {
      return `git clone git@github.com:${githubRepo.org}/${githubRepo.repo}.git`;
    }
    return `git clone ${githubUrl.trim().replace(/\/$/, "")}.git`;
  };

  const cloneCmd = getCloneCmd();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cloneCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl">
      <h2 className="mb-2 text-2xl font-bold text-foreground">Local Development Setup</h2>
      <p className="mb-6 text-muted-foreground">
        Enable your engineering team to work on the codebase using their favourite IDE or agentic programming tools like Cursor, Windsurf, or Claude Code. This is not for testing — it's for professional development alongside Lovable.
      </p>

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <Code className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold text-foreground">Use any IDE</h3>
          </div>
          <p className="text-xs text-muted-foreground">VS Code, WebStorm, Cursor, Windsurf — engineers work in the tools they're most productive with.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <Cpu className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold text-foreground">Agentic programming</h3>
          </div>
          <p className="text-xs text-muted-foreground">Use AI-assisted coding tools like Claude Code or Copilot directly on the codebase with full context.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="mb-2 flex items-center gap-2">
            <Terminal className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold text-foreground">Full local environment</h3>
          </div>
          <p className="text-xs text-muted-foreground">Run the entire stack locally with Docker — database, backend, and frontend all in one command.</p>
        </div>
      </div>

      <div className="mb-6 space-y-4">
        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">1. Clone your repository</h3>
          <div className="mb-2 flex gap-1">
            <button
              onClick={() => setCloneMethod("https")}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                cloneMethod === "https"
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              HTTPS
            </button>
            <button
              onClick={() => setCloneMethod("ssh")}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                cloneMethod === "ssh"
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              SSH
            </button>
          </div>
          <div className="relative rounded-lg border border-border bg-muted p-4">
            <code className="text-sm text-foreground">{cloneCmd}</code>
            <button
              onClick={handleCopy}
              className="absolute right-3 top-3 rounded-md p-1.5 text-muted-foreground hover:bg-background hover:text-foreground transition-colors"
            >
              {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">2. Download local setup</h3>
          <Button variant="outline" size="sm" asChild>
            <a href="/local-setup.zip" download="local-setup.zip">
              <Download className="mr-2 h-4 w-4" /> Download local-setup.zip
            </a>
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">Unpack in the repository root directory.</p>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">3. Install Docker</h3>
          <a
            href="https://docs.docker.com/get-docker/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent underline-offset-4 hover:underline inline-flex items-center gap-1"
          >
            Get Docker <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-foreground">4. Run locally</h3>
          <p className="text-sm text-muted-foreground">
            Run <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">docker-compose up</code> and access your app at{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">http://localhost:8090</code>
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
