import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../App";

const projects = [
  {
    title: "Meridian",
    category: "Web Application",
    year: "2024",
    color: "#5046e6",
  },
  {
    title: "Aether",
    category: "Brand Identity",
    year: "2024",
    color: "#e64650",
  },
  {
    title: "Luminary",
    category: "E-Commerce",
    year: "2023",
    color: "#46e650",
  },
  {
    title: "Prism",
    category: "Interactive Experience",
    year: "2023",
    color: "#e6a846",
  },
];

export default function Works() {
  const sectionRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = sectionRef.current?.querySelector(".section-title");
      gsap.from(title, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: title, start: "top 85%" },
      });

      const items = sectionRef.current?.querySelectorAll(".work-item");
      items?.forEach((item, i) => {
        gsap.from(item, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: { trigger: item, start: "top 90%" },
        });

        // Color reveal on hover
        const bg = item.querySelector(".work-bg");
        item.addEventListener("mouseenter", () => {
          gsap.to(bg, { scaleY: 1, duration: 0.5, ease: "power3.out" });
        });
        item.addEventListener("mouseleave", () => {
          gsap.to(bg, { scaleY: 0, duration: 0.5, ease: "power3.out" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative px-6 md:px-12 lg:px-24 py-32 md:py-48"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <span className="font-body text-xs tracking-[0.3em] uppercase opacity-40">
            (03) — Selected Work
          </span>
        </div>

        <h2 className="section-title font-display text-4xl md:text-6xl lg:text-7xl font-800 tracking-tighter mb-20 md:mb-28">
          Featured
          <br />
          <span className="text-stroke">projects</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <a
              key={i}
              href="#"
              className="work-item group relative block overflow-hidden rounded-2xl aspect-[4/3] border border-current/10"
              data-cursor="pointer"
            >
              {/* Colored background on hover */}
              <div
                className="work-bg absolute inset-0 origin-bottom"
                style={{
                  backgroundColor: project.color,
                  transform: "scaleY(0)",
                }}
              />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10">
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs tracking-wider opacity-50 group-hover:text-white group-hover:opacity-80 transition-all">
                    {project.category}
                  </span>
                  <span className="font-body text-xs tracking-wider opacity-50 group-hover:text-white group-hover:opacity-80 transition-all">
                    {project.year}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-800 tracking-tighter group-hover:text-white transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Arrow */}
                  <div className="mt-4 overflow-hidden h-6">
                    <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="1.5"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}