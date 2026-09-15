import React, { useState, useMemo } from 'react';
import { Activity, BarChart2, Info } from 'lucide-react';

const AiDemo = () => {
  const [tenure, setTenure] = useState(16);
  const [monthlySpend, setMonthlySpend] = useState(85);
  const [supportTickets, setSupportTickets] = useState(2);
  const [contractType, setContractType] = useState('one-year');

  const { churnResult, shapContributions } = useMemo(() => {
    let score = 25; // baseline
    const shap = [];

    // 1. Contract attribution
    if (contractType === 'monthly') {
      score += 20;
      shap.push({ feature: 'Contract: Month-to-Month', impact: +20, type: 'increase' });
    } else if (contractType === 'one-year') {
      score -= 15;
      shap.push({ feature: 'Contract: 1-Year Commitment', impact: -15, type: 'decrease' });
    } else {
      score -= 30;
      shap.push({ feature: 'Contract: 2-Year Commitment', impact: -30, type: 'decrease' });
    }

    // 2. Tenure attribution
    if (tenure < 6) {
      score += 25;
      shap.push({ feature: 'Tenure: Under 6 Months (Early Stage)', impact: +25, type: 'increase' });
    } else if (tenure < 18) {
      score += 10;
      shap.push({ feature: 'Tenure: 6–18 Months', impact: +10, type: 'increase' });
    } else {
      score -= 15;
      shap.push({ feature: 'Tenure: 18+ Months (Loyal)', impact: -15, type: 'decrease' });
    }

    // 3. Support Tickets attribution
    const ticketImpact = supportTickets * 8;
    score += ticketImpact;
    shap.push({
      feature: `Support: ${supportTickets} Interaction${supportTickets === 1 ? '' : 's'}`,
      impact: ticketImpact,
      type: ticketImpact > 0 ? 'increase' : 'neutral',
    });

    // 4. Monthly spend attribution
    if (monthlySpend > 120) {
      score += 12;
      shap.push({ feature: 'Charges: High Bracket (>$120/mo)', impact: +12, type: 'increase' });
    } else {
      shap.push({ feature: 'Charges: Standard (<$120/mo)', impact: -5, type: 'decrease' });
      score -= 5;
    }

    const risk = Math.min(Math.max(score, 4), 96);
    const isHigh = risk > 55;
    const isModerate = risk >= 30 && risk <= 55;

    return {
      churnResult: {
        risk,
        label: isHigh ? 'High Risk' : isModerate ? 'Moderate Risk' : 'Low Risk',
        color: isHigh
          ? 'text-rose-600 dark:text-rose-400'
          : isModerate
          ? 'text-amber-600 dark:text-amber-400'
          : 'text-emerald-600 dark:text-emerald-400',
      },
      shapContributions: shap,
    };
  }, [tenure, monthlySpend, supportTickets, contractType]);

  return (
    <section id="demo" className="py-28 px-6 border-t border-neutral-200/70 dark:border-neutral-800/70">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-200/60 dark:border-neutral-800/60">
          <div>
            <span className="text-xs font-mono text-purple-600 dark:text-purple-400 uppercase tracking-wider block mb-2">
              05 // Interactive Demo
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
              Telco Churn Predictor
            </h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-sm mt-3 md:mt-0 font-normal">
            Interactive client-side simulation of my XGBoost churn model with live SHAP (Explainable AI) feature attributions.
          </p>
        </div>

        {/* Minimal Sandbox Container */}
        <div className="rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/40 dark:bg-neutral-900/20 p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Sliders */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-medium mb-2">
                  <span className="text-neutral-600 dark:text-neutral-400">Account Tenure</span>
                  <span className="font-mono text-neutral-900 dark:text-neutral-100">{tenure} Months</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={60}
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full accent-purple-600 dark:accent-emerald-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-2">
                  <span className="text-neutral-600 dark:text-neutral-400">Monthly Contract Value</span>
                  <span className="font-mono text-neutral-900 dark:text-neutral-100">${monthlySpend} / mo</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={250}
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(Number(e.target.value))}
                  className="w-full accent-purple-600 dark:accent-emerald-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-2">
                  <span className="text-neutral-600 dark:text-neutral-400">Support Interactions</span>
                  <span className="font-mono text-neutral-900 dark:text-neutral-100">{supportTickets} Tickets</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={8}
                  value={supportTickets}
                  onChange={(e) => setSupportTickets(Number(e.target.value))}
                  className="w-full accent-purple-600 dark:accent-emerald-400 cursor-pointer"
                />
              </div>

              <div>
                <span className="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                  Contract Agreement
                </span>
                <div className="flex gap-2">
                  {[
                    { id: 'monthly', label: 'Monthly' },
                    { id: 'one-year', label: '1-Year' },
                    { id: 'two-year', label: '2-Year' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setContractType(c.id)}
                      className={`text-xs px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                        contractType === c.id
                          ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 border-transparent font-medium shadow-sm'
                          : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-purple-500/40 dark:hover:border-emerald-500/40'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Inference Score & SHAP Attribution Display */}
            <div className="lg:col-span-5 p-7 rounded-2xl bg-white dark:bg-neutral-900/70 border border-neutral-200/80 dark:border-neutral-800/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-2">
                  <span>MODEL: XGBOOST</span>
                  <span className="text-emerald-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE
                  </span>
                </div>

                <div className="text-center py-2">
                  <div className={`text-5xl font-bold font-mono tracking-tight my-1 ${churnResult.color}`}>
                    {churnResult.risk}%
                  </div>

                  <div className="text-xs font-mono font-medium text-neutral-500 mb-4">
                    Status: <span className="font-semibold text-neutral-900 dark:text-neutral-100">{churnResult.label}</span>
                  </div>
                </div>

                {/* SHAP Feature Contribution Bars */}
                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <BarChart2 className="w-3 h-3 text-purple-500" />
                    <span>SHAP Feature Attributions</span>
                  </div>

                  <div className="space-y-2">
                    {shapContributions.map((s, idx) => (
                      <div key={idx} className="text-[11px] font-mono">
                        <div className="flex justify-between text-neutral-600 dark:text-neutral-400 mb-0.5">
                          <span className="truncate pr-2">{s.feature}</span>
                          <span className={s.impact > 0 ? 'text-rose-500 font-semibold' : 'text-emerald-500 font-semibold'}>
                            {s.impact > 0 ? `+${s.impact}%` : `${s.impact}%`}
                          </span>
                        </div>
                        <div className="w-full h-1 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              s.impact > 0 ? 'bg-rose-500/70' : 'bg-emerald-500/70'
                            }`}
                            style={{ width: `${Math.min(Math.abs(s.impact) * 2.5, 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-mono text-neutral-400 pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800 text-center">
                7,043 Records • Test Acc: 80.77% • AUC: 0.854
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AiDemo;
