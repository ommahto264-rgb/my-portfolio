import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 2, ease: "power3.out", delay: 0.1 }
    );
    if (textRef.current) {
      gsap.fromTo(textRef.current,
        { opacity: 0, y: -60 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.8 }
      );
    }

    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative w-screen h-screen overflow-hidden bg-black flex items-center justify-center">

      {/* Animated gradient blobs */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, #ff3b3b, #7c3aed)',
            top: '10%',
            left: '55%',
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]"
          style={{
            background: 'radial-gradient(circle, #3b82f6, #06b6d4)',
            top: '50%',
            left: '5%',
            transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      {/* Main content */}
      <div ref={textRef} className="absolute inset-0 z-10 flex flex-col justify-center mx-auto w-full max-w-[90rem] px-8 lg:px-16 mt-20">
        <div className="w-full flex flex-col md:flex-row justify-between md:items-end gap-10">

          {/* Left: Name + role */}
          <div className="flex-1 max-w-2xl text-left">
            <p className="text-sm md:text-base text-red-400 font-mono tracking-[0.3em] uppercase font-bold mb-4">
              [ Full-Stack Developer ]
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[1.05] font-sans text-white">
              Hi, I'm<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 font-serif italic pr-4">
                Om Mahato
              </span>
            </h1>
            <p className="mt-6 text-gray-400 text-lg font-light tracking-wide">
              B.Tech CSE · Narula Institute of Technology, Kolkata
            </p>
          </div>

          {/* Right: Bio + CTAs */}
          <div className="flex-1 max-w-md text-left md:text-right flex flex-col md:items-end">
            <p className="text-lg md:text-xl text-gray-300 font-light tracking-wide leading-relaxed mb-8">
              I build scalable full-stack web apps — from pixel-perfect frontends to robust Node.js backends with PostgreSQL. Currently seeking internships at product-led startups.
            </p>
            <div className="flex gap-4 md:justify-end flex-wrap">
              <a
                href="#projects"
                className="px-8 py-4 rounded-full bg-white text-black text-sm tracking-[0.15em] uppercase font-semibold hover:bg-gray-200 transition-all duration-300 shadow-xl"
              >
                See My Work
              </a>
              <a
                href="#contact"
                className="px-8 py-4 rounded-full border border-white/30 text-white text-sm tracking-[0.15em] uppercase font-medium hover:bg-white hover:text-black transition-all duration-500"
              >
                Contact Me
              </a>
            </div>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs tracking-widest uppercase text-gray-400">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent animate-pulse" />
        </div>
      </div>

      {/* Vignette edges */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />
    </div>
  );
}