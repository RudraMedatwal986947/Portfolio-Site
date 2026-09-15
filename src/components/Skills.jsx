import React from 'react';

const Skills = () => {
  const categories = [
    {
      domain: 'Languages & Core',
      summary: 'Primary languages for data science scripting, backend APIs, and database queries.',
      skills: ['Python', 'SQL (PostgreSQL)', 'Bash / Shell', 'Git & GitHub'],
    },
    {
      domain: 'Machine Learning & Modeling',
      summary: 'Predictive algorithms, ensemble methods, and imbalanced learning.',
      skills: ['Scikit-learn', 'XGBoost', 'Random Forest', 'Linear & Logistic Regression', 'Imbalanced-learn (SMOTE)', 'Time Series Forecasting'],
    },
    {
      domain: 'Data Science & Analytics',
      summary: 'Data cleansing, numerical transformations, and visual exploratory analysis.',
      skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Exploratory Data Analysis (EDA)', 'Hypothesis Testing', 'Feature Engineering'],
    },
    {
      domain: 'MLOps & Deployment',
      summary: 'Containerization, REST microservices, and experiment tracking.',
      skills: ['FastAPI', 'Docker', 'MLflow', 'Streamlit', 'Joblib', 'AWS (Cloud Foundations)'],
    },
    {
      domain: 'Tools & Development',
      summary: 'Environments, version control, and data stores.',
      skills: ['Jupyter Notebook', 'VS Code', 'PostgreSQL', 'Pytest', 'Docker Compose', 'Virtualenv / pip'],
    },
  ];

  return (
    <section id="skills" className="py-28 px-6 border-t border-neutral-200/70 dark:border-neutral-800/70">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Summary */}
          <div className="lg:col-span-4">
            <span className="text-xs font-mono text-purple-600 dark:text-purple-400 uppercase tracking-wider block mb-2">
              03 // Stack
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 mb-4">
              Technical Stack
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
              Frameworks, predictive algorithms, MLOps tooling, and cloud environments practically applied across deployed projects.
            </p>
          </div>

          {/* Right Categorized Competency List */}
          <div className="lg:col-span-8 divide-y divide-neutral-200/80 dark:divide-neutral-800/80">
            {categories.map((cat, idx) => (
              <div key={idx} className="py-6 first:pt-0 last:pb-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-3">
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${idx % 2 === 0 ? 'bg-purple-500' : 'bg-emerald-500'}`} />
                    {cat.domain}
                  </h3>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 font-sans mt-0.5 sm:mt-0">
                    {cat.summary}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900/90 text-neutral-700 dark:text-neutral-300 border border-neutral-200/70 dark:border-neutral-800/80 hover:border-purple-500/40 dark:hover:border-emerald-500/40 hover:text-neutral-900 dark:hover:text-white transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
