import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Code, Terminal, Layers, Activity, Cpu, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import ProjectModal from './ProjectModal';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ['All', 'MLOps & Prediction', 'Predictive ML & XAI', 'Classification & Risk', 'Healthcare & Time-Series'];

  const projects = [
    {
      id: 1,
      title: 'End-to-End MLOps Real Estate Prediction System',
      category: 'MLOps & Prediction',
      period: 'March 2026 – May 2026',
      accent: 'purple',
      pipeline: [
        { name: 'Ames Ingestion', type: 'purple' },
        { name: 'Feature Eng', type: 'emerald' },
        { name: 'MLflow Tracking', type: 'purple' },
        { name: 'FastAPI Serving', type: 'emerald' },
      ],
      description:
        'Built a full-stack machine learning pipeline from data ingestion to deployment. Achieved an R² score above 0.90 on the Ames Housing dataset using XGBoost regression, with containerized REST API serving and MLflow experiment logging.',
      longDescription:
        'A comprehensive end-to-end MLOps implementation utilizing the Ames Housing dataset. The project encompasses structured data cleaning, automated feature engineering, hyperparameter optimization with XGBoost, and systematic experiment tracking using MLflow. Deployed as a containerized microservice via Docker and FastAPI, with a companion Streamlit dashboard for interactive property valuation.',
      tags: ['Python', 'XGBoost', 'FastAPI', 'Docker', 'MLflow', 'Streamlit', 'Scikit-learn'],
      metrics: [
        { label: 'R² Score', val: '> 0.90', color: 'text-purple-600 dark:text-purple-400' },
        { label: 'Experiment Track', val: 'MLflow', color: 'text-emerald-600 dark:text-emerald-400' },
      ],
      highlights: [
        'Built full-stack ML pipeline (data ingestion to deployment) using Python, XGBoost, FastAPI, Docker, MLflow, and Streamlit.',
        'Achieved an R² score above 0.90 on the Ames Housing dataset using regularized gradient boosting regression.',
        'Deployed a containerized REST API with Pydantic validation schemas for low-overhead real-time predictions.',
        'Logged model parameters, evaluation metrics, and artifacts systematically via MLflow.',
      ],
      github: personalInfo.github,
      demo: '#',
    },
    {
      id: 2,
      title: 'Intelligent Customer Lifetime Value & Churn Prediction Platform',
      category: 'Predictive ML & XAI',
      period: 'Hands-On Platform',
      accent: 'emerald',
      pipeline: [
        { name: 'Telco Records', type: 'emerald' },
        { name: 'Feature Store', type: 'purple' },
        { name: 'XGBoost Fit', type: 'emerald' },
        { name: 'SHAP Insights', type: 'purple' },
      ],
      description:
        'Dual-model customer intelligence platform predicting churn risk (80.77% accuracy, 0.854 AUC) and estimating Customer Lifetime Value (R² 0.9986). Features explainable AI via SHAP and interactive FastAPI/Streamlit microservices.',
      longDescription:
        'An enterprise-grade customer intelligence system trained on 7,043 structured telco customer records. Includes an XGBoost classifier for churn probability, an XGBoost regressor for CLV estimation, K-Means clustering (k=4) for behavioral customer segmentation, and SHapley Additive exPlanations (SHAP) for transparent per-customer risk attributions.',
      tags: ['Python', 'XGBoost', 'SHAP', 'FastAPI', 'PostgreSQL', 'Streamlit', 'Docker Compose', 'Pytest'],
      metrics: [
        { label: 'Churn Accuracy', val: '80.8%', color: 'text-emerald-600 dark:text-emerald-400' },
        { label: 'Dataset', val: '7,043 rows', color: 'text-purple-600 dark:text-purple-400' },
      ],
      highlights: [
        'Achieved 80.77% accuracy and 0.854 AUC-ROC on binary churn classification using tuned XGBoost.',
        'Engineered specialized domain features: tenure groups, charge difference, and total active services.',
        'Integrated SHAP (TreeExplainer) to visualize granular feature contributions directly on the UI.',
        'Containerized multi-service architecture using Docker Compose (PostgreSQL database, FastAPI backend, Streamlit dashboard).',
      ],
      github: personalInfo.github,
      demo: '#demo',
    },
    {
      id: 3,
      title: 'Loan Default Prediction System (Credit Risk ML)',
      category: 'Classification & Risk',
      period: 'January 2026 – March 2026',
      accent: 'purple',
      pipeline: [
        { name: 'Credit Data', type: 'purple' },
        { name: 'SMOTE Balancing', type: 'emerald' },
        { name: 'Random Forest', type: 'purple' },
        { name: 'Risk Tier UI', type: 'emerald' },
      ],
      description:
        'Credit risk classification system handling severe class imbalance using SMOTE. Evaluated Logistic Regression and Random Forest using ROC-AUC and F1-score, deploying a real-time risk tier predictor (Low/Medium/High) via Streamlit.',
      longDescription:
        'A risk management machine learning solution designed to identify loan default probabilities. Solved real-world lending class imbalance through Synthetic Minority Over-sampling Technique (SMOTE) with imbalanced-learn. Rigorously benchmarked classifiers across accuracy, precision, recall, F1-score, and ROC-AUC curves before packaging into a real-time interactive risk-scoring app.',
      tags: ['Python', 'Scikit-learn', 'Random Forest', 'SMOTE', 'Streamlit', 'Pandas', 'Matplotlib'],
      metrics: [
        { label: 'Resampling', val: 'SMOTE', color: 'text-purple-600 dark:text-purple-400' },
        { label: 'Top Model', val: 'Random Forest', color: 'text-emerald-600 dark:text-emerald-400' },
      ],
      highlights: [
        'Overcame heavy class imbalance in financial credit histories using SMOTE oversampling.',
        'Benchmarked Logistic Regression against ensemble Random Forest classifiers with cross-validation.',
        'Selected Random Forest as top performer based on balanced recall and ROC-AUC metrics.',
        'Deployed interactive Streamlit app categorizing applicants into actionable Low, Medium, and High risk tiers.',
      ],
      github: personalInfo.github,
      demo: '#',
    },
    {
      id: 4,
      title: 'COVID-19 Healthcare Analytics & Time-Series Forecasting',
      category: 'Healthcare & Time-Series',
      period: 'July 2025 – January 2026',
      accent: 'emerald',
      pipeline: [
        { name: 'Health Datasets', type: 'emerald' },
        { name: 'Cleansing/EDA', type: 'purple' },
        { name: 'Trend Forecast', type: 'emerald' },
        { name: 'BI Dashboard', type: 'purple' },
      ],
      description:
        'Data analysis and predictive forecasting platform covering data collection, cleansing, EDA, and regression modeling. Applied Linear Regression, Random Forest, and XGBoost for healthcare trend forecasting with an interactive dashboard.',
      longDescription:
        'Developed during Data Science internship at Internship Studio. Built a complete time-series and regression forecasting system for public health tracking. Cleaned disparate historical records, analyzed multi-variant correlations, and applied predictive modeling to inform decision-making via interactive visual dashboards.',
      tags: ['Python', 'XGBoost', 'Random Forest', 'Linear Regression', 'Seaborn', 'Streamlit', 'Pandas'],
      metrics: [
        { label: 'Forecasting', val: 'Time-Series', color: 'text-emerald-600 dark:text-emerald-400' },
        { label: 'Role', val: 'DS Intern', color: 'text-purple-600 dark:text-purple-400' },
      ],
      highlights: [
        'Built full healthcare analytics pipeline: automated data collection, cleansing, EDA, and statistical modeling.',
        'Evaluated Linear Regression, Random Forest, and XGBoost for longitudinal healthcare trend forecasting.',
        'Created interactive analytical dashboards enabling stakeholders to explore historical vs. forecasted vectors.',
      ],
      github: personalInfo.github,
      demo: '#',
    },
  ];

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-28 px-6 border-t border-neutral-200/70 dark:border-neutral-800/70">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-200/60 dark:border-neutral-800/60">
          <div>
            <span className="text-xs font-mono text-purple-600 dark:text-purple-400 uppercase tracking-wider block mb-2">
              01 // Projects
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
              Featured Projects
            </h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-sm mt-3 md:mt-0 font-normal">
            End-to-end machine learning implementations with reproducible code, quantitative evaluation, and deployed applications.
          </p>
        </div>

        {/* Minimal Category Filter with Counts */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => {
            const count = cat === 'All' ? projects.length : projects.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                  filter === cat
                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-sm font-semibold'
                    : 'bg-neutral-100/70 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200/60 dark:border-neutral-800/60'
                }`}
              >
                <span>{cat}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  filter === cat
                    ? 'bg-neutral-800 text-white dark:bg-neutral-300 dark:text-neutral-900'
                    : 'bg-neutral-200/80 dark:bg-neutral-800 text-neutral-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid with UI/UX Pro Max Hover Elevation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filtered.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col justify-between p-6 sm:p-7 rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/60 dark:bg-neutral-900/40 hover:border-purple-500/40 dark:hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-purple-500/5 dark:hover:shadow-emerald-500/5 relative overflow-hidden backdrop-blur-sm"
              >
                {/* Subtle gradient corner highlight */}
                <div
                  className={`absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl pointer-events-none transition-opacity duration-500 ${
                    project.accent === 'purple'
                      ? 'bg-purple-500/10 group-hover:opacity-100'
                      : 'bg-emerald-500/10 group-hover:opacity-100'
                  }`}
                />

                <div>
                  {/* Minimalist Data Flow Schematic */}
                  <div className="mb-6 p-4 rounded-2xl bg-neutral-50/80 dark:bg-neutral-950/60 border border-neutral-200/60 dark:border-neutral-800/60">
                    <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-3 h-3 text-purple-500" />
                        <span>Execution Pipeline</span>
                      </span>
                      <span className="text-emerald-500 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Validated
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-1.5 text-center">
                      {project.pipeline.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className={`p-1.5 rounded-lg text-[10px] font-mono truncate border transition-all ${
                            step.type === 'purple'
                              ? 'bg-purple-50/70 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 border-purple-500/20 group-hover:border-purple-500/40'
                              : 'bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-500/20 group-hover:border-emerald-500/40'
                          }`}
                        >
                          {step.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Meta */}
                  <div className="flex items-center justify-between mb-3 text-xs font-mono text-neutral-400">
                    <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800/90 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60 text-[11px]">
                      {project.category}
                    </span>
                    <div className="flex gap-3 text-[11px]">
                      {project.metrics.map((m, idx) => (
                        <span key={idx}>
                          {m.label}: <strong className={`font-semibold ${m.color}`}>{m.val}</strong>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 font-normal">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-neutral-100/70 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 text-neutral-600 dark:text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links & Case Study Trigger */}
                  <div className="flex items-center justify-between text-xs font-medium">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-mono"
                    >
                      <Code className="w-3.5 h-3.5" />
                      <span>Code Repository</span>
                    </a>

                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="group/btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/20 transition-all cursor-pointer font-mono text-xs font-medium"
                    >
                      <span>Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Rich Case Study Modal */}
        <ProjectModal
          project={activeModalProject}
          isOpen={!!activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      </div>
    </section>
  );
};

export default Projects;
