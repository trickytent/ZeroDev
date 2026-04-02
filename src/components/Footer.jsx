import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTheme } from "../App";

export default function Footer() {
  const footerRef = useRef(null);
  const { isDark } = useTheme();

  useGSAP(() => {
    gsap.from(footerRef.current?.querySelectorAll(".footer-item"), {
      y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
    });
  }, { scope: footerRef });

  const handleMagnetic = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power2.out" });
  };

  const handleMagneticLeave = (e) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
  };

  const socials = ["Twitter", "GitHub", "Dribbble", "LinkedIn"];
  const year = new Date().getFullYear();

  return (
    <footer ref={footerRef} className="relative px-6 md:px-12 lg:px-24 py-12 md:py-16 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black transition-colors duration-500">
      <div className="max-w-7xl mx-auto dark:text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="footer-item">
            <span className="font-display text-2xl md:text-3xl font-800 tracking-tighter">ZeroDev<span className="text-blue-500">.</span></span>
            <p className="font-body text-xs opacity-40 mt-2">Crafting digital experiences</p>
          </div>
          <div className="footer-item flex gap-6 md:gap-8">
            {socials.map((social) => (
              <a key={social} href="#" className="font-body text-sm opacity-50 hover:opacity-100 transition-opacity" data-cursor="pointer" onMouseMove={handleMagnetic} onMouseLeave={handleMagneticLeave}>{social}</a>
            ))}
          </div>
          <div className="footer-item">
            <p className="font-body text-xs opacity-30">© {year} ZeroDev Studio</p>
            <p className="font-body text-xs opacity-30">All rights reserved.</p>
          </div>
        </div>
        <div className="mt-16 md:mt-24 footer-item">
          <h2 className="font-display text-[15vw] md:text-[12vw] font-800 leading-none tracking-tighter opacity-5 select-none">ZeroDev</h2>
        </div>
      </div>
    </footer>
  );
}