'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface IntroAnimationProps {
  t: (key: string) => string;
  onComplete: () => void;
}

/**
 * IntroAnimation - Animação de entrada premium e elegante
 * Design minimalista com foco na marca FCM TECH
 */
export function IntroAnimation({ t, onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<'logo' | 'expand' | 'reveal'>('logo');

  useEffect(() => {
    // Timeline da animação
    // Fase 1: Logo aparece (0-1.2s)
    const expandTimer = setTimeout(() => setPhase('expand'), 1200);
    // Fase 2: Expansão dourada (1.2-2.2s)
    const revealTimer = setTimeout(() => setPhase('reveal'), 2200);
    // Fase 3: Fade out e completar (2.2-2.8s)
    const completeTimer = setTimeout(() => onComplete(), 2800);

    return () => {
      clearTimeout(expandTimer);
      clearTimeout(revealTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Easing premium
  const easeSmooth = [0.23, 1, 0.32, 1];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#FAFAFA' }}
        initial={{ opacity: 1 }}
        animate={phase === 'reveal' ? { opacity: 0 } : { opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: easeSmooth }}
      >
        {/* Background sutil com gradiente */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(191, 167, 111, 0.08) 0%, transparent 70%)',
          }}
        />

        {/* Círculo dourado expandindo */}
        <motion.div
          className="absolute rounded-full"
          style={{
            background: 'linear-gradient(135deg, #D4C495 0%, #BFA76F 50%, #9A8656 100%)',
          }}
          initial={{ 
            width: 0, 
            height: 0, 
            opacity: 0 
          }}
          animate={
            phase === 'expand' || phase === 'reveal'
              ? { 
                  width: '250vmax', 
                  height: '250vmax', 
                  opacity: phase === 'reveal' ? 0 : 0.15 
                }
              : { 
                  width: 0, 
                  height: 0, 
                  opacity: 0 
                }
          }
          transition={{ 
            duration: 1.2, 
            ease: easeSmooth 
          }}
        />

        {/* Linhas douradas decorativas */}
        <motion.div
          className="absolute w-[200px] md:w-[300px] h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent, #BFA76F, transparent)',
            top: '35%',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={
            phase === 'logo' || phase === 'expand'
              ? { scaleX: 1, opacity: 0.6 }
              : { scaleX: 0, opacity: 0 }
          }
          transition={{ duration: 0.8, delay: 0.4, ease: easeSmooth }}
        />
        <motion.div
          className="absolute w-[200px] md:w-[300px] h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent, #BFA76F, transparent)',
            bottom: '35%',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={
            phase === 'logo' || phase === 'expand'
              ? { scaleX: 1, opacity: 0.6 }
              : { scaleX: 0, opacity: 0 }
          }
          transition={{ duration: 0.8, delay: 0.5, ease: easeSmooth }}
        />

        {/* Conteúdo central */}
        <div className="relative z-10 text-center flex flex-col items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={
              phase === 'reveal'
                ? { opacity: 0, scale: 1.1, y: -20 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            transition={{ 
              duration: 0.8, 
              delay: phase === 'logo' ? 0.1 : 0,
              ease: easeSmooth 
            }}
          >
            <Image
              src="/images/logo.png"
              alt="FCM TECH"
              width={180}
              height={60}
              className="w-[140px] md:w-[180px] h-auto"
              priority
            />
          </motion.div>

          {/* Tagline */}
          <motion.div
            className="mt-6 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={
              phase === 'reveal'
                ? { opacity: 0 }
                : { opacity: 1 }
            }
            transition={{ duration: 0.5, ease: easeSmooth }}
          >
            <motion.p
              className="text-sm md:text-base font-medium tracking-[0.25em] uppercase"
              style={{ color: '#9A8656' }}
              initial={{ y: 30, opacity: 0 }}
              animate={
                phase === 'logo' || phase === 'expand'
                  ? { y: 0, opacity: 1 }
                  : { y: -20, opacity: 0 }
              }
              transition={{ duration: 0.7, delay: 0.3, ease: easeSmooth }}
            >
              {t('intro.tagline')}
            </motion.p>
          </motion.div>

          {/* Indicador de loading elegante */}
          <motion.div
            className="mt-8 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={
              phase === 'logo'
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: '#BFA76F' }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.15,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Bordas decorativas */}
        <motion.div
          className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2"
          style={{ borderColor: '#D4C495' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            phase === 'reveal'
              ? { opacity: 0, scale: 1.2 }
              : { opacity: 0.4, scale: 1 }
          }
          transition={{ duration: 0.6, delay: 0.2, ease: easeSmooth }}
        />
        <motion.div
          className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2"
          style={{ borderColor: '#D4C495' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            phase === 'reveal'
              ? { opacity: 0, scale: 1.2 }
              : { opacity: 0.4, scale: 1 }
          }
          transition={{ duration: 0.6, delay: 0.3, ease: easeSmooth }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
