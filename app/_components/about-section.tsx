'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Briefcase, Users, Calendar, Building2 } from 'lucide-react';

interface AboutSectionProps {
  t: (key: string) => string;
}

function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}+</span>;
}

const stats = [
  { icon: Briefcase, key: 'projects', value: 150 },
  { icon: Users, key: 'clients', value: 40 },
  { icon: Calendar, key: 'years', value: 8 },
];

export function AboutSection({ t }: AboutSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      id="about" 
      ref={ref}
      className="relative py-24 md:py-32 bg-bg-tertiary overflow-hidden"
    >
      {/* Fundo com hexágonos sutis (tecnológico) */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
              <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66Z" fill="none" stroke="#D4AF37" strokeWidth="0.5"/>
              <path d="M28 100L0 84L0 50L28 34L56 50L56 84L28 100Z" fill="none" stroke="#D4AF37" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)"/>
        </svg>
      </div>

      {/* Gradientes decorativos */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl" />

      <div className="container-premium relative z-10 px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20 mb-4">
              <Building2 className="w-4 h-4 text-accent-gold" />
              <span className="text-sm text-accent-gold-dark">Quem Somos</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
              {t('about.title')}
            </h2>
            
            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              {t('about.description')}
            </p>

            {/* Decoração */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-1 bg-accent-gold rounded-full" />
              <div className="w-6 h-1 bg-accent-gold/50 rounded-full" />
              <div className="w-3 h-1 bg-accent-gold/30 rounded-full" />
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-3 gap-4"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="group"
                >
                  <div className="relative bg-white rounded-2xl p-6 border border-border-light hover:border-accent-gold/30 transition-all duration-300 hover:shadow-lg text-center overflow-hidden">
                    {/* Decoração superior */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-gold/0 via-accent-gold/50 to-accent-gold/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="w-12 h-12 rounded-xl bg-accent-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-gold/20 transition-colors">
                      <Icon className="w-6 h-6 text-accent-gold" />
                    </div>
                    
                    <div className="text-3xl md:text-4xl font-bold text-accent-gold mb-2">
                      <AnimatedCounter end={stat.value} />
                    </div>
                    
                    <p className="text-sm text-text-secondary">
                      {t(`about.stats.${stat.key}`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
