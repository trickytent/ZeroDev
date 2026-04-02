import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function Marquee() {
  const marqueeRef = useRef(null);
  const track1 = useRef(null);
  const track2 = useRef(null);

  useGSAP(() => {
    gsap.to(track1.current, {
      xPercent: -50, ease: "none",
      scrollTrigger: { trigger: marqueeRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
    });
    gsap.to(track2.current, {
      xPercent: 50, ease: "none",
      scrollTrigger: { trigger: marqueeRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
    });
  }, { scope: marqueeRef });

  const items = ["DESIGN", "✦", "DEVELOP", "✦", "DEPLOY", "✦", "INNOVATE", "✦", "CREATE", "✦", "TRANSFORM", "✦"];
  const text = items.join(" ");
  const repeated = `${text} ${text} ${text} ${text}`;

  return (
    <div ref={marqueeRef} className="py-12 md:py-20 overflow-hidden border-y border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black transition-colors duration-500">
      <div ref={track1} className="font-display text-4xl md:text-6xl lg:text-8xl font-800 whitespace-nowrap opacity-10 dark:text-white">
        {repeated}
      </div>
      <div ref={track2} className="font-display text-4xl md:text-6xl lg:text-8xl font-800 whitespace-nowrap opacity-10 mt-4 dark:text-white" style={{ transform: "translateX(-25%)" }}>
        {repeated}
      </div>
    </div>
  );
}