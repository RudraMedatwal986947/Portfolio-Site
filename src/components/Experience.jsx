import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';

const Experience = () => {
  return (
    <section id="experience" className="py-28 px-6 border-t border-neutral-200/70 dark:border-neutral-800/70">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-200/60 dark:border-neutral-800/60">
          <div>
            <span className="text-xs font-mono text-purple-600 dark:text-purple-400 uppercase tracking-wider block mb-2">
              02 // Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
              Work Experience
            </h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-sm mt-3 md:mt-0 font-normal">
            Practical industry exposure building end-to-end forecasting pipelines and analytical dashboards.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {personalInfo.experience.map((exp, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-10 rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/50 dark:bg-neutral-900/30 hover:border-purple-500/40 dark:hover:border-emerald-500/40 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Subtle top right ambient glow */}
              <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-purple-500/10 dark:bg-emerald-500/10 blur-2xl pointer-events-none group-hover:opacity-100 transition-opacity" />

              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 mb-3">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{exp.company}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                    {exp.role}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-700/60">
                    <Calendar className="w-3.5 h-3.5 text-purple-500" />
                    <span>{exp.period}</span>
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-700/60">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{exp.location}</span>
                  </span>
                </div>
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6 font-normal">
                {exp.summary}
              </p>

              {/* Key Highlights */}
              <div className="space-y-2.5 mb-8">
                {exp.highlights.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Technologies Used */}
              <div className="pt-6 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-neutral-400 mr-2">Technologies:</span>
                {exp.tech.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-700/60 text-neutral-700 dark:text-neutral-300 hover:border-purple-500/30 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
