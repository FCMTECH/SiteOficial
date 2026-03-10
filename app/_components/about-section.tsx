'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Briefcase, Users, Calendar, Target, Shield, Zap } from 'lucide-react';

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

const values = [
  { icon: Target, key: 'focus' },
  { icon: Shield, key: 'security' },
  { icon: Zap, key: 'agility' },
];

export function AboutSection({ t }: AboutSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="py-20 md:py-28 bg-bg-tertiary">
      <div className="container-premium">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            {t('about.title')}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start mb-12">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              {t('about.description')}
            </p>
            <p className="text-base text-text-secondary leading-relaxed">
              {t('about.description2')}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-3 gap-4"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="bg-white rounded-xl p-5 border border-border-light text-center hover:shadow-md transition-shadow"
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
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                className="bg-white rounded-xl p-5 border border-border-light flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-accent-gold/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-accent-gold" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">{t(`about.values.${value.key}.title`)}</h4>
                  <p className="text-sm text-text-secondary">{t(`about.values.${value.key}.description`)}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
