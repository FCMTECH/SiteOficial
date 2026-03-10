'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  t: (key: string) => string;
}

// Componente de partículas flutuantes
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: i % 3 === 0 ? 'rgba(212, 175, 55, 0.3)' : 'rgba(212, 175, 55, 0.15)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}

// Grid animado tecnológico
function TechGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid de linhas horizontais */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/10 to-transparent"
          style={{ top: `${12 + i * 12}%` }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: i * 0.1, ease: 'easeOut' }}
        />
      ))}
      {/* Grid de linhas verticais */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent-gold/5 to-transparent"
          style={{ left: `${8 + i * 8}%` }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 + i * 0.05, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

// Linhas de conexão animadas
function ConnectionLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.15 }}>
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
          <stop offset="50%" stopColor="#D4AF37" stopOpacity="1" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[...Array(5)].map((_, i) => (
        <motion.line
          key={i}
          x1={`${10 + i * 20}%`}
          y1="0%"
          x2={`${30 + i * 15}%`}
          y2="100%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: i * 0.3, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  );
}

// Círculos de pulso tecnológicos
function PulseCircles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Círculo central grande */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-accent-gold/10"
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-accent-gold/15"
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-accent-gold/20"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      
      {/* Pontos nos cantos */}
      {[
        { x: '15%', y: '20%' },
        { x: '85%', y: '25%' },
        { x: '10%', y: '75%' },
        { x: '90%', y: '70%' },
        { x: '50%', y: '85%' },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-accent-gold/40"
          style={{ left: pos.x, top: pos.y }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export function HeroSection({ t }: HeroSectionProps) {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCases = () => {
    document.getElementById('cases')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-bg-primary to-bg-tertiary">
      {/* Fundo tecnológico animado */}
      <TechGrid />
      <ConnectionLines />
      <PulseCircles />
      <FloatingParticles />

      {/* Gradient overlays para profundidade */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-bg-tertiary to-transparent z-10" />

      {/* Glow dourado central */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent-gold/5 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Conteúdo */}
      <div className="container-premium relative z-20 text-center px-4">
        {/* Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-gold/10 border border-accent-gold/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
          <span className="text-sm font-medium text-accent-gold-dark tracking-wide">
            {t('hero.kicker')}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-text-primary mb-6 leading-tight"
        >
          <span className="block">Automação.</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold via-accent-gold-dark to-accent-gold">
            Gestão & Performance
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10"
        >
          {t('hero.subheadline')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={scrollToServices}
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-gold text-white rounded-xl font-semibold hover:bg-accent-gold-dark transition-all duration-300 shadow-lg shadow-accent-gold/30 hover:shadow-xl hover:shadow-accent-gold/40 hover:-translate-y-1"
          >
            {t('hero.cta')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={scrollToCases}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-border-medium text-text-primary rounded-xl font-semibold hover:bg-bg-tertiary hover:border-accent-gold/30 transition-all duration-300"
          >
            {t('hero.ctaSecondary')}
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={scrollToServices}
        >
          <span className="text-xs text-text-muted tracking-wider uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 text-accent-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
