import { useState } from "react";
import Footer from "./components/layout/Footer";
import Loader from "./components/layout/Loader";
import Navbar from "./components/layout/Navbar";
import ScrollProgress from "./components/layout/ScrollProgress";
import About from "./components/sections/About";
import Stats from "./components/sections/Stats";
import Contact from "./components/sections/Contact";
import Experience from "./components/sections/Experience";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <div className={loading ? "overflow-hidden" : ""}>
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
