import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowUpRight, Code, Layers, Activity } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl p-6 sm:p-8 z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Category & Status */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                {project.category}
              </span>
              <span className="text-xs font-mono text-neutral-400">• Case Study</span>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 mb-4 pr-8">
              {project.title}
            </h3>

            {/* Full Description */}
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6 font-normal">
              {project.longDescription || project.description}
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/70 dark:border-neutral-800/70 mb-6">
              {project.metrics.map((m, idx) => (
                <div key={idx}>
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">{m.label}</div>
                  <div className={`text-lg font-mono font-semibold ${m.color}`}>{m.val}</div>
                </div>
              ))}
              {project.period && (
                <div>
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">Timeline</div>
                  <div className="text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300 mt-1">{project.period}</div>
                </div>
              )}
            </div>

            {/* Key Engineering Highlights */}
            {project.highlights && (
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Key Implementation Details</span>
                </h4>
                <div className="space-y-2">
                  {project.highlights.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Chips */}
            <div className="mb-8">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">Technologies & Libraries</div>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-700/60 text-neutral-700 dark:text-neutral-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-neutral-200/70 dark:border-neutral-800/70">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-medium hover:opacity-90 transition-opacity"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View Source on GitHub</span>
              </a>

              {project.demo && project.demo !== '#' && (
                <a
                  href={project.demo}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  <span>Launch Live Demo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
