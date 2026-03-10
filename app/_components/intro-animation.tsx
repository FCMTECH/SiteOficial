'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
  t: (key: string) => string;
}

export function IntroAnimation({ onComplete, t }: IntroAnimationProps) {
  const [phase, setPhase] = useState<'logo' | 'expand' | 'reveal'>('logo');

  useEffect(() => {
    // Fase 1: Logo aparece e fica visível por mais tempo (3.5s)
    const timer1 = setTimeout(() => setPhase('expand'), 3500);
    // Fase 2: Expansão mais suave (1.5s)
    const timer2 = setTimeout(() => setPhase('reveal'), 5000);
    // Fase 3: Revela o conteúdo (1s de transição)
    const timer3 = setTimeout(() => onComplete(), 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#FAFAFA' }}
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: phase === 'reveal' ? 0 : 1,
      }}
      transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Linhas decorativas animadas - mais lentas */}
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: phase === 'logo' ? 1 : 1.5 }}
        transition={{ duration: 2, ease: [0.23, 1, 0.32, 1], delay: 0.5 }}
      />
      <motion.div
        className="absolute top-[calc(50%-80px)] left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/10 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: phase === 'logo' ? 1 : 1.5 }}
        transition={{ duration: 2.2, ease: [0.23, 1, 0.32, 1], delay: 0.7 }}
      />
      <motion.div
        className="absolute top-[calc(50%+80px)] left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/10 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: phase === 'logo' ? 1 : 1.5 }}
        transition={{ duration: 2.2, ease: [0.23, 1, 0.32, 1], delay: 0.7 }}
      />

      {/* Container central */}
      <motion.div
        className="relative flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ 
          opacity: phase === 'reveal' ? 0 : 1, 
          y: 0,
          scale: phase === 'expand' ? 1.05 : 1
        }}
        transition={{ 
          duration: 1.2, 
          ease: [0.23, 1, 0.32, 1],
          scale: { duration: 0.8 }
        }}
      >
        {/* Logo com brilho suave */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
          }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
        >
          {/* Glow effect atrás do logo */}
          <motion.div
            className="absolute inset-0 blur-3xl bg-accent-gold/20 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0.6 }}
            transition={{ duration: 2, ease: 'easeOut', delay: 0.8 }}
          />
          <Image
            src="/images/logo.png"
            alt="FCM TECH"
            width={180}
            height={180}
            className="relative z-10"
            priority
          />
        </motion.div>

        {/* Tagline com reveal suave */}
        <motion.div
          className="overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.p
            className="text-lg md:text-xl tracking-[0.4em] text-accent-gold font-light"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 1.5 }}
          >
            {t('intro.tagline')}
          </motion.p>
        </motion.div>

        {/* Loading dots - mais lentos */}
        <motion.div
          className="flex gap-2 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-accent-gold/60"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Partículas flutuantes sutis */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-accent-gold/30"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [-15, 15, -15],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.4,
          }}
        />
      ))}
    </motion.div>
  );
}
