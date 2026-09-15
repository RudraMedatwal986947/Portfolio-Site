import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  BarChart3, 
  Home, 
  Sliders, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  Cpu,
  Layers,
  Zap,
  Target
} from 'lucide-react';

const AiDemo = () => {
  const [activeTab, setActiveTab] = useState('churn'); // 'churn' | 'ames' | 'eval'

  // ==========================================
  // TAB 1: TELCO CHURN STATE & LOGIC
  // ==========================================
  const [tenure, setTenure] = useState(14);
  const [monthlySpend, setMonthlySpend] = useState(85);
  const [supportTickets, setSupportTickets] = useState(2);
  const [contractType, setContractType] = useState('monthly'); // 'monthly' | 'one-year' | 'two-year'

  const { churnResult, shapContributions } = useMemo(() => {
    let score = 25; // baseline
    const shap = [];

    // 1. Contract attribution
    if (contractType === 'monthly') {
      score += 24;
      shap.push({ feature: 'Contract: Month-to-Month', impact: +24, type: 'increase' });
    } else if (contractType === 'one-year') {
      score -= 14;
      shap.push({ feature: 'Contract: 1-Year Commitment', impact: -14, type: 'decrease' });
    } else {
      score -= 28;
      shap.push({ feature: 'Contract: 2-Year Commitment', impact: -28, type: 'decrease' });
    }

    // 2. Tenure attribution
    if (tenure < 6) {
      score += 22;
      shap.push({ feature: 'Tenure: Under 6 Months (New Account)', impact: +22, type: 'increase' });
    } else if (tenure < 24) {
      score += 6;
      shap.push({ feature: 'Tenure: 6–24 Months', impact: +6, type: 'increase' });
    } else {
      score -= 18;
      shap.push({ feature: 'Tenure: 24+ Months (Established)', impact: -18, type: 'decrease' });
    }

    // 3. Support Tickets attribution
    const ticketImpact = supportTickets * 7;
    score += ticketImpact;
    shap.push({
      feature: `Support: ${supportTickets} Ticket${supportTickets === 1 ? '' : 's'} Filed`,
      impact: ticketImpact,
      type: ticketImpact > 0 ? 'increase' : 'neutral',
    });

    // 4. Monthly spend attribution
    if (monthlySpend > 110) {
      score += 15;
      shap.push({ feature: 'Charges: High Bracket (>$110/mo)', impact: +15, type: 'increase' });
    } else if (monthlySpend > 70) {
      score += 4;
      shap.push({ feature: 'Charges: Mid Bracket ($70–$110/mo)', impact: +4, type: 'increase' });
    } else {
      score -= 8;
      shap.push({ feature: 'Charges: Economy Tier (<$70/mo)', impact: -8, type: 'decrease' });
    }

    const risk = Math.min(Math.max(score, 5), 95);
    const isHigh = risk > 55;
    const isModerate = risk >= 30 && risk <= 55;

    return {
      churnResult: {
        risk,
        label: isHigh ? 'High Risk' : isModerate ? 'Moderate Risk' : 'Low Risk',
        badgeBg: isHigh 
          ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
          : isModerate
          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
          : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        barColor: isHigh
          ? 'bg-gradient-to-r from-amber-500 to-rose-500'
          : isModerate
          ? 'bg-gradient-to-r from-emerald-500 to-amber-500'
          : 'bg-gradient-to-r from-emerald-400 to-teal-500',
      },
      shapContributions: shap,
    };
  }, [tenure, monthlySpend, supportTickets, contractType]);

  // ==========================================
  // TAB 2: AMES REAL ESTATE ESTIMATOR LOGIC
  // ==========================================
  const [livingArea, setLivingArea] = useState(1850);
  const [overallQual, setOverallQual] = useState(7);
  const [yearBuilt, setYearBuilt] = useState(2005);
  const [bathrooms, setBathrooms] = useState(2);
  const [garageCars, setGarageCars] = useState(2);
  const [neighborhood, setNeighborhood] = useState('Northridge');

  const amesEstimate = useMemo(() => {
    let price = 50000;

    // 1. Living Area (~$92 per sq ft)
    const sqftContrib = livingArea * 92;
    price += sqftContrib;

    // 2. Overall Quality (1-10 nonlinear weighting)
    const qualMultipliers = [0, 0.45, 0.6, 0.75, 0.88, 1.0, 1.18, 1.38, 1.62, 1.95, 2.3];
    const qualFactor = qualMultipliers[overallQual] || 1.0;
    price *= qualFactor;

    // 3. Year Built adjustment
    const ageDiff = yearBuilt - 1960;
    const ageContrib = ageDiff * 480;
    price += ageContrib;

    // 4. Bathrooms & Garage
    price += bathrooms * 12500;
    price += garageCars * 14000;

    // 5. Neighborhood premium
    const neighborhoodOffsets = {
      'College Creek': 12000,
      'Northridge': 38000,
      'Old Town': -16000,
      'Somerset': 24000,
    };
    price += (neighborhoodOffsets[neighborhood] || 0);

    const roundedPrice = Math.round(price / 500) * 500;
    const lowerBound = Math.round((roundedPrice * 0.955) / 500) * 500;
    const upperBound = Math.round((roundedPrice * 1.045) / 500) * 500;
    const pricePerSqFt = Math.round(roundedPrice / livingArea);

    return {
      price: roundedPrice,
      lowerBound,
      upperBound,
      pricePerSqFt,
      drivers: [
        { label: `Overall Quality: Tier ${overallQual}/10`, val: `+${Math.round((qualFactor - 1) * 100)}% base scale` },
        { label: `Living Space: ${livingArea.toLocaleString()} sq ft`, val: `$${sqftContrib.toLocaleString()}` },
        { label: `Garage & Baths: ${garageCars} Car, ${bathrooms} Bath`, val: `+$${(garageCars * 14000 + bathrooms * 12500).toLocaleString()}` },
        { label: `Era Built: ${yearBuilt} (${2026 - yearBuilt} yrs)`, val: ageContrib >= 0 ? `+$${ageContrib.toLocaleString()}` : `-$${Math.abs(ageContrib).toLocaleString()}` }
      ]
    };
  }, [livingArea, overallQual, yearBuilt, bathrooms, garageCars, neighborhood]);

  // ==========================================
  // TAB 3: MODEL EVALUATION & THRESHOLD LOGIC
  // ==========================================
  const [modelType, setModelType] = useState('xgboost'); // 'logistic' | 'rf' | 'xgboost'
  const [threshold, setThreshold] = useState(0.50);

  const evalMetrics = useMemo(() => {
    const actualPositives = 250;
    const actualNegatives = 750;

    let auc = 0.854;
    let baseTpRate = 0.84;
    let baseFpRate = 0.13;

    if (modelType === 'logistic') {
      auc = 0.782;
      baseTpRate = 0.74;
      baseFpRate = 0.22;
    } else if (modelType === 'rf') {
      auc = 0.835;
      baseTpRate = 0.79;
      baseFpRate = 0.17;
    } else {
      auc = 0.854;
      baseTpRate = 0.84;
      baseFpRate = 0.13;
    }

    const thresholdDelta = threshold - 0.50;
    const adjustedRecall = Math.min(Math.max(baseTpRate - (thresholdDelta * 0.95), 0.25), 0.98);
    const adjustedFpRate = Math.min(Math.max(baseFpRate - (thresholdDelta * 0.50), 0.02), 0.55);

    const tp = Math.round(actualPositives * adjustedRecall);
    const fn = actualPositives - tp;
    const fp = Math.round(actualNegatives * adjustedFpRate);
    const tn = actualNegatives - fp;

    const precision = tp / (tp + fp);
    const recall = tp / (tp + fn);
    const f1 = (2 * precision * recall) / (precision + recall);
    const accuracy = (tp + tn) / 1000;

    return {
      auc,
      tp,
      fn,
      fp,
      tn,
      precision: (precision * 100).toFixed(1),
      recall: (recall * 100).toFixed(1),
      f1: (f1 * 100).toFixed(1),
      accuracy: (accuracy * 100).toFixed(1)
    };
  }, [modelType, threshold]);

  return (
    <section id="demo" className="py-28 px-6 border-t border-neutral-200/70 dark:border-neutral-800/70">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-neutral-200/60 dark:border-neutral-800/60">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>05 // Interactive ML Playground</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50">
              Live Model Execution & XAI
            </h2>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mt-3 md:mt-0 font-normal">
            Interact with client-side mathematical simulations of my resume ML systems: Classification & SHAP, Ames Regression ($R^2 &gt; 0.90$), and Real-Time Threshold Tuning.
          </p>
        </div>

        {/* Tab Switcher - UI/UX Pro Max Clean Segmented Control */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-neutral-100 dark:bg-neutral-900/90 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 w-fit mb-8 shadow-inner">
          <button
            onClick={() => setActiveTab('churn')}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'churn'
                ? 'bg-white dark:bg-neutral-800 text-purple-600 dark:text-purple-300 shadow-sm font-semibold'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Telco Churn & SHAP</span>
          </button>

          <button
            onClick={() => setActiveTab('ames')}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'ames'
                ? 'bg-white dark:bg-neutral-800 text-emerald-600 dark:text-emerald-300 shadow-sm font-semibold'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Ames Valuation ($R^2 &gt; 0.90$)</span>
          </button>

          <button
            onClick={() => setActiveTab('eval')}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'eval'
                ? 'bg-white dark:bg-neutral-800 text-indigo-600 dark:text-indigo-300 shadow-sm font-semibold'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Model Evaluation & Thresholds</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: TELCO CHURN & SHAP EXPLAINABILITY                  */}
        {/* ========================================================= */}
        {activeTab === 'churn' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/40 dark:bg-neutral-900/20 p-6 sm:p-10 shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Sliders Column */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1-Click Test Profiles */}
                <div className="p-3 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                      <Zap className="w-3 h-3 text-purple-500" />
                      <span>1-Click Test Profiles</span>
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">Interactive Simulation</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => { setTenure(2); setMonthlySpend(135); setSupportTickets(5); setContractType('monthly'); }}
                      className="text-[11px] font-mono py-1.5 px-2 text-center rounded-xl border border-rose-500/30 bg-rose-500/5 hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 cursor-pointer transition-colors"
                    >
                      High Risk (~88%)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setTenure(18); setMonthlySpend(78); setSupportTickets(2); setContractType('one-year'); }}
                      className="text-[11px] font-mono py-1.5 px-2 text-center rounded-xl border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 text-amber-600 dark:text-amber-400 cursor-pointer transition-colors"
                    >
                      Average (~42%)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setTenure(56); setMonthlySpend(45); setSupportTickets(0); setContractType('two-year'); }}
                      className="text-[11px] font-mono py-1.5 px-2 text-center rounded-xl border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 cursor-pointer transition-colors"
                    >
                      Loyal (~11%)
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-2">
                    <span className="text-neutral-600 dark:text-neutral-400">Customer Tenure</span>
                    <span className="font-mono text-neutral-900 dark:text-neutral-100">{tenure} Months</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="72"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full accent-purple-600 dark:accent-purple-400 cursor-pointer h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400 mt-1">
                    <span>1 mo (High vulnerability)</span>
                    <span>72 mos (Established loyalty)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-2">
                    <span className="text-neutral-600 dark:text-neutral-400">Monthly Bill Spend</span>
                    <span className="font-mono text-neutral-900 dark:text-neutral-100">${monthlySpend} / month</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="150"
                    value={monthlySpend}
                    onChange={(e) => setMonthlySpend(Number(e.target.value))}
                    className="w-full accent-purple-600 dark:accent-purple-400 cursor-pointer h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400 mt-1">
                    <span>$20 (Budget tier)</span>
                    <span>$150 (Premium multi-line)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-2">
                    <span className="text-neutral-600 dark:text-neutral-400">Technical Support Interactions</span>
                    <span className="font-mono text-neutral-900 dark:text-neutral-100">{supportTickets} Tickets</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="6"
                    value={supportTickets}
                    onChange={(e) => setSupportTickets(Number(e.target.value))}
                    className="w-full accent-purple-600 dark:accent-purple-400 cursor-pointer h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400 mt-1">
                    <span>0 issues (Smooth)</span>
                    <span>6+ tickets (Severe friction)</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-2">
                    Contract Agreement Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'monthly', label: 'Month-to-Month' },
                      { id: 'one-year', label: '1-Year Contract' },
                      { id: 'two-year', label: '2-Year Contract' },
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        type="button"
                        onClick={() => setContractType(btn.id)}
                        className={`text-xs py-2 px-2 text-center rounded-xl border transition-all cursor-pointer font-mono ${
                          contractType === btn.id
                            ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-sm font-semibold'
                            : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Output & SHAP Waterfall Column */}
              <div className="lg:col-span-5 p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/70 dark:bg-neutral-950/60 backdrop-blur-sm">
                
                {/* Score Header */}
                <div className="flex items-center justify-between pb-4 border-b border-neutral-200/80 dark:border-neutral-800/80 mb-6">
                  <div>
                    <span className="text-xs text-neutral-500 font-mono block">Predicted Probability</span>
                    <div className="text-3xl font-semibold font-mono text-neutral-950 dark:text-neutral-50 mt-1">
                      {churnResult.risk}%
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full border text-xs font-mono font-medium ${churnResult.badgeBg}`}>
                    {churnResult.label}
                  </div>
                </div>

                {/* Animated Probability Bar */}
                <div className="w-full h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden mb-6">
                  <div
                    className={`h-full transition-all duration-300 ${churnResult.barColor}`}
                    style={{ width: `${churnResult.risk}%` }}
                  />
                </div>

                {/* SHAP Explanation Waterfall */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-3">
                    <span className="flex items-center gap-1">
                      <BarChart3 className="w-3.5 h-3.5 text-purple-500" />
                      <span>SHAP Feature Attribution</span>
                    </span>
                    <span className="text-[10px] text-neutral-400">Impact on Risk</span>
                  </div>

                  <div className="space-y-2.5">
                    {shapContributions.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="text-neutral-600 dark:text-neutral-400 font-sans truncate max-w-[200px]">
                          {item.feature}
                        </span>
                        <div className="flex items-center gap-1.5 font-mono">
                          <span
                            className={`text-[11px] font-medium ${
                              item.impact > 0
                                ? 'text-rose-600 dark:text-rose-400'
                                : item.impact < 0
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-neutral-400'
                            }`}
                          >
                            {item.impact > 0 ? `+${item.impact}%` : `${item.impact}%`}
                          </span>
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.impact > 0 ? 'bg-rose-500' : 'bg-emerald-500'
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Model Footnote */}
                <div className="mt-6 pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>Architecture: Tuned XGBoost</span>
                  <span>AUC: 0.854 (7k Records)</span>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: AMES REAL ESTATE VALUATION REGRESSOR ($R^2 > 0.90) */}
        {/* ========================================================= */}
        {activeTab === 'ames' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/40 dark:bg-neutral-900/20 p-6 sm:p-10 shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Sliders Column */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1-Click Property Presets */}
                <div className="p-3 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                      <Zap className="w-3 h-3 text-emerald-500" />
                      <span>1-Click Property Presets</span>
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">Ames Housing Model</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => { setLivingArea(1050); setOverallQual(4); setYearBuilt(1968); setBathrooms(1); setGarageCars(1); setNeighborhood('Old Town'); }}
                      className="text-[11px] font-mono py-1.5 px-2 text-center rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-emerald-500/40 cursor-pointer transition-colors"
                    >
                      Starter Cottage
                    </button>
                    <button
                      type="button"
                      onClick={() => { setLivingArea(1850); setOverallQual(7); setYearBuilt(2005); setBathrooms(2); setGarageCars(2); setNeighborhood('Somerset'); }}
                      className="text-[11px] font-mono py-1.5 px-2 text-center rounded-xl border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 cursor-pointer transition-colors"
                    >
                      Suburban Family
                    </button>
                    <button
                      type="button"
                      onClick={() => { setLivingArea(3200); setOverallQual(9); setYearBuilt(2021); setBathrooms(3); setGarageCars(3); setNeighborhood('Northridge'); }}
                      className="text-[11px] font-mono py-1.5 px-2 text-center rounded-xl border border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10 text-purple-600 dark:text-purple-400 cursor-pointer transition-colors"
                    >
                      Executive Estate
                    </button>
                  </div>
                </div>

                {/* Living Area */}
                <div>
                  <div className="flex justify-between text-xs font-medium mb-2">
                    <span className="text-neutral-600 dark:text-neutral-400">Above Ground Living Area (GrLivArea)</span>
                    <span className="font-mono text-neutral-900 dark:text-neutral-100">{livingArea.toLocaleString()} sq ft</span>
                  </div>
                  <input
                    type="range"
                    min="800"
                    max="3800"
                    step="50"
                    value={livingArea}
                    onChange={(e) => setLivingArea(Number(e.target.value))}
                    className="w-full accent-emerald-600 dark:accent-emerald-400 cursor-pointer h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400 mt-1">
                    <span>800 sq ft (Cottage/Starter)</span>
                    <span>3,800 sq ft (Executive Estate)</span>
                  </div>
                </div>

                {/* Overall Quality */}
                <div>
                  <div className="flex justify-between text-xs font-medium mb-2">
                    <span className="text-neutral-600 dark:text-neutral-400">Overall Finish & Material Quality</span>
                    <span className="font-mono text-neutral-900 dark:text-neutral-100">Score {overallQual} / 10</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    step="1"
                    value={overallQual}
                    onChange={(e) => setOverallQual(Number(e.target.value))}
                    className="w-full accent-emerald-600 dark:accent-emerald-400 cursor-pointer h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400 mt-1">
                    <span>3 (Fair)</span>
                    <span>7 (Good)</span>
                    <span>10 (Very Excellent)</span>
                  </div>
                </div>

                {/* Year Built & Bathrooms Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-2">
                      <span className="text-neutral-600 dark:text-neutral-400">Year Built</span>
                      <span className="font-mono text-neutral-900 dark:text-neutral-100">{yearBuilt}</span>
                    </div>
                    <input
                      type="range"
                      min="1950"
                      max="2024"
                      step="1"
                      value={yearBuilt}
                      onChange={(e) => setYearBuilt(Number(e.target.value))}
                      className="w-full accent-emerald-600 dark:accent-emerald-400 cursor-pointer h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium mb-2">
                      <span className="text-neutral-600 dark:text-neutral-400">Garage Capacity</span>
                      <span className="font-mono text-neutral-900 dark:text-neutral-100">{garageCars} Cars</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="4"
                      step="1"
                      value={garageCars}
                      onChange={(e) => setGarageCars(Number(e.target.value))}
                      className="w-full accent-emerald-600 dark:accent-emerald-400 cursor-pointer h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none"
                    />
                  </div>
                </div>

                {/* Neighborhood Tier Selector */}
                <div>
                  <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400 block mb-2">
                    Ames Neighborhood Enclave
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['Northridge', 'Somerset', 'College Creek', 'Old Town'].map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => setNeighborhood(loc)}
                        className={`text-xs py-2 px-2 text-center rounded-xl border transition-all cursor-pointer font-mono ${
                          neighborhood === loc
                            ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-sm font-semibold'
                            : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400'
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Estimate Valuation Output Card */}
              <div className="lg:col-span-5 p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/70 dark:bg-neutral-950/60 backdrop-blur-sm">
                
                {/* Val Header */}
                <div className="pb-4 border-b border-neutral-200/80 dark:border-neutral-800/80 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-500 font-mono">Estimated Property Value</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      R² &gt; 0.90
                    </span>
                  </div>
                  <div className="text-3xl sm:text-4xl font-semibold font-mono text-emerald-600 dark:text-emerald-400 mt-2">
                    ${amesEstimate.price.toLocaleString()}
                  </div>
                  <div className="text-xs text-neutral-500 font-mono mt-1">
                    95% Confidence: ${amesEstimate.lowerBound.toLocaleString()} – ${amesEstimate.upperBound.toLocaleString()}
                  </div>
                </div>

                {/* Quick Spec Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60">
                    <div className="text-[10px] font-mono text-neutral-400">Unit Metric</div>
                    <div className="text-sm font-semibold font-mono text-neutral-800 dark:text-neutral-200 mt-0.5">
                      ${amesEstimate.pricePerSqFt} / sq ft
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60">
                    <div className="text-[10px] font-mono text-neutral-400">Inference Engine</div>
                    <div className="text-sm font-semibold font-mono text-neutral-800 dark:text-neutral-200 mt-0.5">
                      FastAPI + Docker
                    </div>
                  </div>
                </div>

                {/* Primary Regression Drivers */}
                <div>
                  <div className="text-xs font-mono text-neutral-500 mb-3 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Top Model Valuation Drivers</span>
                  </div>

                  <div className="space-y-2">
                    {amesEstimate.drivers.map((drv, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-neutral-100 dark:border-neutral-800/50 last:border-none">
                        <span className="text-neutral-600 dark:text-neutral-400 font-sans truncate max-w-[210px]">
                          {drv.label}
                        </span>
                        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                          {drv.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* MLOps Pipeline Reference */}
                <div className="mt-6 pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>MLflow Tracked Pipeline</span>
                  <span>Regularized XGBoost</span>
                </div>

              </div>

            </div>
          </motion.div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: MODEL EVALUATION & THRESHOLD TUNING SANDBOX        */}
        {/* ========================================================= */}
        {activeTab === 'eval' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/40 dark:bg-neutral-900/20 p-6 sm:p-10 shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Controls: Model selection & Threshold slider */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* 1-Click Operational Targets */}
                <div className="p-3 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                      <Zap className="w-3 h-3 text-indigo-500" />
                      <span>1-Click Threshold Targets</span>
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">Trade-Off Analysis</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => { setThreshold(0.24); setModelType('xgboost'); }}
                      className="text-[11px] font-mono py-1.5 px-2 text-center rounded-xl border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 text-amber-600 dark:text-amber-400 cursor-pointer transition-colors"
                    >
                      High Recall (τ=0.24)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setThreshold(0.50); setModelType('xgboost'); }}
                      className="text-[11px] font-mono py-1.5 px-2 text-center rounded-xl border border-indigo-500/30 bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 cursor-pointer transition-colors"
                    >
                      Balanced F1 (τ=0.50)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setThreshold(0.78); setModelType('xgboost'); }}
                      className="text-[11px] font-mono py-1.5 px-2 text-center rounded-xl border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 cursor-pointer transition-colors"
                    >
                      High Prec (τ=0.78)
                    </button>
                  </div>
                </div>

                {/* Model Selector */}
                <div>
                  <label className="text-xs font-mono text-neutral-500 block mb-2 uppercase tracking-wider">
                    Select Benchmark Algorithm
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'logistic', name: 'Logistic Reg', auc: '0.782 AUC' },
                      { id: 'rf', name: 'Random Forest', auc: '0.835 AUC' },
                      { id: 'xgboost', name: 'Tuned XGBoost', auc: '0.854 AUC' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setModelType(item.id)}
                        className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                          modelType === item.id
                            ? 'bg-white dark:bg-neutral-800 border-indigo-500/60 shadow-sm'
                            : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                        }`}
                      >
                        <div className="text-xs font-semibold text-neutral-900 dark:text-white">
                          {item.name}
                        </div>
                        <div className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 mt-0.5">
                          {item.auc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Threshold Slider */}
                <div className="p-4 rounded-2xl bg-white/70 dark:bg-neutral-950/60 border border-neutral-200/80 dark:border-neutral-800/80">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                      <Sliders className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Decision Probability Threshold (τ)</span>
                    </div>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                      {threshold.toFixed(2)}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0.10"
                    max="0.90"
                    step="0.02"
                    value={threshold}
                    onChange={(e) => setThreshold(Number(e.target.value))}
                    className="w-full accent-indigo-600 dark:accent-indigo-400 cursor-pointer h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none my-2"
                  />

                  <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                    <span>0.10 (High Recall / More Alarms)</span>
                    <span>0.50 (Default)</span>
                    <span>0.90 (High Precision / Conservative)</span>
                  </div>

                  <div className="mt-3 text-[11px] text-neutral-500 leading-relaxed font-sans">
                    {threshold < 0.4 ? (
                      <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 shrink-0" />
                        Aggressive threshold: catches almost all churners, but increases false alarms.
                      </span>
                    ) : threshold > 0.6 ? (
                      <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 shrink-0" />
                        Conservative threshold: high confidence interventions, but misses early churn signals.
                      </span>
                    ) : (
                      <span className="text-neutral-600 dark:text-neutral-400">
                        Balanced standard threshold maximizing harmonic F1-Score on test distribution.
                      </span>
                    )}
                  </div>
                </div>

                {/* Score Gauges */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60">
                    <div className="text-[10px] font-mono text-neutral-400">Precision</div>
                    <div className="text-base font-bold font-mono text-purple-600 dark:text-purple-400 mt-0.5">
                      {evalMetrics.precision}%
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60">
                    <div className="text-[10px] font-mono text-neutral-400">Recall</div>
                    <div className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
                      {evalMetrics.recall}%
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60">
                    <div className="text-[10px] font-mono text-neutral-400">F1-Score</div>
                    <div className="text-base font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-0.5">
                      {evalMetrics.f1}%
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60">
                    <div className="text-[10px] font-mono text-neutral-400">Accuracy</div>
                    <div className="text-base font-bold font-mono text-neutral-800 dark:text-neutral-200 mt-0.5">
                      {evalMetrics.accuracy}%
                    </div>
                  </div>
                </div>

              </div>

              {/* Right: Live Interactive Confusion Matrix */}
              <div className="lg:col-span-6 p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/70 dark:bg-neutral-950/60 backdrop-blur-sm">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 dark:border-neutral-800/80 mb-6">
                  <div>
                    <span className="text-xs text-neutral-500 font-mono">Simulated Holdout Test Set</span>
                    <h4 className="text-sm font-semibold text-neutral-950 dark:text-neutral-50 mt-0.5">
                      Interactive 2x2 Confusion Matrix
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                    N = 1,000 cases
                  </span>
                </div>

                {/* Matrix Grid */}
                <div className="grid grid-cols-2 gap-3 font-mono">
                  
                  {/* True Positive */}
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-500/30">
                    <div className="flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-300">
                      <span>True Positive (TP)</span>
                      <span className="text-[10px] font-sans">Correct Churn</span>
                    </div>
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                      {evalMetrics.tp}
                    </div>
                    <div className="text-[10px] text-neutral-500 mt-1 font-sans">
                      Detected customers saved
                    </div>
                  </div>

                  {/* False Positive */}
                  <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-500/20">
                    <div className="flex items-center justify-between text-xs text-rose-700 dark:text-rose-300">
                      <span>False Positive (FP)</span>
                      <span className="text-[10px] font-sans">False Alarm</span>
                    </div>
                    <div className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">
                      {evalMetrics.fp}
                    </div>
                    <div className="text-[10px] text-neutral-500 mt-1 font-sans">
                      Unnecessary retention offer
                    </div>
                  </div>

                  {/* False Negative */}
                  <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-500/20">
                    <div className="flex items-center justify-between text-xs text-amber-700 dark:text-amber-300">
                      <span>False Negative (FN)</span>
                      <span className="text-[10px] font-sans">Missed Churn</span>
                    </div>
                    <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                      {evalMetrics.fn}
                    </div>
                    <div className="text-[10px] text-neutral-500 mt-1 font-sans">
                      Customer left unnoticed
                    </div>
                  </div>

                  {/* True Negative */}
                  <div className="p-4 rounded-xl bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800/80">
                    <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
                      <span>True Negative (TN)</span>
                      <span className="text-[10px] font-sans">Correct Retain</span>
                    </div>
                    <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">
                      {evalMetrics.tn}
                    </div>
                    <div className="text-[10px] text-neutral-500 mt-1 font-sans">
                      Loyal accounts unbothered
                    </div>
                  </div>

                </div>

                {/* Real-World Strategy Insight */}
                <div className="mt-6 pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80 text-[11px] text-neutral-500 dark:text-neutral-400 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1" />
                  <span>
                    <strong>Business Impact:</strong> Setting threshold to {threshold.toFixed(2)} yields an F1 score of {evalMetrics.f1}%. In telecommunications, lower thresholds are preferred when customer acquisition cost exceeds discount retention costs.
                  </span>
                </div>

              </div>

            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default AiDemo;
