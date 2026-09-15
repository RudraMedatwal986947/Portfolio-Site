import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import AiDemo from './components/AiDemo';
import Pipeline from './components/Pipeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import CommandPalette from './components/CommandPalette';

function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white text-neutral-900 dark:bg-[#050505] dark:text-neutral-100 transition-colors duration-300 antialiased font-sans selection:bg-neutral-200 dark:selection:bg-neutral-800">
        <Navbar 
          onOpenResume={() => setIsResumeOpen(true)} 
          onOpenPalette={() => setIsPaletteOpen(true)}
        />
        <main>
          <Hero onOpenResume={() => setIsResumeOpen(true)} />
          <Projects />
          <Experience />
          <Skills />
          <Education />
          <AiDemo />
          <Pipeline />
          <Contact />
        </main>
        <Footer />
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
        <CommandPalette
          isOpen={isPaletteOpen}
          onClose={() => setIsPaletteOpen(false)}
          onOpenResume={() => setIsResumeOpen(true)}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
