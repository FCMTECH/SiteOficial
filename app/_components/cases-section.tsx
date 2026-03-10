'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, TrendingUp } from 'lucide-react';
import Image from 'next/image';

interface CasesSectionProps {
  t: (key: string) => string;
}

const clients = [
  { name: 'STN', logo: '/images/clients/stn.png' },
  { name: 'TSE', logo: '/images/clients/STE.png' },
  { name: 'Panasonic', logo: '/images/clients/Panasonic.png' },
  { name: 'PF-AL', logo: '/images/clients/PF-AL.png' },
  { name: 'PMDF', logo: '/images/clients/pmdf.png' },
  { name: 'DPU', logo: '/images/clients/DPU.png' },
];

const partners = [
  { name: 'Ewave', logo: '/images/clients/ewave.jpeg' },
  { name: '3Corp', logo: '/images/clients/3corp.png' },
  { name: 'BMG', logo: '/images/clients/BMG.svg' },
  { name: 'Inovafarma', logo: '/images/clients/INOVAFARMA.png' },
  { name: 'SAGA', logo: '/images/clients/saga.jpeg' },
  { name: 'Sigecom', logo: '/images/clients/Sigecom.png' },
];

export function CasesSection({ t }: CasesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      id="cases" 
      ref={ref}
      className="relative py-24 md:py-32 bg-white overflow-hidden"
    >
      {/* Fundo com linhas diagonais sutis */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 40px,
              #D4AF37 40px,
              #D4AF37 41px
            )`,
          }}
        />
      </div>

      {/* Círculos decorativos */}
      <div className="absolute top-20 right-10 w-64 h-64 border border-accent-gold/10 rounded-full" />
      <div className="absolute bottom-20 left-10 w-48 h-48 border border-accent-gold/10 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-accent-gold/5 rounded-full" />

      <div className="container-premium relative z-10 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20 mb-4">
            <TrendingUp className="w-4 h-4 text-accent-gold" />
            <span className="text-sm text-accent-gold-dark">Resultados</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            {t('cases.title')}
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {t('cases.subtitle')}
          </p>
        </motion.div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {[1, 2, 3].map((num, index) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="relative bg-bg-tertiary rounded-2xl p-8 border border-border-light hover:border-accent-gold/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent-gold/10 hover:-translate-y-2 overflow-hidden h-full">
                {/* Decoração do canto */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent-gold/10 to-transparent rounded-bl-3xl" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-accent-gold/10 flex items-center justify-center mb-6">
                    <Award className="w-6 h-6 text-accent-gold" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-text-primary mb-3">
                    {t(`cases.case${num}.title`)}
                  </h3>
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {t(`cases.case${num}.description`)}
                  </p>
                  
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-gold/10 rounded-full">
                    <span className="text-lg font-bold text-accent-gold">
                      {t(`cases.case${num}.result`)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Clients Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 lg:gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                className="group flex items-center justify-center p-4 bg-bg-tertiary rounded-xl border border-border-light hover:border-accent-gold/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative w-24 h-16 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-300">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-sm text-text-secondary">
              <div className="w-8 h-px bg-accent-gold/30" />
              <span>{t('cases.partners')}</span>
              <div className="w-8 h-px bg-accent-gold/30" />
            </div>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
                className="group flex items-center justify-center p-3 rounded-lg hover:bg-bg-tertiary transition-colors"
              >
                <div className="relative w-20 h-12 grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-80 transition-all duration-300">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
