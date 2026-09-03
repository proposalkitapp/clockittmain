import { motion } from "framer-motion";

interface Floating3DMascotProps {
  src: string;
  alt: string;
  className?: string;
}

export function Floating3DMascot({ src, alt, className = "" }: Floating3DMascotProps) {
  return (
    <div className="relative flex items-center justify-center [perspective:1000px]">
      {/* 3D Dynamic Ambient Glow Aura */}
      <motion.div
        aria-hidden="true"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute h-36 w-36 rounded-full bg-gradient-to-tr from-amber/40 via-amber-deep/30 to-amber-light/20 blur-2xl sm:h-44 sm:w-44"
      />

      {/* Floating 3D Mascot Card */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
          rotateX: [3, -3, 3],
          rotateY: [-5, 5, -5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.08,
          rotateZ: 4,
        }}
        whileTap={{ scale: 0.95 }}
        style={{ transformStyle: "preserve-3d" }}
        className={`relative z-10 cursor-pointer drop-shadow-[0_25px_35px_rgba(30,39,73,0.22)] ${className}`}
      >
        <img
          src={src}
          alt={alt}
          width={128}
          height={128}
          className="h-28 w-28 object-contain sm:h-36 sm:w-36"
        />
      </motion.div>

      {/* 3D Perspective Floor Shadow */}
      <motion.div
        aria-hidden="true"
        animate={{
          scale: [0.8, 1.1, 0.8],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-4 h-4 w-28 rounded-full bg-ink/20 blur-md sm:w-36"
      />
    </div>
  );
}
