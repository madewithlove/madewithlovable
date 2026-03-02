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
  currentStep: number;
  steps: StepInfo[];
  goToStep: (step: number) => void;
  completeStep: (step: number) => void;
  skipStep: (step: number) => void;
  nextStep: () => void;
}

const defaultSteps: StepInfo[] = [
  { id: 1, label: "project url", status: "current", skippable: false },
  { id: 2, label: "connect to github", status: "pending", skippable: false },
  { id: 3, label: "guardrails", status: "pending", skippable: true },
  { id: 4, label: "local setup", status: "pending", skippable: true },
  { id: 5, label: "self-hosting", status: "pending", skippable: true },
];

const WizardContext = createContext<WizardState | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [projectUuid, setProjectUuid] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState<StepInfo[]>(defaultSteps);

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
    if (next <= 5) {
      goToStep(next);
    } else {
      setCurrentStep(6); // completion
    }
  };

  const nextStep = () => {
    completeStep(currentStep);
    const next = currentStep + 1;
    if (next <= 5) {
      goToStep(next);
    } else {
      setCurrentStep(6); // completion
    }
  };

  return (
    <WizardContext.Provider
      value={{ projectUuid, setProjectUuid, currentStep, steps, goToStep, completeStep, skipStep, nextStep }}
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
