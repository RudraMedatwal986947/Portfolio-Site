import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Activity, Zap, CheckCircle2 } from 'lucide-react';

const NeuralTensorGraphic = () => {
  const [activeLayer, setActiveLayer] = useState(1);

  const layers = [
    {
      id: 0,
      name: 'Input Embedding',
      dims: '[Batch, 512, 768]',
      operation: 'Token + Position Vectorization',
      color: 'purple',
    },
    {
      id: 1,
      name: 'Multi-Head Attention',
      dims: '12 Heads • d_k=64',
      operation: 'Scaled Dot-Product Attention',
      color: 'emerald',
    },
    {
      id: 2,
      name: 'Feed-Forward Network',
      dims: 'Hidden: 3072 • SwiGLU',
      operation: 'Non-Linear Latent Mapping',
      color: 'purple',
    },
    {
      id: 3,
      name: 'Output Projection',
      dims: '[Batch, 512, Classes]',
      operation: 'Softmax Probability Head',
      color: 'emerald',
    },
  ];

  return (
    <div className="w-full max-w-md rounded-3xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-xl shadow-xl shadow-neutral-900/5 dark:shadow-black/40 overflow-hidden relative">
      {/* Subtle ambient gradients */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Terminal Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/80 dark:bg-neutral-900/80">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300">
            neural_graph.py
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/20">
            PyTorch 2.4
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20">
            CUDA:0
          </span>
        </div>
      </div>

      {/* Vector Architecture Visualization */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
            Architecture Pipeline
          </span>
          <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
            Precision: FP16
          </span>
        </div>

        {/* Minimalist Node Flow */}
        <div className="space-y-3 relative">
          {layers.map((layer, index) => {
            const isSelected = activeLayer === layer.id;
            const isPurple = layer.color === 'purple';

            return (
              <div
                key={layer.id}
                onMouseEnter={() => setActiveLayer(layer.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? isPurple
                      ? 'border-purple-500/50 bg-purple-50/50 dark:bg-purple-950/20 shadow-sm'
                      : 'border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-sm'
                    : 'border-neutral-200/60 dark:border-neutral-800/60 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white/50 dark:bg-neutral-900/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isPurple ? 'bg-purple-500' : 'bg-emerald-500'
                      }`}
                    />
                    <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 font-mono">
                      {layer.name}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                    {layer.dims}
                  </span>
                </div>

                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 pl-3.5">
                  {layer.operation}
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Tensor Telemetry Chips */}
        <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-neutral-200/80 dark:border-neutral-800/80 text-center">
          <div className="p-2 rounded-xl bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60">
            <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
              0.0384
            </div>
            <div className="text-[10px] text-neutral-500">CrossEntropy</div>
          </div>

          <div className="p-2 rounded-xl bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60">
            <div className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
              98.6%
            </div>
            <div className="text-[10px] text-neutral-500">Top-1 Accuracy</div>
          </div>

          <div className="p-2 rounded-xl bg-neutral-100/70 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60">
            <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
              14.2ms
            </div>
            <div className="text-[10px] text-neutral-500">Latency</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralTensorGraphic;
