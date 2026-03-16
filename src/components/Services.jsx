import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../App";

const services = [
  {
    num: "01",
    title: "Web Development",
    desc: "Custom web applications built with cutting-edge frameworks. Performance-first architecture that scales.",
    tags: ["React", "Next.js", "Node.js"],
  },
  {
    num: "02",
    title: "Creative Design",
    desc: "Brand identities and digital experiences designed to captivate. From concept to pixel-perfect execution.",
    tags: ["UI/UX", "Branding", "Motion"],
  },
  {
    num: "03",
    title: "3D & Interactive",
    desc: "Immersive WebGL experiences, 3D product configurators, and interactive storytelling that stands out.",
    tags: ["Three.js", "WebGL", "GSAP"],
  },
  {
    num: "04",
    title: "Mobile Apps",
    desc: "Native and cross-platform applications engineered for performance and delightful user experiences.",
    tags: ["React Native", "Flutter", "iOS"],
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      const title = sectionRef.current?.querySelector(".section-title");
      gsap.from(title, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: title,
          start: "top 85%",
        },
      });

      // Cards stagger
      const cards = sectionRef.current?.querySelectorAll(".service-card");
      cards?.forEach((card, i) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
        });

        // Hover animation
        const line = card.querySelector(".card-line");
        card.addEventListener("mouseenter", () => {
          gsap.to(line, { scaleX: 1, duration: 0.5, ease: "power2.out" });
          gsap.to(card, { y: -8, duration: 0.3, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(line, { scaleX: 0, duration: 0.5, ease: "power2.out" });
          gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative px-6 md:px-12 lg:px-24 py-32 md:py-48"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="mb-6">
          <span className="font-body text-xs tracking-[0.3em] uppercase opacity-40">
            (02) — Services
          </span>
        </div>

        <h2 className="section-title font-display text-4xl md:text-6xl lg:text-7xl font-800 tracking-tighter mb-20 md:mb-28">
          What we
          <br />
          <span className="text-stroke">do best</span>
        </h2>

        {/* Service cards */}
        <div className="space-y-0">
          {services.map((service, i) => (
            <div
              key={i}
              className="service-card group py-10 md:py-14 border-t border-current/10 last:border-b cursor-none relative"
              data-cursor="pointer"
            >
              {/* Animated underline */}
              <div
                className="card-line absolute bottom-0 left-0 w-full h-[2px] origin-left"
                style={{
                  transform: "scaleX(0)",
                  backgroundColor: isDark ? "#fff" : "#0a0a0a",
                }}
              />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-6 md:gap-12">
                  <span className="font-display text-sm opacity-30 pt-1 font-500">
                    {service.num}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl md:text-4xl lg:text-5xl font-700 tracking-tight group-hover:tracking-normal transition-all duration-500">
                      {service.title}
                    </h3>
                    <p className="font-body text-sm md:text-base opacity-50 mt-3 max-w-md leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 md:gap-3 ml-12 md:ml-0 flex-wrap">
                  {service.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="font-body text-xs px-3 py-1.5 rounded-full border border-current/20 opacity-60 whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-50 transition-opacity duration-300 hidden md:block">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}