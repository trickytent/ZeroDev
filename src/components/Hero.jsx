import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react"; // Added!
import { useTheme } from "../App";

export default function Hero() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const tagRef = useRef(null);
  const scrollRef = useRef(null);
  const { isDark } = useTheme();
  const threeRefs = useRef({});

  // Three.js scene (Unchanged - your logic here is excellent)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles
    const particleCount = 1200;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const particlesMat = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // Wireframe Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
    });
    const icosahedron = new THREE.Mesh(icoGeo, icoMat);
    scene.add(icosahedron);

    // Inner icosahedron
    const innerGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0xffffff,
      transparent: true,
      opacity: 0.08,
    });
    const innerIco = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerIco);

    // Torus ring
    const torusGeo = new THREE.TorusGeometry(2.5, 0.01, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.1,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.rotation.x = Math.PI * 0.5;
    scene.add(torus);

    threeRefs.current = { particlesMat, icoMat, innerMat, torusMat };

    // Mouse tracking
    let mouseX = 0,
      mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animate
    let frameId;
    const clock = new THREE.Clock();
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      icosahedron.rotation.x = elapsed * 0.1;
      icosahedron.rotation.y = elapsed * 0.15;

      innerIco.rotation.x = -elapsed * 0.12;
      innerIco.rotation.y = -elapsed * 0.08;

      torus.rotation.z = elapsed * 0.05;

      particles.rotation.y = elapsed * 0.02;
      particles.rotation.x = elapsed * 0.01;

      // Mouse parallax
      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 1.5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      particlesGeo.dispose();
      particlesMat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      renderer.dispose();
    };
  }, []);

  // Update Three.js colors on theme change
  useEffect(() => {
    const refs = threeRefs.current;
    const color = isDark ? 0xffffff : 0x1a1a1a;
    if (refs.particlesMat) refs.particlesMat.color.set(color);
    if (refs.icoMat) refs.icoMat.color.set(color);
    if (refs.innerMat) refs.innerMat.color.set(color);
    if (refs.torusMat) refs.torusMat.color.set(color);
  }, [isDark]);

  // UPGRADED: GSAP text animations using useGSAP
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Heading chars
    const headingChars = headingRef.current?.querySelectorAll(".char") || [];
    tl.from(headingChars, {
      y: 120,
      rotateX: -80,
      opacity: 0,
      stagger: 0.03,
      duration: 1.2,
      ease: "power4.out",
    });

    const subChars = subRef.current?.querySelectorAll(".char") || [];
    tl.from(
      subChars,
      {
        y: 60,
        opacity: 0,
        stagger: 0.02,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.6"
    );

    tl.from(
      tagRef.current,
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    );

    tl.from(
      scrollRef.current,
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.2"
    );
  }, { scope: sectionRef });

  // UPGRADED: Added a wrapper to ensure rotationX transforms correctly without clipping the top of the letters
  const splitChars = (text) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className="inline-block overflow-visible" 
        style={{ perspective: "1000px" }}
      >
        <span 
          className="char inline-block origin-bottom" 
        >
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-black"
    >
      {/* Absolute positioning for canvas so it stays behind text */}
      <canvas ref={canvasRef} className="hero-canvas absolute inset-0 z-0 pointer-events-none" />

      <div className="relative z-10 text-center px-4 pointer-events-none">
        {/* Tag */}
        <div ref={tagRef} className="mb-6">
          <span className="font-body text-xs md:text-sm tracking-[0.4em] uppercase opacity-60 dark:text-white">
            Creative Development Studio
          </span>
        </div>

        {/* Main heading */}
        <h1
          ref={headingRef}
          className="font-display text-[12vw] md:text-[9vw] lg:text-[8vw] font-800 leading-[0.9] tracking-tighter dark:text-white"
        >
          {splitChars("ZeroDev")}
        </h1>

        {/* Sub heading */}
        <h2
          ref={subRef}
          className="font-display text-[8vw] md:text-[5vw] lg:text-[4.5vw] font-300 tracking-tight mt-2 text-transparent"
          style={{ WebkitTextStroke: isDark ? "1px white" : "1px black" }}
        >
          {splitChars("Studio")}
        </h2>

        {/* Description */}
        <p className="mt-8 font-body text-sm md:text-base max-w-md mx-auto opacity-50 leading-relaxed dark:text-zinc-300">
          We craft immersive digital experiences that push boundaries and
          redefine what's possible on the web.
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="font-body text-[10px] tracking-[0.3em] uppercase opacity-40 dark:text-white">
          Scroll
        </span>
        <div className="w-[1px] h-12 relative overflow-hidden">
          <div
            className="w-full absolute top-0 left-0 animate-float"
            style={{
              height: "100%",
              background: isDark
                ? "linear-gradient(to bottom, white, transparent)"
                : "linear-gradient(to bottom, black, transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}