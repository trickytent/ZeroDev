import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTheme } from "../App";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const circleRef = useRef(null);
  const { isDark } = useTheme();

  useGSAP(() => {
    const dot = dotRef.current;
    const circle = circleRef.current;
    if (!dot || !circle) return;

    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      gsap.set([dot, circle], { display: "none" });
      return;
    }

    const moveCursor = (e) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
      gsap.to(circle, { x: e.clientX, y: e.clientY, duration: 0.5, ease: "power2.out" });
    };

    const handleMouseEnter = () => {
      gsap.to(circle, { scale: 2.5, opacity: 0.5, duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(circle, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", moveCursor);
    const interactiveEls = document.querySelectorAll('a, button, [data-cursor="pointer"]');
    
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2" style={{ backgroundColor: isDark ? "#fff" : "#000", mixBlendMode: "difference" }} />
      <div ref={circleRef} className="custom-cursor fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2 border" style={{ borderColor: isDark ? "#fff" : "#000", mixBlendMode: "difference" }} />
    </>
  );
}