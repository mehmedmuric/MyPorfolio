'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionTitle from '../Common/SectionTitle';

interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
  category: 'frontend' | 'backend' | 'tools' | 'mobile';
}

const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 95, icon: '/images/models/react.svg', category: 'frontend' },
  { name: 'Next.js', level: 90, icon: '/images/models/nextjs.svg', category: 'frontend' },
  { name: 'TypeScript', level: 88, icon: '/images/models/typescript.svg', category: 'frontend' },
  { name: 'JavaScript', level: 95, icon: '/images/models/javascript.svg', category: 'frontend' },
  { name: 'Tailwind CSS', level: 92, icon: '/images/models/tailwindcss.svg', category: 'frontend' },
  { name: 'HTML5/CSS3', level: 98, icon: '/images/models/html5.svg', category: 'frontend' },
  
  // Backend
  { name: 'Node.js', level: 90, icon: '/images/models/nodejs.svg', category: 'backend' },
  { name: 'Express.js', level: 85, icon: '/images/models/expressjs.svg', category: 'backend' },
  { name: 'MongoDB', level: 88, icon: '/images/models/mongodb.svg', category: 'backend' },
  { name: 'MySQL', level: 82, icon: '/images/models/mysql.svg', category: 'backend' },
  { name: 'REST APIs', level: 90, icon: '/images/models/restapi.svg', category: 'backend' },
  { name: 'GraphQL', level: 75, category: 'backend' },
  
  // Tools
  { name: 'Git/GitHub', level: 92, icon: '/images/models/github.svg', category: 'tools' },
  { name: 'Docker', level: 75, icon: '/images/models/docker.svg', category: 'tools' },
  { name: 'AWS', level: 70, icon: '/images/models/amazonAWS.svg', category: 'tools' },
  { name: 'Prisma', level: 85, icon: '/images/models/prisma.svg', category: 'tools' },
  
  // Mobile
  { name: 'React Native', level: 80, icon: '/images/models/reactnative.svg', category: 'mobile' },
  { name: 'Flutter', level: 70, icon: '/images/models/flutter.svg', category: 'mobile' },
];

const categoryColors = {
  frontend: 'from-blue-500 to-cyan-500',
  backend: 'from-purple-500 to-pink-500',
  tools: 'from-orange-500 to-red-500',
  mobile: 'from-green-500 to-emerald-500',
};

const SkillBar = ({ skill, index }: { skill: Skill; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => {
      if (barRef.current) {
        observer.unobserve(barRef.current);
      }
    };
  }, []);

  return (
    <div ref={barRef} className="mb-6 group modern-skill-card p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-emerald-400/30 hover:bg-white/8 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {skill.icon ? (
            <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-400/20 group-hover:border-emerald-400/40 transition-all">
              <Image
                src={skill.icon}
                alt={skill.name}
                width={24}
                height={24}
                className="object-contain filter brightness-110 group-hover:brightness-125 transition-all"
              />
            </div>
          ) : (
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-400/20">
              <span className="text-emerald-400 text-xs font-semibold">?</span>
            </div>
          )}
          <span className="text-gray-200 font-medium text-sm md:text-base group-hover:text-emerald-300 transition-colors">{skill.name}</span>
        </div>
        <span className="text-emerald-400 font-semibold text-sm md:text-base">{skill.level}%</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-3 md:h-3.5 overflow-hidden border border-white/10 group-hover:border-emerald-400/20 transition-all relative">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 rounded-full relative overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${skill.level}%` : 0 }}
          transition={{ duration: 1.5, delay: index * 0.1, ease: 'easeOut' }}
        >
          {/* Subtle shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </motion.div>
      </div>
    </div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const categories = ['all', 'frontend', 'backend', 'tools', 'mobile'];

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-[#0a0f0a] via-[#0d1a0f] to-[#0a0f0a] relative overflow-hidden">
      {/* Soft green gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/15 via-transparent to-green-950/10 pointer-events-none" />
      <div className="absolute -inset-40 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.06),_transparent_60%)] blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          title="Skills & Expertise"
          paragraph="Technologies and tools I work with to build amazing digital experiences"
          center
        />

        {/* Modern Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                modern-filter-btn px-5 py-2.5 rounded-xl text-sm font-medium
                backdrop-blur-md border transition-all duration-300
                ${activeCategory === category
                  ? 'bg-emerald-500/10 border-emerald-400/40 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:border-emerald-400/30 hover:text-emerald-300 hover:bg-emerald-500/5'
                }
              `}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {filteredSkills.map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>

        {/* Modern Stats Cards */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { label: 'Technologies', value: '20+' },
            { label: 'Projects', value: '30+' },
            { label: 'Years Experience', value: '4+' },
            { label: 'Happy Clients', value: '15+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="modern-stat-card text-center p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-emerald-400/30 hover:bg-white/8 transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">{stat.value}</div>
              <div className="text-sm md:text-base text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

