import { useWizard } from "@/contexts/WizardContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, SkipForward, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function AscensionParticle({ delay, x, size }: { delay: number; x: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        bottom: 0,
        background: `radial-gradient(circle, hsl(var(--accent)), hsl(var(--accent) / 0.3))`,
        boxShadow: `0 0 ${size * 2}px hsl(var(--accent) / 0.6)`,
      }}
      initial={{ y: 0, opacity: 0, scale: 0 }}
      animate={{
        y: [0, -400, -800],
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
        x: [0, (Math.random() - 0.5) * 100],
      }}
      transition={{
        duration: 2.5 + Math.random() * 1.5,
        delay: delay,
        ease: "easeOut",
      }}
    />
  );
}

function EnergyRing({ delay, scale }: { delay: number; scale: number }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 rounded-full border-2"
      style={{
        borderColor: "hsl(var(--accent) / 0.4)",
        width: 60 * scale,
        height: 60 * scale,
        marginLeft: -30 * scale,
        marginTop: -30 * scale,
      }}
      initial={{ scale: 0, opacity: 0.8 }}
      animate={{ scale: [0, 3, 6], opacity: [0.8, 0.3, 0] }}
      transition={{ duration: 2, delay, ease: "easeOut" }}
    />
  );
}

export function StepCompletion() {
  const { steps } = useWizard();
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  const completed = steps.filter((s) => s.status === "completed");
  const skipped = steps.filter((s) => s.status === "skipped");

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    delay: Math.random() * 1.5,
    x: Math.random() * 100,
    size: 4 + Math.random() * 8,
  }));

  const rings = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    delay: 0.3 + i * 0.3,
    scale: 1 + i * 0.5,
  }));

  return (
    <div className="relative w-full max-w-2xl overflow-hidden">
      {/* Background glow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, hsl(var(--accent) / 0.15) 0%, transparent 70%)`,
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 1, 0.6], scale: [0.5, 1.2, 1] }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Particles rising */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <AscensionParticle key={p.id} delay={p.delay} x={p.x} size={p.size} />
        ))}
      </div>

      {/* Energy rings from center icon */}
      <div className="pointer-events-none absolute inset-0">
        {rings.map((r) => (
          <EnergyRing key={r.id} delay={r.delay} scale={r.scale} />
        ))}
      </div>

      {/* Brain icon ascension */}
      <motion.div
        className="relative mb-8 flex justify-center"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="relative flex h-24 w-24 items-center justify-center rounded-full"
          style={{
            background: `radial-gradient(circle, hsl(var(--accent) / 0.2), transparent)`,
          }}
          animate={{
            boxShadow: [
              "0 0 20px hsl(var(--accent) / 0.2)",
              "0 0 60px hsl(var(--accent) / 0.5)",
              "0 0 20px hsl(var(--accent) / 0.2)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Zap className="h-12 w-12 text-accent" strokeWidth={1.5} />
          </motion.div>

          {/* Orbiting dots */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full"
              style={{ background: "hsl(var(--accent))" }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5,
              }}
              // Position via transform-origin trick
            >
              <motion.div
                className="absolute h-2 w-2 rounded-full"
                style={{
                  background: "hsl(var(--accent))",
                  top: -(35 + i * 8),
                  left: 0,
                  boxShadow: `0 0 8px hsl(var(--accent) / 0.8)`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Title with staggered reveal */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="mb-2 text-center text-3xl font-bold text-foreground">
          <motion.span
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Congratulations
          </motion.span>
        </h2>
        <motion.p
          className="mb-8 text-center text-lg text-muted-foreground"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          Your Lovable project is now de-risked!
        </motion.p>
      </motion.div>

      {/* Content fade in */}
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
