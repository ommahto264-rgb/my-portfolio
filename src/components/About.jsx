import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const textContainerRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      const textElements = textContainerRef.current.querySelectorAll('.stagger-reveal');

      tl.fromTo(textElements,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" }
      );

      if (statsRef.current) {
        tl.fromTo(statsRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
          "-=0.5"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '250+', label: 'LeetCode Problems' },
    { value: '3rd', label: 'Year B.Tech IT' },
    { value: '5+', label: 'Projects Shipped' },
    { value: '2028', label: 'Graduation' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black flex items-center justify-center py-24 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[90rem] w-full relative z-10">
        <div ref={textContainerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Story */}
          <div className="flex flex-col space-y-8">

            <div>
              <p className="stagger-reveal text-red-500 font-mono text-sm tracking-[0.3em] uppercase font-bold mb-4">
                [ About Me ]
              </p>
              <h2 className="stagger-reveal text-5xl md:text-6xl font-bold tracking-tighter text-white font-sans leading-tight">
                Builder by<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-500 font-serif italic pr-4">
                  Nature
                </span>
              </h2>
            </div>

            <p className="stagger-reveal text-lg text-gray-400 font-light leading-relaxed">
              I'm Om Kumar, a third-year Information Technology student at Narula Institute of Technology, Kolkata. I'm passionate about building real products — not just side projects. From full-stack e-commerce platforms to AI-powered mock interview tools, I ship things that work.
            </p>

            <p className="stagger-reveal text-lg text-gray-400 font-light leading-relaxed">
              My current focus is landing a paid internship at a funded startup, while building PeerPrep — an AI-powered mock interview platform using Next.js, Socket.io, and the Anthropic API.
            </p>

            <div className="stagger-reveal flex flex-wrap gap-3 pt-2">
              {[
                'Problem Solver',
                'Fast Learner',
                'Open Source Enthusiast',
                'GSoC 2027 Aspirant'
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs uppercase tracking-widest px-4 py-2 border border-white/10 rounded-full text-gray-400 font-medium hover:border-red-500/50 hover:text-white transition-all duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Education */}
            <div className="stagger-reveal border-l-2 border-red-500/50 pl-6 py-2 space-y-1">
              <p className="text-white font-semibold text-lg">Narula Institute of Technology</p>
              <p className="text-gray-400 text-sm">B.Tech in Information Technology</p>
              <p className="text-gray-500 text-xs uppercase tracking-widest">Kolkata, India · 2024 – 2028</p>
            </div>

            {/* Certifications */}
            <div className="stagger-reveal space-y-3">
              <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">Certifications</p>
              {[
                'NPTEL — Programming in Java',
                'BCT Training — Data Analytics with Python',
                'EduSkills / NASSCOM FutureSkills — AI (In Progress)',
              ].map((cert) => (
                <div key={cert} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{cert}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right: Stats */}
          <div className="flex flex-col gap-8">

            <div ref={statsRef} className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="border border-white/10 rounded-2xl p-6 hover:border-red-500/30 transition-all duration-300 group cursor-default"
                >
                  <p className="text-4xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 uppercase tracking-widest mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Hackathons */}
            <div className="stagger-reveal space-y-3">
              <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">Hackathons</p>
              {[
                { name: 'Hack-o-NIT 2026', result: 'Participant' },
                { name: 'InnovateX 2026', result: 'Participant' },
              ].map((hack) => (
                <div key={hack.name} className="flex items-center justify-between border border-white/5 rounded-xl px-5 py-3 hover:border-white/20 transition-all duration-300">
                  <span className="text-gray-300 text-sm font-medium">{hack.name}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest">{hack.result}</span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}