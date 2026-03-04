import { useState } from "react";
import { useWizard } from "@/contexts/WizardContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const URL_PATTERN = /^https?:\/\/(?:www\.)?lovable\.dev\/projects\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i;

export function StepProjectUrl() {
  const { setProjectUuid, nextStep } = useWizard();
  const [url, setUrl] = useState("");
  const match = URL_PATTERN.exec(url);
  const isValid = !!match;

  const handleNext = () => {
    if (match) {
      setProjectUuid(match[1]);
      nextStep();
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <h2 className="mb-2 text-2xl font-bold text-foreground">Enter your Lovable project URL</h2>
      <p className="mb-6 text-muted-foreground">
        Paste your project URL so we can give you the correct links.
      </p>
      <Input
        placeholder="https://lovable.dev/projects/your-project-id"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="mb-2"
      />
      {url && !isValid && (
        <p className="mb-4 text-sm text-destructive">
          Please enter a valid Lovable project URL (e.g. https://lovable.dev/projects/uuid)
        </p>
      )}
      {isValid && (
        <p className="mb-4 text-sm text-accent">
          ✓ Valid project detected
        </p>
      )}
      <div className="flex gap-3">
        <Button onClick={handleNext} disabled={!isValid} className="bg-accent text-accent-foreground hover:bg-accent/90">
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            const dummyUrl = "https://lovable.dev/projects/00000000-0000-0000-0000-000000000000";
            setUrl(dummyUrl);
            setProjectUuid("00000000-0000-0000-0000-000000000000");
            nextStep();
          }}
        >
          Continue with demo project
        </Button>
      </div>
    </div>
  );
}
