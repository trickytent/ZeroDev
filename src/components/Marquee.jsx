import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Marquee() {
  const marqueeRef = useRef(null);
  const track1 = useRef(null);
  const track2 = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Accelerate on scroll
      gsap.to(track1.current, {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(track2.current, {
        xPercent: 50,
        ease: "none",
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  const items = [
    "DESIGN",
    "✦",
    "DEVELOP",
    "✦",
    "DEPLOY",
    "✦",
    "INNOVATE",
    "✦",
    "CREATE",
    "✦",
    "TRANSFORM",
    "✦",
  ];
  const text = items.join(" ");
  const repeated = `${text} ${text} ${text} ${text}`;

  return (
    <div
      ref={marqueeRef}
      className="py-12 md:py-20 overflow-hidden border-y border-current/10"
    >
      <div
        ref={track1}
        className="font-display text-4xl md:text-6xl lg:text-8xl font-800 whitespace-nowrap opacity-10"
      >
        {repeated}
      </div>
      <div
        ref={track2}
        className="font-display text-4xl md:text-6xl lg:text-8xl font-800 whitespace-nowrap opacity-10 mt-4"
        style={{ transform: "translateX(-25%)" }}
      >
        {repeated}
      </div>
    </div>
  );
}