'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award } from 'lucide-react';
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
      className="py-24 md:py-32 bg-white"
    >
      <div className="container-premium px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            {t('cases.title')}
          </h2>
          <p className="text-lg text-text-secondary">
            {t('cases.subtitle')}
          </p>
        </motion.div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[1, 2, 3].map((num, index) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-bg-tertiary rounded-xl p-6 border border-border-light hover:border-accent-gold/30 transition-all duration-300 hover:shadow-lg h-full">
                <div className="w-10 h-10 rounded-lg bg-accent-gold/10 flex items-center justify-center mb-4">
                  <Award className="w-5 h-5 text-accent-gold" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  {t(`cases.case${num}.title`)}
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  {t(`cases.case${num}.description`)}
                </p>
                <span className="text-base font-bold text-accent-gold">
                  {t(`cases.case${num}.result`)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Clients Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {clients.map((client) => (
              <div
                key={client.name}
                className="flex items-center justify-center p-4 bg-bg-tertiary rounded-lg border border-border-light hover:border-accent-gold/30 transition-all"
              >
                <div className="relative w-20 h-12 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="text-center mb-6">
            <span className="text-sm text-text-muted">{t('cases.partners')}</span>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex items-center justify-center p-3 rounded-lg hover:bg-bg-tertiary transition-colors"
              >
                <div className="relative w-16 h-10 grayscale hover:grayscale-0 opacity-50 hover:opacity-80 transition-all">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
