import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  {
    category: 'Frontend',
    color: 'from-blue-500 to-cyan-400',
    border: 'hover:border-blue-500/40',
    glow: 'bg-blue-500/5',
    items: [
      { name: 'React', level: 90 },
      { name: 'Next.js', level: 80 },
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 65 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'GSAP', level: 70 },
    ]
  },
  {
    category: 'Backend',
    color: 'from-red-500 to-orange-400',
    border: 'hover:border-red-500/40',
    glow: 'bg-red-500/5',
    items: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'REST APIs', level: 88 },
      { name: 'Socket.io', level: 70 },
      { name: 'Docker', level: 40 },
    ]
  },
  {
    category: 'Languages & Tools',
    color: 'from-purple-500 to-pink-400',
    border: 'hover:border-purple-500/40',
    glow: 'bg-purple-500/5',
    items: [
      { name: 'C++', level: 85 },
      { name: 'Java', level: 70 },
      { name: 'Python', level: 72 },
      { name: 'Git & GitHub', level: 88 },
      { name: 'Postman', level: 80 },
      { name: 'Linux', level: 65 },
    ]
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Header animation
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Cards animation
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
            delay: i * 0.15,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Animate progress bars
        const bars = card.querySelectorAll('.skill-bar-fill');
        bars.forEach((bar) => {
          const width = bar.getAttribute('data-width');
          gsap.fromTo(bar,
            { width: '0%' },
            {
              width: `${width}%`,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: bar,
                start: "top 90%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#030303] py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="max-w-[90rem] mx-auto w-full relative z-10">

        {/* Header */}
        <div ref={headerRef} className="mb-20 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8">
          <div>
            <p className="text-red-500 font-mono text-sm tracking-[0.3em] uppercase font-bold mb-4">
              [ Tech Stack ]
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold tracking-tighter text-white font-sans leading-none">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-400 font-serif italic pr-2">Skills</span>
            </h2>
          </div>
          <p className="text-gray-400 font-light tracking-wide text-base md:text-lg max-w-sm mt-6 md:mt-0 leading-relaxed md:text-right">
            Tools and technologies I use to build production-ready applications.
          </p>
        </div>

        {/* Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILLS.map((group, i) => (
            <div
              key={group.category}
              ref={el => cardsRef.current[i] = el}
              className={`relative border border-white/10 rounded-2xl p-8 ${group.border} ${group.glow} transition-all duration-500 group`}
            >
              {/* Category header */}
              <div className="mb-8">
                <div className={`inline-block text-xs uppercase tracking-[0.25em] font-bold px-3 py-1.5 rounded-full bg-gradient-to-r ${group.color} text-white mb-3`}>
                  {group.category}
                </div>
              </div>

              {/* Skill bars */}
              <div className="space-y-5">
                {group.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 text-sm font-medium">{skill.name}</span>
                      <span className="text-gray-500 text-xs font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`skill-bar-fill h-full rounded-full bg-gradient-to-r ${group.color}`}
                        data-width={skill.level}
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* DSA callout */}
        <div className="mt-16 border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-red-500/20 transition-all duration-500">
          <div>
            <p className="text-white font-semibold text-xl mb-2">Data Structures & Algorithms</p>
            <p className="text-gray-400 text-sm font-light">Solving problems daily in C++ — focused on arrays, trees, graphs, and DP.</p>
          </div>
          <div className="flex items-center gap-8 flex-shrink-0">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">250+</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Problems Solved</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">C++</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Primary Language</p>
            </div>
            <a
              href="https://leetcode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-red-500/30 text-red-400 text-sm uppercase tracking-widest hover:bg-red-500/10 transition-all duration-300"
            >
              LeetCode →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}