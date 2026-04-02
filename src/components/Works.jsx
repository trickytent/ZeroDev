import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react"; // Make sure to run: npm install @gsap/react
import { useTheme } from "../App";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "AI Canvas Engine",
    category: "Web Application / GenAI",
    year: "2026",
    // You can replace these with local paths like '/assets/videos/project1.mp4'
    video: "https://cdn.pixabay.com/video/2023/11/02/187498-880091392_large.mp4", 
  },
  {
    title: "Aether",
    category: "Brand Identity / UI",
    year: "2025",
    video: "https://cdn.pixabay.com/video/2021/04/12/70874-538183184_large.mp4",
  },
  {
    title: "Luminary",
    category: "E-Commerce",
    year: "2024",
    video: "https://cdn.pixabay.com/video/2020/05/25/40114-424853036_large.mp4",
  },
  {
    title: "Prism",
    category: "Interactive Experience",
    year: "2024",
    video: "https://cdn.pixabay.com/video/2023/10/22/186000-876935275_large.mp4",
  },
];

export default function Works() {
  const sectionRef = useRef(null);
  const { isDark } = useTheme();

  useGSAP(() => {
    // 1. Title Reveal
    const title = sectionRef.current?.querySelector(".section-title");
    gsap.from(title, {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: title, start: "top 85%" },
    });

    // 2. Grid Items Stagger Reveal
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

      // 3. Immersive Video Reveal on Hover
      const mediaContainer = item.querySelector(".work-media");
      const video = item.querySelector("video");
      const overlay = item.querySelector(".work-overlay");

      item.addEventListener("mouseenter", () => {
        // Play video
        if (video) video.play();
        
        // Animate the media container in
        gsap.to(mediaContainer, { 
          clipPath: "inset(0% 0% 0% 0%)", 
          scale: 1,
          duration: 0.6, 
          ease: "power3.out" 
        });
        
        // Darken the overlay slightly so white text pops
        gsap.to(overlay, { opacity: 0.4, duration: 0.4 });
      });

      item.addEventListener("mouseleave", () => {
        // Pause video
        if (video) {
          video.pause();
          video.currentTime = 0; // Reset video to start
        }

        // Hide media container
        gsap.to(mediaContainer, { 
          clipPath: "inset(100% 0% 0% 0%)", // Slides down to disappear
          scale: 1.1,
          duration: 0.6, 
          ease: "power3.out" 
        });
        
        gsap.to(overlay, { opacity: 0, duration: 0.4 });
      });
    });
  }, { scope: sectionRef });

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

        <h2 className="section-title font-display text-4xl md:text-6xl lg:text-7xl font-800 tracking-tighter mb-20 md:mb-28 dark:text-white">
          Featured
          <br />
          <span className="text-stroke" style={{ WebkitTextStroke: "1px currentColor", color: "transparent" }}>
            projects
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <a
              key={i}
              href="#"
              className="work-item group relative block overflow-hidden rounded-2xl aspect-[4/3] border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900"
              data-cursor="pointer"
            >
              {/* Media Container (Hidden by default using clip-path) */}
              <div
                className="work-media absolute inset-0 z-0 origin-bottom"
                style={{
                  clipPath: "inset(100% 0% 0% 0%)",
                  transform: "scale(1.1)",
                }}
              >
                <video
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={project.video} type="video/mp4" />
                </video>
                {/* Dark overlay to ensure text remains readable over bright videos */}
                <div className="work-overlay absolute inset-0 bg-black opacity-0" />
              </div>

              {/* Content (Z-10 keeps it above the video) */}
              <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-10 pointer-events-none">
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs tracking-wider opacity-50 group-hover:text-white group-hover:opacity-100 transition-colors duration-300 dark:text-zinc-400">
                    {project.category}
                  </span>
                  <span className="font-body text-xs tracking-wider opacity-50 group-hover:text-white group-hover:opacity-100 transition-colors duration-300 dark:text-zinc-400">
                    {project.year}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-800 tracking-tighter group-hover:text-white transition-colors duration-300 dark:text-white">
                    {project.title}
                  </h3>

                  {/* Arrow (Kept your exact SVG and CSS animation) */}
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