import { useWizard } from "@/contexts/WizardContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

/** Inline SVG: silhouette head with visible brain */
function BrainHead({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Head silhouette */}
      <path
        d="M60 130 C30 130 15 115 15 95 L15 85 C10 80 8 70 10 60 C12 48 20 38 30 32 C32 20 42 10 60 8 C78 10 88 20 90 32 C100 38 108 48 110 60 C112 70 110 80 105 85 L105 95 C105 115 90 130 60 130Z"
        fill="hsl(var(--accent) / 0.08)"
        stroke="hsl(var(--accent) / 0.3)"
        strokeWidth="1.5"
      />
      {/* Brain - left hemisphere */}
      <path
        d="M40 65 C38 55 42 45 50 40 C52 38 56 37 58 38 L58 80 C55 78 48 75 44 72 C41 70 40 68 40 65Z"
        fill="hsl(var(--accent) / 0.15)"
        stroke="hsl(var(--accent) / 0.5)"
        strokeWidth="1"
      />
      {/* Brain - right hemisphere */}
      <path
        d="M80 65 C82 55 78 45 70 40 C68 38 64 37 62 38 L62 80 C65 78 72 75 76 72 C79 70 80 68 80 65Z"
        fill="hsl(var(--accent) / 0.15)"
        stroke="hsl(var(--accent) / 0.5)"
        strokeWidth="1"
      />
      {/* Brain folds - left */}
      <path d="M45 52 C48 48 52 50 55 48" stroke="hsl(var(--accent) / 0.4)" strokeWidth="0.8" fill="none" />
      <path d="M43 60 C47 57 51 59 56 56" stroke="hsl(var(--accent) / 0.4)" strokeWidth="0.8" fill="none" />
      <path d="M44 68 C48 65 52 67 57 64" stroke="hsl(var(--accent) / 0.4)" strokeWidth="0.8" fill="none" />
      {/* Brain folds - right */}
      <path d="M75 52 C72 48 68 50 65 48" stroke="hsl(var(--accent) / 0.4)" strokeWidth="0.8" fill="none" />
      <path d="M77 60 C73 57 69 59 64 56" stroke="hsl(var(--accent) / 0.4)" strokeWidth="0.8" fill="none" />
      <path d="M76 68 C72 65 68 67 63 64" stroke="hsl(var(--accent) / 0.4)" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

function Synapse({ delay, startX, startY }: { delay: number; startX: number; startY: number }) {
  const angle = Math.random() * Math.PI * 2;
  const dist = 80 + Math.random() * 120;
  const endX = startX + Math.cos(angle) * dist;
  const endY = startY + Math.sin(angle) * dist;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 3,
        height: 3,
        left: startX,
        top: startY,
        background: "hsl(var(--accent))",
        boxShadow: "0 0 6px hsl(var(--accent) / 0.8)",
      }}
      initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: [0, endX - startX],
        y: [0, endY - startY],
        scale: [0, 1.5, 1, 0],
      }}
      transition={{
        duration: 1.5 + Math.random(),
        delay,
        ease: "easeOut",
      }}
    />
  );
}

export function StepCompletion() {
  const { steps } = useWizard();
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [phase, setPhase] = useState(0); // 0=dormant, 1=activating, 2=ascended

  const completed = steps.filter((s) => s.status === "completed");
  const skipped = steps.filter((s) => s.status === "skipped");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1600);
    const t3 = setTimeout(() => setShowContent(true), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Synapses firing outward from brain center
  const synapses = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    delay: 0.8 + Math.random() * 1.2,
    startX: 140 + (Math.random() - 0.5) * 40,
    startY: 70 + (Math.random() - 0.5) * 30,
  }));

  return (
    <div className="relative w-full max-w-2xl pt-4">
      {/* Brain visualization */}
      <div className="relative mx-auto mb-6" style={{ width: 280, height: 180 }}>
        {/* Expanding glow behind brain */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 120,
            height: 120,
            background: "radial-gradient(circle, hsl(var(--accent) / 0.3), transparent 70%)",
          }}
          animate={
            phase >= 2
              ? { scale: [1, 3], opacity: [0.6, 0] }
              : { scale: 1, opacity: 0 }
          }
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Steady glow once ascended */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 160,
            height: 160,
            background: "radial-gradient(circle, hsl(var(--accent) / 0.12), transparent 70%)",
          }}
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Synapses firing */}
        {phase >= 1 && (
          <div className="absolute inset-0 overflow-hidden">
            {synapses.map((s) => (
              <Synapse key={s.id} delay={s.delay} startX={s.startX} startY={s.startY} />
            ))}
          </div>
        )}

        {/* Brain head SVG */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 100, height: 116 }}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <BrainHead className="h-full w-full" />

          {/* Brain "lighting up" overlay */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 50% 45%, hsl(var(--accent) / 0.4), transparent 60%)",
              borderRadius: "50%",
            }}
            initial={{ opacity: 0 }}
            animate={
              phase >= 1
                ? phase >= 2
                  ? { opacity: [0.6, 0.3, 0.6] }
                  : { opacity: [0, 0.4, 0.2, 0.5] }
                : { opacity: 0 }
            }
            transition={
              phase >= 2
                ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.8 }
            }
          />
        </motion.div>

        {/* "100%" badge */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-bold"
          style={{
            bottom: -8,
            background: "hsl(var(--accent))",
            color: "hsl(var(--accent-foreground))",
            boxShadow: "0 0 20px hsl(var(--accent) / 0.5)",
          }}
          initial={{ opacity: 0, scale: 0, y: 10 }}
          animate={phase >= 2 ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          100%
        </motion.div>
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="mb-2 text-center text-3xl font-bold text-foreground">
          Congratulations
        </h2>
        <p className="mb-8 text-center text-lg text-muted-foreground">
          Your Lovable project is now de-risked!
        </p>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={showContent ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6 space-y-4">
          {completed.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-semibold text-foreground">Completed steps</h3>
              <ul className="space-y-1">
                {completed.map((s, i) => (
                  <motion.li
                    key={s.id}
                    className="flex items-center gap-2 text-sm text-foreground"
                    initial={{ opacity: 0, x: -10 }}
                    animate={showContent ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Check className="h-4 w-4 text-accent" /> {s.label}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {skipped.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-semibold text-foreground">Skipped steps</h3>
              <ul className="space-y-1">
                {skipped.map((s, i) => (
                  <motion.li
                    key={s.id}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                    initial={{ opacity: 0, x: -10 }}
                    animate={showContent ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: (completed.length + i) * 0.1 }}
                  >
                    <SkipForward className="h-4 w-4" /> {s.label}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <Button variant="outline" onClick={() => navigate("/")}>
            Start over
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
