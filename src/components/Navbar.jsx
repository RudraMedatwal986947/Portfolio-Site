import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/useTheme';
import { personalInfo } from '../data/personalInfo';
import { LinkedinIcon, GithubIcon } from './SocialIcons';

const Navbar = ({ onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Stack', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Demo', href: '#demo' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-neutral-200/60 dark:border-neutral-800/60 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        {/* Brand */}
        <a href="#home" className="flex items-center gap-2 group">
          <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover:bg-purple-500 group-hover:scale-125 transition-all" />
          <span className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 font-mono">
            {personalInfo.name.toLowerCase()} <span className="text-purple-600 dark:text-purple-400 font-normal">/ ds & ai</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium tracking-wide">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Controls & Resume CTA */}
        <div className="hidden md:flex items-center gap-2.5">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-full text-neutral-500 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all cursor-pointer"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 rounded-full text-neutral-500 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all cursor-pointer"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all cursor-pointer"
            title={theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-700" />
            )}
          </button>

          {/* Resume PDF Download/View Button */}
          <button
            onClick={onOpenResume}
            className="text-xs font-mono font-medium px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30 hover:bg-purple-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Preview Official Resume"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>

          <a
            href="#contact"
            className="text-xs font-medium px-3.5 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-800 hover:border-purple-500/40 dark:hover:border-emerald-500/40 text-neutral-800 dark:text-neutral-200 transition-all cursor-pointer"
          >
            Contact
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full text-neutral-500 dark:text-neutral-400 cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open menu"
            className="p-2 text-neutral-700 dark:text-neutral-300 cursor-pointer"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800 px-6 py-6"
          >
            <div className="flex flex-col gap-4 text-sm font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
                >
                  {link.name}
                </a>
              ))}
              
              <div className="flex items-center justify-between pt-3 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-4">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (onOpenResume) onOpenResume();
                  }}
                  className="flex items-center gap-1.5 text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Resume</span>
                </button>
              </div>

              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-1 text-center text-xs py-2.5 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium"
              >
                Get in touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
