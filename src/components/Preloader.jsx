import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const counterRef = useRef(null);
  const titleRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Counter animation
    const counter = { val: 0 };
    gsap.to(counter, {
      val: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(counter.val)),
    });

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // Animate title chars
    const chars = titleRef.current?.querySelectorAll(".char");
    tl.from(chars, {
      y: 100,
      opacity: 0,
      rotateX: -90,
      stagger: 0.04,
      duration: 1,
      ease: "power4.out",
      delay: 0.3,
    })
      .to(
        {},
        { duration: 1 } // pause to show
      )
      .to(chars, {
        y: -100,
        opacity: 0,
        stagger: 0.02,
        duration: 0.6,
        ease: "power4.in",
      })
      .to(
        counterRef.current,
        {
          opacity: 0,
          y: -30,
          duration: 0.4,
          ease: "power2.in",
        },
        "<"
      )
      .to(preloaderRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      });

    return () => tl.kill();
  }, []);

  const titleText = "ZeroDev Studio";

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark"
    >
      {/* Progress bar */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64">
        <div className="h-[1px] w-full bg-white/20 relative overflow-hidden">
          <div
            className="h-full bg-white absolute left-0 top-0 transition-all duration-100"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>

      {/* Counter */}
      <div
        ref={counterRef}
        className="absolute bottom-28 left-1/2 -translate-x-1/2"
      >
        <span className="font-display text-white/50 text-sm tracking-[0.3em] uppercase">
          {count}%
        </span>
      </div>

      {/* Title */}
      <h1
        ref={titleRef}
        className="font-display text-white text-4xl md:text-6xl lg:text-7xl font-800 tracking-tight"
        style={{ perspective: "500px" }}
      >
        {titleText.split("").map((char, i) => (
          <span key={i} className="char">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
    </div>
  );
}