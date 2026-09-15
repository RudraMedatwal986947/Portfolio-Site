import React from 'react';
import { GraduationCap, Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';

const Education = () => {
  return (
    <section id="education" className="py-28 px-6 border-t border-neutral-200/70 dark:border-neutral-800/70">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-200/60 dark:border-neutral-800/60">
          <div>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-2">
              04 // Credentials
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
              Education & Certifications
            </h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-sm mt-3 md:mt-0 font-normal">
            Formal engineering foundations and verified industry credentials in Cloud & Machine Learning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left: Formal Education */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-9 rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/50 dark:bg-neutral-900/30 h-full flex flex-col justify-between hover:border-purple-500/40 transition-colors">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 mb-4">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Formal Degree</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  {personalInfo.education.degree}
                </h3>
                <div className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-4">
                  {personalInfo.education.institution}
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal mb-6">
                  {personalInfo.education.description}
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Academic Score</span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                  {personalInfo.education.score}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Certifications */}
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-emerald-500" />
              <span>Verified Certifications & Badges</span>
            </div>

            {personalInfo.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/50 dark:bg-neutral-900/30 hover:border-emerald-500/40 transition-all group flex items-start gap-4"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>

                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {cert.title}
                    </h4>
                    <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                      {cert.category}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-normal">
                    {cert.highlight}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Education;
