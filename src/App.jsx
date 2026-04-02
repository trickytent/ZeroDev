import { useState, useEffect, createContext, useContext } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Services from "./components/Services";
import Works from "./components/Works";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Analytics } from '@vercel/analytics/react'; 
gsap.registerPlugin(ScrollTrigger);
<Analytics />
export const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

function App() {
  const [isDark, setIsDark] = useState(true);
  const [loading, setLoading] = useState(true);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Apply theme to body
  useEffect(() => {
    document.body.classList.toggle("dark", isDark);
    document.body.classList.toggle("light", !isDark);
  }, [isDark]);

  // Initialize smooth scroll
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {/* Grain overlay */}
      <div className="grain" />

      {/* Custom cursor */}
      <CustomCursor />

      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <main className="relative" style={{ cursor: "none" }}>
          <Navbar />
          <Hero />
          <Marquee />
          <About />
          <Services />
          <Works />
          <Contact />
          <Footer />
        </main>
      )}
    </ThemeContext.Provider>
  );
}

export default App;