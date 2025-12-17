'use client';

import { motion } from 'framer-motion';
import SectionTitle from '../Common/SectionTitle';

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  type: 'full-time' | 'freelance' | 'contract';
}

const experiences: Experience[] = [
  {
    title: 'Full-Stack Developer',
    company: 'Freelance',
    location: 'Remote / Novi Pazar, Serbia',
    period: '2021 - Present',
    type: 'freelance',
    description: [
      'Developed and maintained multiple web applications using React, Next.js, and Node.js',
      'Built responsive and performant user interfaces with modern CSS frameworks',
      'Collaborated with clients to deliver custom solutions meeting their business needs',
      'Implemented RESTful APIs and database solutions using MongoDB and MySQL',
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'Tailwind CSS'],
  },
  {
    title: 'Web Developer',
    company: 'Various Projects',
    location: 'Remote',
    period: '2020 - 2021',
    type: 'contract',
    description: [
      'Created responsive websites for small businesses and startups',
      'Optimized web applications for performance and SEO',
      'Integrated third-party APIs and payment gateways',
    ],
    technologies: ['JavaScript', 'React', 'HTML5', 'CSS3', 'Node.js'],
  },
];

const ExperienceCard = ({ experience, index }: { experience: Experience; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="relative pl-8 pb-8 last:pb-0 group"
    >
      {/* Cyberpunk Timeline Line */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 via-cyan-400 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
      
      {/* Animated Timeline dot */}
      <div className="absolute -left-[10px] top-0 w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-cyan-400 border-4 border-gray-950 shadow-lg shadow-green-500/50 group-hover:shadow-green-500/80 group-hover:scale-125 transition-all">
        <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20" />
      </div>
      
      <div className="relative bg-gradient-to-br from-gray-800/40 via-gray-900/40 to-gray-800/40 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700/50 hover:border-green-500/60 transition-all group-hover:shadow-[0_0_30px_rgba(0,255,140,0.2)] overflow-hidden">
        {/* Cyberpunk corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-green-500/20 rounded-tl-xl group-hover:border-green-400/60 transition-colors" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-500/20 rounded-br-xl group-hover:border-cyan-400/60 transition-colors" />
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/0 to-cyan-500/0 group-hover:from-green-500/5 group-hover:via-green-500/0 group-hover:to-cyan-500/5 transition-all pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 mb-1 drop-shadow-[0_0_10px_rgba(0,255,140,0.3)]">
                {experience.title}
              </h3>
              <p className="text-lg text-gray-200 font-semibold">{experience.company}</p>
            </div>
            <div className="mt-2 md:mt-0 text-right">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500/20 to-cyan-500/20 text-green-300 border border-green-500/40 shadow-lg shadow-green-500/20">
                {experience.type}
              </span>
              <p className="text-sm text-cyan-300 mt-2 font-medium">{experience.period}</p>
            </div>
          </div>
          
          <p className="text-gray-400 text-sm mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-gray-300">{experience.location}</span>
          </p>

          <ul className="space-y-3 mb-6">
            {experience.description.map((item, idx) => (
              <li key={idx} className="text-gray-300 text-sm md:text-base flex items-start gap-3 group/item">
                <span className="text-green-400 mt-1.5 text-lg group-hover/item:text-cyan-400 transition-colors">▸</span>
                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-gray-700/50">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-700/30 text-gray-300 border border-gray-600/30 hover:border-green-500/50 hover:text-green-400 hover:bg-green-500/10 transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-950 via-[#0a0a0a] to-gray-950 relative overflow-hidden">
      {/* Cyberpunk Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,140,0.12),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,200,255,0.08),transparent_60%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          title="Work Experience"
          paragraph="My professional journey and the projects I've worked on"
          center
        />

        <div className="max-w-4xl mx-auto mt-12">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

