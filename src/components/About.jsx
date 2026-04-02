import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react"; // Upgraded!

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    // Reveal each word
    const words = textRef.current?.querySelectorAll(".word-inner");
    gsap.from(words, {
      y: "100%",
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        end: "top 30%",
        toggleActions: "play none none reverse",
      },
    });

    // Stats counter
    const statEls = sectionRef.current?.querySelectorAll(".stat-number");
    statEls?.forEach((el) => {
      const target = parseInt(el.dataset.value);
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
        onUpdate: () => {
          el.textContent = Math.round(obj.val) + (el.dataset.suffix || "");
        },
      });
    });

    // Stat items stagger
    const statItems = sectionRef.current?.querySelectorAll(".stat-item");
    gsap.from(statItems, {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: statItems?.[0],
        start: "top 85%",
      },
    });
  }, { scope: sectionRef });

  const aboutText =
    "We are a collective of designers, developers, and strategists who believe in the power of digital craft. We don't just build websites — we engineer experiences that leave lasting impressions.";

  const splitIntoWords = (text) =>
    text.split(" ").map((word, i) => (
      <span key={i} className="word inline-block overflow-hidden mr-[0.3em]">
        <span className="word-inner inline-block">{word}</span>
      </span>
    ));

  const stats = [
    { value: 10, suffix: "+", label: "Projects Delivered" },
    { value: 0, suffix: "+", label: "Global Clients" },
    { value: 3, suffix: "", label: "Team Members" },
    { value: 1, suffix: "+yrs", label: "Experience" },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative px-6 md:px-12 lg:px-24 py-32 md:py-48 bg-white dark:bg-black transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="font-body text-xs tracking-[0.3em] uppercase opacity-40 dark:text-white">
            (01) — About
          </span>
        </div>

        <div ref={textRef} className="max-w-5xl">
          <p className="font-display text-2xl md:text-4xl lg:text-5xl font-500 leading-snug tracking-tight dark:text-white">
            {splitIntoWords(aboutText)}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 md:mt-32 pt-16 border-t border-zinc-200 dark:border-zinc-800">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item dark:text-white">
              <div
                className="stat-number font-display text-5xl md:text-7xl font-800 tracking-tighter"
                data-value={stat.value}
                data-suffix={stat.suffix}
              >
                0{stat.suffix}
              </div>
              <p className="font-body text-sm opacity-50 mt-2 tracking-wide text-zinc-600 dark:text-zinc-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}