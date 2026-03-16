import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTheme } from "../App";

export default function Navbar() {
  const navRef = useRef(null);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      delay: 0.2,
    });
  }, []);

  // Magnetic effect
  const handleMagnetic = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
  };

  const handleMagneticLeave = (e) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex items-center justify-between"
    >
      {/* Logo */}
      <a
        href="#"
        className="font-display text-lg md:text-xl font-700 tracking-tight"
        data-cursor="pointer"
        onMouseMove={handleMagnetic}
        onMouseLeave={handleMagneticLeave}
      >
        ZeroDev<span className="text-accent">.</span>
      </a>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-8 font-body text-sm tracking-wide">
        {["About", "Services", "Work", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="relative group"
            data-cursor="pointer"
            onMouseMove={handleMagnetic}
            onMouseLeave={handleMagneticLeave}
          >
            {item}
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="magnetic-btn relative w-14 h-7 rounded-full border border-current/30 flex items-center px-1 transition-colors"
        data-cursor="pointer"
        onMouseMove={handleMagnetic}
        onMouseLeave={handleMagneticLeave}
        aria-label="Toggle theme"
      >
        <div
          className="w-5 h-5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] flex items-center justify-center text-xs"
          style={{
            transform: isDark ? "translateX(0px)" : "translateX(24px)",
            backgroundColor: isDark ? "#fff" : "#0a0a0a",
            color: isDark ? "#0a0a0a" : "#fff",
          }}
        >
          {isDark ? "☽" : "☀"}
        </div>
      </button>
    </nav>
  );
}