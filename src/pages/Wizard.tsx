import { WizardProvider, useWizard } from "@/contexts/WizardContext";
import { WizardSidebar } from "@/components/WizardSidebar";
import { StepProjectUrl } from "@/components/steps/StepProjectUrl";
import { StepGitHub } from "@/components/steps/StepGitHub";
import { StepGuardrails } from "@/components/steps/StepGuardrails";
import { StepLocalSetup } from "@/components/steps/StepLocalSetup";
import { StepSelfHosting } from "@/components/steps/StepSelfHosting";
import { StepCICD } from "@/components/steps/StepCICD";
import { StepCompletion } from "@/components/steps/StepCompletion";
import { motion, AnimatePresence } from "framer-motion";

function WizardContent() {
  const { currentStep } = useWizard();

  const stepComponent = () => {
    switch (currentStep) {
      case 1: return <StepProjectUrl />;
      case 2: return <StepGitHub />;
      case 3: return <StepGuardrails />;
      case 4: return <StepLocalSetup />;
      case 5: return <StepSelfHosting />;
      case 6: return <StepCICD />;
      case 7: return <StepCompletion />;
      default: return <StepProjectUrl />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <WizardSidebar />
      <main className="flex-1 bg-background p-10 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {stepComponent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function Wizard() {
  return (
    <WizardProvider>
      <WizardContent />
    </WizardProvider>
  );
}
