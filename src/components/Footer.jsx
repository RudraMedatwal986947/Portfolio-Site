import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import { LinkedinIcon, GithubIcon } from './SocialIcons';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-6 border-t border-neutral-200/60 dark:border-neutral-800/60 text-xs text-neutral-500">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="font-mono text-neutral-700 dark:text-neutral-300">
            {personalInfo.name} // Portfolio
          </span>
          <span className="text-purple-600 dark:text-purple-400 font-normal">
            — {personalInfo.role}
          </span>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>
          </div>

          <span>&copy; {new Date().getFullYear()}</span>

          <button
            onClick={scrollToTop}
            className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-400 transition-colors cursor-pointer"
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
