import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  FileText, 
  Code, 
  Sun, 
  Moon, 
  Mail, 
  ExternalLink, 
  ArrowRight, 
  Sparkles, 
  Activity,
  Layers,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { useTheme } from '../context/useTheme';
import { personalInfo } from '../data/personalInfo';
import { LinkedinIcon, GithubIcon } from './SocialIcons';

const CommandPalette = ({ isOpen, onClose, onOpenResume }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { theme, toggleTheme } = useTheme();

  const commands = [
    {
      id: 'resume',
      title: 'View Official Resume',
      category: 'Recruiter Actions',
      icon: FileText,
      color: 'text-purple-500',
      action: () => {
        onClose();
        if (onOpenResume) onOpenResume();
      },
    },
    {
      id: 'ames-project',
      title: 'Ames Housing MLOps System (R² > 0.90)',
      category: 'Projects',
      icon: Code,
      color: 'text-purple-500',
      action: () => {
        onClose();
        window.location.hash = 'projects';
      },
    },
    {
      id: 'churn-project',
      title: 'Customer Churn & CLV Platform (80.8% Acc)',
      category: 'Projects',
      icon: Code,
      color: 'text-emerald-500',
      action: () => {
        onClose();
        window.location.hash = 'projects';
      },
    },
    {
      id: 'loan-project',
      title: 'Loan Default Prediction (Credit Risk ML)',
      category: 'Projects',
      icon: Code,
      color: 'text-indigo-500',
      action: () => {
        onClose();
        window.location.hash = 'projects';
      },
    },
    {
      id: 'playground',
      title: 'Interactive Model Execution & XAI Playground',
      category: 'Demos',
      icon: Activity,
      color: 'text-purple-500',
      action: () => {
        onClose();
        window.location.hash = 'demo';
      },
    },
    {
      id: 'experience',
      title: 'Work Experience & Internship',
      category: 'Navigation',
      icon: Briefcase,
      color: 'text-emerald-500',
      action: () => {
        onClose();
        window.location.hash = 'experience';
      },
    },
    {
      id: 'stack',
      title: 'Technical Stack & MLOps Tooling',
      category: 'Navigation',
      icon: Layers,
      color: 'text-purple-500',
      action: () => {
        onClose();
        window.location.hash = 'skills';
      },
    },
    {
      id: 'education',
      title: 'Education & Certifications',
      category: 'Navigation',
      icon: GraduationCap,
      color: 'text-emerald-500',
      action: () => {
        onClose();
        window.location.hash = 'education';
      },
    },
    {
      id: 'email',
      title: `Send Email to Rudra (${personalInfo.email})`,
      category: 'Contact',
      icon: Mail,
      color: 'text-purple-500',
      action: () => {
        onClose();
        window.location.href = `mailto:${personalInfo.email}`;
      },
    },
    {
      id: 'github',
      title: 'Open GitHub Profile',
      category: 'External',
      icon: GithubIcon,
      color: 'text-neutral-500',
      action: () => {
        onClose();
        window.open(personalInfo.github, '_blank');
      },
    },
    {
      id: 'linkedin',
      title: 'Open LinkedIn Profile',
      category: 'External',
      icon: LinkedinIcon,
      color: 'text-emerald-500',
      action: () => {
        onClose();
        window.open(personalInfo.linkedin, '_blank');
      },
    },
    {
      id: 'theme',
      title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      category: 'Appearance',
      icon: theme === 'dark' ? Sun : Moon,
      color: 'text-amber-500',
      action: () => {
        toggleTheme();
        onClose();
      },
    },
  ];

  const filteredCommands = query
    ? commands.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-neutral-950/60 backdrop-blur-md"
        />

        {/* Command Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: -10 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[75vh]"
        >
          {/* Search Input */}
          <div className="p-4 sm:px-6 border-b border-neutral-200/80 dark:border-neutral-800/80 flex items-center gap-3 bg-neutral-50/50 dark:bg-neutral-950/40">
            <Search className="w-4 h-4 text-neutral-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, skills, resume, commands..."
              className="w-full text-sm font-sans bg-transparent border-none text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none"
            />
            <kbd className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono text-neutral-400 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto p-2 divide-y divide-transparent">
            {filteredCommands.length === 0 ? (
              <div className="p-8 text-center text-sm font-mono text-neutral-400">
                No matching results found.
              </div>
            ) : (
              filteredCommands.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? 'bg-purple-500/10 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800/80 ${item.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-medium">{item.title}</div>
                        <div className="text-[10px] font-mono text-neutral-400">{item.category}</div>
                      </div>
                    </div>

                    <ArrowRight
                      className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${
                        isSelected ? 'translate-x-0.5 text-purple-600 dark:text-purple-400' : 'opacity-0'
                      }`}
                    />
                  </button>
                );
              })
            )}
          </div>

          {/* Bottom Shortcuts Legend */}
          <div className="p-3 px-6 border-t border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-950/40 text-[11px] font-mono text-neutral-400 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
            </div>
            <span>Spotlight Launcher</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CommandPalette;
