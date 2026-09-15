import React from 'react';
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

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white text-neutral-900 dark:bg-[#050505] dark:text-neutral-100 transition-colors duration-300 antialiased font-sans selection:bg-neutral-200 dark:selection:bg-neutral-800">
        <Navbar />
        <main>
          <Hero />
          <Projects />
          <Experience />
          <Skills />
          <Education />
          <AiDemo />
          <Pipeline />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
