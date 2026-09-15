import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowRight, Mail, Sparkles, FileText } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './SocialIcons';
import AmbientGradient from './AmbientGradient';
import NeuralTensorGraphic from './NeuralTensorGraphic';
import { personalInfo } from '../data/personalInfo';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Modern Ambient Mesh Gradient with subtle Purple & Emerald Auras */}
      <AmbientGradient />

      <div className="max-w-6xl mx-auto w-full relative z-10 pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Status Pill with subtle green & purple hints */}
            <div className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-neutral-600 dark:text-neutral-400 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800/80 mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{personalInfo.role}</span>
              <span className="text-neutral-300 dark:text-neutral-700">•</span>
              <span className="text-purple-600 dark:text-purple-400 font-medium">{personalInfo.name}</span>
            </div>

            {/* Headline with subtle Purple & Emerald Gradient */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 leading-[1.15] mb-6">
              Building intelligent solutions through{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-500 dark:from-purple-400 dark:via-indigo-300 dark:to-emerald-400">
                machine learning
              </span>{' '}
              & data science.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl mb-8 font-normal">
              {personalInfo.bio}
            </p>

            {/* Quick Contact Badges */}
            <div className="pointer-events-auto flex flex-wrap items-center gap-2.5 mb-10 text-xs font-mono">
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 hover:bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/20 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{personalInfo.email}</span>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800/70 hover:bg-purple-500/10 text-neutral-700 dark:text-neutral-300 hover:text-purple-600 dark:hover:text-purple-400 border border-neutral-300/60 dark:border-neutral-700/60 hover:border-purple-500/30 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>

            {/* Action buttons */}
            <div className="pointer-events-auto flex flex-wrap items-center gap-3 mb-16">
              <a
                href="#projects"
                className="px-5 py-2.5 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-medium tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-neutral-900/10 dark:shadow-white/5 cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowDownRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 text-xs font-medium transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume (PDF)</span>
              </a>

              <a
                href="#contact"
                className="px-5 py-2.5 rounded-full bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Resume-Backed Key Metrics Bar */}
            <div className="pointer-events-auto grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8 border-t border-neutral-200/80 dark:border-neutral-800/80 w-full">
              <div>
                <div className="text-2xl font-semibold text-purple-600 dark:text-purple-400 font-mono">&gt; 0.90</div>
                <div className="text-xs text-neutral-500 font-sans mt-0.5">Ames Real Estate R²</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400 font-mono">80.8%</div>
                <div className="text-xs text-neutral-500 font-sans mt-0.5">Churn Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-neutral-950 dark:text-neutral-50 font-mono">MLflow & API</div>
                <div className="text-xs text-neutral-500 font-sans mt-0.5">FastAPI & Docker</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-neutral-950 dark:text-neutral-50 font-mono">AWS Cloud</div>
                <div className="text-xs text-neutral-500 font-sans mt-0.5">Academy Graduate</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Minimalist Neural Tensor Graphic (3D graphics removed) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative pointer-events-auto w-full"
          >
            <NeuralTensorGraphic />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
