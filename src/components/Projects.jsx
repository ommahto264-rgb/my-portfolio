import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: '01',
    name: 'Amazon Clone',
    description: 'Full-stack e-commerce platform with product listings, cart, orders, admin panel with RBAC, JWT auth, and Cloudinary image uploads.',
    tech: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Cloudinary', 'Railway'],
    live: 'https://amazon-clone-fullstack-five.vercel.app/',
    github: 'https://github.com/ommahto264-rgb/amazon-clone-fullstack',
    status: 'Live',
    gradient: 'from-orange-500 to-yellow-400',
    glow: 'rgba(249,115,22,0.15)',
  },
  {
    id: '02',
    name: 'PeerPrep',
    description: 'AI-powered mock interview platform with real-time collaborative coding, socket-based rooms, and AI feedback powered by the Anthropic API.',
    tech: ['Next.js', 'Socket.io', 'Node.js', 'PostgreSQL', 'Anthropic API'],
    live: '#',
    github: 'https://github.com/ommahto264-rgb/peerprep',
    status: 'In Progress',
    gradient: 'from-purple-500 to-pink-400',
    glow: 'rgba(168,85,247,0.15)',
  },
  {
    id: '03',
    name: 'Developer Portfolio',
    description: 'This portfolio — built with React, Vite, GSAP animations, Three.js shaders, and Tailwind CSS. Fully responsive with scroll-triggered animations.',
    tech: ['React', 'Vite', 'GSAP', 'Three.js', 'Tailwind CSS'],
    live: 'https://my-portfolio-om-kumar-92.vercel.app/',
    github: 'https://github.com/ommahto264-rgb/my-portfolio',
    status: 'Live',
    gradient: 'from-red-500 to-rose-400',
    glow: 'rgba(239,68,68,0.15)',
  },
];

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(cardRef.current, {
      rotateY: x * 10,
      rotateX: -y * 10,
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 0.4
    });

    gsap.to(glowRef.current, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
      duration: 0.2
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      ease: 'power3.out',
      duration: 0.6
    });
    gsap.to(glowRef.current, {
      opacity: 0,
      duration: 0.4
    });
  };

  return (
    <div
      ref={cardRef}
      className="project-card relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] hover:border-white/20 transition-all duration-500 group"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Mouse glow */}
      <div
        ref={glowRef}
        className="absolute w-64 h-64 rounded-full blur-[80px] pointer-events-none z-10 -translate-x-1/2 -translate-y-1/2 opacity-0"
        style={{ background: project.glow }}
      />

      {/* Top gradient bar */}
      <div className={`h-[3px] w-full bg-gradient-to-r ${project.gradient}`} />

      <div className="p-8" style={{ transform: 'translateZ(20px)' }}>

        {/* Header row */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-gray-600 font-mono text-xs">#{project.id}</span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                project.status === 'Live'
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                  : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
              }`}>
                {project.status}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {project.name}
            </h3>
          </div>

          {/* Links */}
          <div className="flex gap-3 flex-shrink-0">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/40 transition-all duration-300"
              title="GitHub"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.467-2.382 1.235-3.222-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.912 1.23 3.222 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
            {project.live !== '#' && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/40 transition-all duration-300"
                title="Live Demo"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="19" x2="19" y2="5" />
                  <polyline points="10 5 19 5 19 14" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tool) => (
            <span
              key={tool}
              className="text-[10px] uppercase tracking-widest px-3 py-1.5 border border-white/10 rounded-full text-gray-400 font-medium hover:border-white/30 hover:text-white transition-all duration-300"
            >
              {tool}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
};

export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      const cards = sectionRef.current.querySelectorAll('.project-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 80, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.15, ease: "power3.out",
          scrollTrigger: {
            trigger: cards[0],
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="w-full min-h-screen bg-[#030303] py-32 px-6 md:px-12 lg:px-24 flex flex-col justify-center relative overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}
      />

      <div className="max-w-[90rem] mx-auto w-full relative z-10">

        {/* Header */}
        <div ref={headerRef} className="mb-20 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8">
          <div>
            <p className="text-red-500 font-mono text-sm tracking-[0.3em] uppercase font-bold mb-4">
              [ Selected Work ]
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold tracking-tighter text-white font-sans leading-none">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-400 font-serif italic pr-2">Projects</span>
            </h2>
          </div>
          <p className="text-gray-400 font-light tracking-wide text-base md:text-lg max-w-sm mt-6 md:mt-0 leading-relaxed md:text-right">
            Real products built with production-ready tech stacks and deployed live.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}