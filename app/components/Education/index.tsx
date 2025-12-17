'use client';

import { motion } from 'framer-motion';
import SectionTitle from '../Common/SectionTitle';

interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  achievements?: string[];
}

const education: Education[] = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University',
    location: 'Serbia',
    period: '2018 - 2022',
    description: 'Focused on software engineering, algorithms, data structures, and web development.',
    achievements: [
      'Graduated with honors',
      'Completed multiple web development projects',
      'Participated in coding competitions',
    ],
  },
  {
    degree: 'Self-Taught & Continuous Learning',
    institution: 'Online Platforms & Courses',
    location: 'Remote',
    period: '2020 - Present',
    description: 'Continuous learning through online courses, documentation, and building real-world projects.',
    achievements: [
      'Completed multiple React and Next.js courses',
      'Certified in various technologies',
      'Active contributor to open-source projects',
    ],
  },
];

const EducationCard = ({ edu, index }: { edu: Education; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="group relative bg-gradient-to-br from-gray-800/40 via-gray-900/40 to-gray-800/40 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700/50 hover:border-cyan-500/60 transition-all hover:shadow-[0_0_30px_rgba(0,200,255,0.2)] overflow-hidden"
    >
      {/* Cyberpunk corner accents */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-500/20 rounded-tl-xl group-hover:border-cyan-400/60 transition-colors" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-green-500/20 rounded-br-xl group-hover:border-green-400/60 transition-colors" />
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-green-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:via-green-500/0 group-hover:to-cyan-500/5 transition-all pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 mb-2 drop-shadow-[0_0_10px_rgba(0,200,255,0.3)]">
              {edu.degree}
            </h3>
            <p className="text-lg text-gray-200 font-semibold mb-1">{edu.institution}</p>
            <p className="text-gray-400 text-sm flex items-center gap-2 mb-4">
              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-gray-300">{edu.location}</span>
            </p>
          </div>
          <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-500/20 to-green-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/20">
            {edu.period}
          </span>
        </div>

        <p className="text-gray-300 mb-4 leading-relaxed">{edu.description}</p>

        {edu.achievements && edu.achievements.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-700/50">
            <h4 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Key Achievements:
            </h4>
            <ul className="space-y-2">
              {edu.achievements.map((achievement, idx) => (
                <li key={idx} className="text-gray-300 text-sm flex items-start gap-3 group/item">
                  <span className="text-cyan-400 mt-0.5 group-hover/item:text-green-400 transition-colors">✓</span>
                  <span className="flex-1">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Education = () => {
  return (
    <section id="education" className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-950 via-[#0a0a0a] to-gray-950 relative overflow-hidden">
      {/* Cyberpunk Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,200,255,0.1),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(0,255,140,0.08),transparent_60%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          title="Education"
          paragraph="My academic background and continuous learning journey"
          center
        />

        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <EducationCard key={index} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;

