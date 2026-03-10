'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, TrendingUp, Shield } from 'lucide-react';

interface AboutSectionProps {
  t: (key: string) => string;
}

// Componente de contador animado
function AnimatedCounter({ target, inView }: { target: number; inView: boolean }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated?.current) return;
    hasAnimated.current = true;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span>{count}+</span>;
}

export function AboutSection({ t }: AboutSectionProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const stats = [
    {
      icon: Target,
      value: parseInt(t('about.stat1Value'), 10) || 150,
      label: t('about.stat1Label'),
    },
    {
      icon: TrendingUp,
      value: parseInt(t('about.stat2Value'), 10) || 40,
      label: t('about.stat2Label'),
    },
    {
      icon: Shield,
      value: parseInt(t('about.stat3Value'), 10) || 8,
      label: t('about.stat3Label'),
    },
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative bg-bg-tertiary" ref={ref}>
      <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="heading-lg font-heading font-bold mb-6 text-text-primary">
              {t('about.title')}
            </h2>
            <p className="text-body text-text-secondary mb-4 leading-relaxed">
              {t('about.p1')}
            </p>
            <p className="text-body text-text-secondary leading-relaxed">
              {t('about.p2')}
            </p>
          </motion.div>

          {/* Estatísticas */}
          <motion.div
            className="grid grid-cols-3 gap-4"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            {stats?.map?.((stat, idx) => {
              const Icon = stat?.icon ?? Target;
              return (
                <div
                  key={idx}
                  className="bg-white border border-border-light rounded-2xl p-5 text-center shadow-sm"
                >
                  <Icon size={24} className="text-accent-gold mx-auto mb-3" />
                  <div className="font-heading font-bold text-2xl md:text-3xl text-accent-gold mb-1">
                    <AnimatedCounter target={stat?.value ?? 0} inView={inView} />
                  </div>
                  <div className="text-xs text-text-muted uppercase tracking-wider">
                    {stat?.label ?? ''}
                  </div>
                </div>
              );
            }) ?? []}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
