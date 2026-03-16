import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../App";

export default function Contact() {
  const sectionRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = sectionRef.current?.querySelectorAll(".cta-char");
      gsap.from(chars, {
        y: "100%",
        opacity: 0,
        stagger: 0.03,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      const sub = sectionRef.current?.querySelector(".cta-sub");
      gsap.from(sub, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });

      const btn = sectionRef.current?.querySelector(".cta-btn");
      gsap.from(btn, {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Magnetic button
  const handleMagnetic = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      x: x * 0.4,
      y: y * 0.4,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMagneticLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  const ctaText = "Let's Build";
  const ctaText2 = "Something";
  const ctaText3 = "Amazing";

  const splitChars = (text) =>
    text.split("").map((char, i) => (
      <span key={i} className="cta-char inline-block overflow-hidden">
        <span className="inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative px-6 md:px-12 lg:px-24 py-32 md:py-48"
    >
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-6">
          <span className="font-body text-xs tracking-[0.3em] uppercase opacity-40">
            (04) — Contact
          </span>
        </div>

        <h2 className="font-display text-[10vw] md:text-[7vw] font-800 leading-[0.95] tracking-tighter">
          <span className="block">{splitChars(ctaText)}</span>
          <span className="block text-stroke">{splitChars(ctaText2)}</span>
          <span className="block">{splitChars(ctaText3)}</span>
        </h2>

        <p className="cta-sub font-body text-sm md:text-base opacity-50 mt-8 max-w-lg mx-auto leading-relaxed">
          Have a project in mind? We'd love to hear about it. Drop us a line
          and let's create something extraordinary together.
        </p>

        {/* CTA Button */}
        <div className="mt-16 flex justify-center">
          <a
            href="mailto:work.roopam05@gmail.com"
            className="cta-btn group relative inline-flex items-center justify-center w-40 h-40 md:w-48 md:h-48 rounded-full border border-current/20 font-display text-sm md:text-base font-600 tracking-wide"
            data-cursor="pointer"
            onMouseMove={handleMagnetic}
            onMouseLeave={handleMagneticLeave}
          >
            {/* Background fill */}
            <span
              className="absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]"
              style={{ backgroundColor: isDark ? "#fff" : "#0a0a0a" }}
            />
            <span
              className="relative z-10 transition-colors duration-500"
              style={{
                color: "inherit",
              }}
            >
              <span className="group-hover:text-[var(--bg-color)] transition-colors duration-300"
                style={{
                  color: undefined,
                }}
              >
                Get in Touch
              </span>
            </span>

            {/* Orbiting dot */}
            <span className="absolute w-2 h-2 rounded-full bg-accent animate-[spin_4s_linear_infinite]"
              style={{
                top: '0',
                left: '50%',
                transformOrigin: '0 80px',
              }}
            />
          </a>
        </div>

        {/* Email */}
        <div className="mt-16">
          <a
            href="mailto:work.roopam05@gmail.com"
            className="font-display text-lg md:text-2xl font-500 opacity-60 hover:opacity-100 transition-opacity relative group"
            data-cursor="pointer"
          >
            work.roopam05@gmail.com
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-current transition-all duration-500 group-hover:w-full" />
          </a>
        </div>
      </div>
    </section>
  );
}