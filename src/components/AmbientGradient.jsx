import React from 'react';
import { motion } from 'framer-motion';

const AmbientGradient = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top Center-Left: Violet / Purple Ambient Glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.6, 0.8, 0.6],
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 -left-20 sm:left-1/10 w-[420px] sm:w-[580px] h-[420px] sm:h-[580px] rounded-full bg-gradient-to-br from-purple-500/20 via-indigo-500/15 to-transparent dark:from-purple-600/25 dark:via-indigo-600/20 dark:to-transparent blur-[110px] sm:blur-[140px]"
      />

      {/* Top Center-Right: Subtle Emerald / Green Ambient Glow */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.55, 0.75, 0.55],
          x: [0, -25, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-10 right-[-10%] sm:right-[8%] w-[380px] sm:w-[540px] h-[380px] sm:h-[540px] rounded-full bg-gradient-to-bl from-emerald-400/15 via-teal-500/12 to-transparent dark:from-emerald-500/22 dark:via-teal-600/15 dark:to-transparent blur-[110px] sm:blur-[140px]"
      />

      {/* Mid-Hero: Delicate Indigo / Cyan Diffusion */}
      <motion.div
        animate={{
          opacity: [0.4, 0.65, 0.4],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[260px] sm:h-[400px] rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-emerald-500/10 dark:from-indigo-600/15 dark:via-purple-600/15 dark:to-emerald-500/15 blur-[120px]"
      />

      {/* Ultra-subtle engineering grid overlay with radial vignette */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,#000_65%,transparent_100%)] opacity-[0.25] dark:opacity-[0.14]" 
      />

      {/* Top subtle border beam / line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-px bg-gradient-to-r from-transparent via-purple-500/30 dark:via-emerald-400/30 to-transparent" />
    </div>
  );
};

export default AmbientGradient;
