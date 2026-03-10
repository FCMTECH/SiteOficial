'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Briefcase, Users, Calendar } from 'lucide-react';

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
      className="py-24 md:py-32 bg-bg-tertiary"
    >
      <div className="container-premium px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              {t('about.title')}
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              {t('about.description')}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-3 gap-4"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.key}
                  className="bg-white rounded-xl p-5 border border-border-light text-center"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent-gold/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-accent-gold" />
                  </div>
                  <div className="text-2xl font-bold text-accent-gold mb-1">
                    <AnimatedCounter end={stat.value} />
                  </div>
                  <p className="text-xs text-text-secondary">
                    {t(`about.stats.${stat.key}`)}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
