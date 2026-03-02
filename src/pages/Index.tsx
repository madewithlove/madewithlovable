import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Zap, Code, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const points = [
  {
    icon: Zap,
    title: "lovable is great for agility",
    description: "move fast, ship faster. lovable gets you to market at incredible speed.",
  },
  {
    icon: Shield,
    title: "but it has structural risks",
    description: "production-grade stability, reliability, and infrastructure need careful handling.",
  },
  {
    icon: Code,
    title: "developers can't fully own the code",
    description: "without guardrails, business users and developers work at cross purposes.",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary text-primary-foreground">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl">
            madewithlovable
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-primary-foreground/70">
            set up a protected production environment and put guardrails on lovable so business users can keep building without risk.
          </p>
        </motion.div>

        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {points.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 backdrop-blur"
            >
              <point.icon className="mb-4 h-8 w-8 text-accent" />
              <h3 className="mb-2 text-lg font-semibold">{point.title}</h3>
              <p className="text-sm text-primary-foreground/60">{point.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={() => navigate("/wizard")}
            className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-lg"
          >
            start now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
