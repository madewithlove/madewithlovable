/* WizardContext - updated */
import React, { createContext, useContext, useState, ReactNode } from "react";

export type StepStatus = "pending" | "current" | "completed" | "skipped";

export interface StepInfo {
  id: number;
  label: string;
  status: StepStatus;
  skippable: boolean;
}

interface WizardState {
  projectUuid: string;
  setProjectUuid: (uuid: string) => void;
  githubUrl: string;
  setGithubUrl: (url: string) => void;
  /** Returns { org, repo } if githubUrl is valid, otherwise null */
  githubRepo: { org: string; repo: string } | null;
  currentStep: number;
  steps: StepInfo[];
  goToStep: (step: number) => void;
  completeStep: (step: number) => void;
  skipStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const defaultSteps: StepInfo[] = [
  { id: 1, label: "Project URL", status: "current", skippable: false },
  { id: 2, label: "Connect to GitHub", status: "pending", skippable: false },
  { id: 3, label: "Guardrails", status: "pending", skippable: true },
  { id: 4, label: "Local Setup", status: "pending", skippable: true },
  { id: 5, label: "Self-Hosting", status: "pending", skippable: true },
  { id: 6, label: "CI/CD Pipeline", status: "pending", skippable: true },
];

const WizardContext = createContext<WizardState | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [projectUuid, setProjectUuid] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState<StepInfo[]>(defaultSteps);

  const githubRepo = (() => {
    const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) return null;
    return { org: match[1], repo: match[2].replace(/\.git$/, "") };
  })();

  const updateStepStatus = (stepId: number, status: StepStatus) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === stepId ? { ...s, status } : s))
    );
  };

  const goToStep = (step: number) => {
    setSteps((prev) =>
      prev.map((s) => {
        if (s.id === step) return { ...s, status: "current" as StepStatus };
        return s;
      })
    );
    setCurrentStep(step);
  };

  const completeStep = (step: number) => {
    updateStepStatus(step, "completed");
  };

  const skipStep = (step: number) => {
    updateStepStatus(step, "skipped");
    const next = step + 1;
    if (next <= 6) {
      goToStep(next);
    } else {
      setCurrentStep(7);
    }
  };

  const nextStep = () => {
    completeStep(currentStep);
    const next = currentStep + 1;
    if (next <= 6) {
      goToStep(next);
    } else {
      setCurrentStep(7);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };

  return (
    <WizardContext.Provider
      value={{ projectUuid, setProjectUuid, githubUrl, setGithubUrl, githubRepo, currentStep, steps, goToStep, completeStep, skipStep, nextStep, prevStep }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used within WizardProvider");
  return ctx;
}
