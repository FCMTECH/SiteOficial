'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  t: (key: string) => string;
}

export function HeroSection({ t }: HeroSectionProps) {
  const scrollTo = (id: string) => {
    document?.getElementById?.(id)?.scrollIntoView?.({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-bg-primary to-bg-tertiary"
      aria-label="Hero"
    >
      {/* Background gradientes sutis */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-accent-gold/5 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-gold-light/5 blur-[150px]" />
      </div>

      {/* Grid pattern sutil dourado */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(191,167,111,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(191,167,111,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
        {/* Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-gold/30 bg-accent-gold/5 mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
          <span className="text-accent-gold-dark text-sm font-medium tracking-wider uppercase">
            {t('hero.kicker')}
          </span>
        </motion.div>

        {/* Título principal */}
        <motion.h1
          className="heading-xl font-heading font-bold mb-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="bg-gradient-to-r from-text-primary via-accent-gold to-accent-gold-dark bg-clip-text text-transparent">
            {t('hero.headline')}
          </span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          className="text-body text-text-secondary max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          {t('hero.subheadline')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <button
            onClick={() => scrollTo('contact')}
            className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-gold to-accent-gold-dark text-white font-semibold rounded-full btn-pulse hover:scale-105 transition-transform duration-300 shadow-gold"
          >
            {t('hero.cta1')}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollTo('services')}
            className="px-8 py-4 border-2 border-border-medium text-text-secondary rounded-full hover:border-accent-gold hover:text-accent-gold-dark hover:bg-accent-gold/5 transition-all duration-300"
          >
            {t('hero.cta2')}
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 1.5 }, y: { repeat: Infinity, duration: 2 } }}
        >
          <ChevronDown size={24} className="text-accent-gold" />
        </motion.div>
      </div>
    </section>
  );
}
