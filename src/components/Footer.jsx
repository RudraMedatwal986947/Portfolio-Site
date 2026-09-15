import React, { useState, useEffect } from 'react';
import { ArrowUp, Clock, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import { LinkedinIcon, GithubIcon } from './SocialIcons';

const Footer = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Formatted in Indian Standard Time (IST)
      const istString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setTime(`${istString} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-14 px-6 border-t border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-950/40 text-xs text-neutral-500">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Identity & Status Beacon */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono font-medium text-neutral-800 dark:text-neutral-200">
              {personalInfo.name}
            </span>
            <span className="text-neutral-400">/</span>
            <span className="text-purple-600 dark:text-purple-400 font-mono">
              {personalInfo.role}
            </span>
          </div>

          <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">•</span>

          <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
            Available for Hiring
          </span>
        </div>

        {/* Right: Local Clock, Socials & Back to Top */}
        <div className="flex items-center gap-5">
          {time && (
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-neutral-400 bg-neutral-100 dark:bg-neutral-900 px-2.5 py-1 rounded-full border border-neutral-200/60 dark:border-neutral-800/60">
              <Clock className="w-3 h-3 text-purple-500" />
              <span>{time}</span>
            </div>
          )}

          <div className="flex items-center gap-2.5">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-neutral-500 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all hover:-translate-y-0.5"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-neutral-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all hover:-translate-y-0.5"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>

          <span className="font-mono text-[11px]">&copy; {new Date().getFullYear()}</span>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-purple-500/40 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all hover:-translate-y-0.5 shadow-xs cursor-pointer"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

