import React from 'react';

const Pipeline = () => {
  const phases = [
    {
      num: '01',
      title: 'Exploration & Cleaning',
      description: 'Inspecting distributions, handling missing values, identifying outliers, and analyzing statistical correlations.',
      tech: 'Pandas • NumPy • Seaborn • SQL',
    },
    {
      num: '02',
      title: 'Feature Engineering',
      description: 'Transforming raw variables into predictive features with standard scaling, categorical encoding, and domain aggregations.',
      tech: 'Scikit-learn • Preprocessing • Pipelines',
    },
    {
      num: '03',
      title: 'Modeling & Evaluation',
      description: 'Benchmarking classifiers and regressors with k-fold cross-validation, tuning hyperparameters, and auditing feature importance.',
      tech: 'XGBoost • PyTorch • SHAP • Scikit-learn',
    },
    {
      num: '04',
      title: 'Interactive Web Apps',
      description: 'Packaging trained models with FastAPI endpoints and building responsive Streamlit interfaces for live experimentation.',
      tech: 'FastAPI • Streamlit • Docker • Pytest',
    },
  ];

  return (
    <section id="pipeline" className="py-28 px-6 border-t border-neutral-200/70 dark:border-neutral-800/70">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-2">
            06 // Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 mb-3">
            Project Development Workflow
          </h2>
          <p className="text-sm text-neutral-500 max-w-lg font-normal">
            A disciplined, step-by-step approach to turning raw data into validated machine learning solutions and interactive demos.
          </p>
        </div>

        {/* Minimal Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase, idx) => (
            <div
              key={phase.num}
              className="p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/40 dark:bg-neutral-900/20 hover:border-purple-500/30 dark:hover:border-emerald-500/30 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className={`text-xs font-mono font-semibold block mb-4 ${
                  idx % 2 === 0 ? 'text-purple-600 dark:text-purple-400' : 'text-emerald-600 dark:text-emerald-400'
                }`}>
                  Phase {phase.num}
                </span>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-purple-600 dark:group-hover:text-emerald-400 transition-colors">
                  {phase.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 font-normal">
                  {phase.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                {phase.tech}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pipeline;
