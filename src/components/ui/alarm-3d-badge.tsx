import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Alarm3DBadgeProps {
  children: ReactNode;
  className?: string;
}

export function Alarm3DBadge({ children, className = "" }: Alarm3DBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "out" }}
      whileHover={{ scale: 1.04 }}
      className={`relative inline-flex items-center gap-2 rounded-full border border-amber/40 bg-accent/70 px-4 py-1.5 text-xs font-bold tracking-wide text-ink backdrop-blur-md shadow-md hover:shadow-lg transition-all ${className}`}
    >
      <motion.span
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="h-2 w-2 rounded-full bg-amber-deep shadow-[0_0_8px_rgba(217,119,6,0.8)]"
      />
      {children}
    </motion.div>
  );
}
