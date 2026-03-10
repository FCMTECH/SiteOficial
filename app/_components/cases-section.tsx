'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface CasesSectionProps {
  t: (key: string) => string;
}

const clients = [
  { name: 'STN', logo: '/images/clients/stn.png', id: 'stn' },
  { name: 'Tribunal Superior Eleitoral', logo: '/images/clients/STE.png', id: 'tse' },
  { name: 'Panasonic', logo: '/images/clients/Panasonic.png', id: 'panasonic' },
  { name: 'Polícia Federal', logo: '/images/clients/PF-AL.png', id: 'pf-al' },
  { name: 'PMDF', logo: '/images/clients/pmdf.png', id: 'pmdf' },
  { name: 'DPU', logo: '/images/clients/DPU.png', id: 'dpu' },
];

const partners = [
  { name: 'Ewave', logo: '/images/clients/ewave.jpeg' },
  { name: '3Corp', logo: '/images/clients/3corp.png' },
  { name: 'BMG', logo: '/images/clients/BMG.svg' },
  { name: 'Inovafarma', logo: '/images/clients/INOVAFARMA.png' },
  { name: 'SOS Docs', logo: '/images/clients/saga.jpeg' },
  { name: 'Sigecom', logo: '/images/clients/Sigecom.png' },
];

export function CasesSection({ t }: CasesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="cases" ref={ref} className="py-24 md:py-32 bg-white">
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

        {/* Clients Grid - 3x2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {clients.map((client) => (
              <div
                key={client.id}
                className="bg-bg-tertiary rounded-xl p-6 border border-border-light hover:border-accent-gold/30 transition-all duration-300 hover:shadow-lg flex flex-col items-center justify-center"
              >
                <div className="relative w-32 h-20 mb-3">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs text-text-muted">{client.id}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-8">
            <span className="text-sm text-text-muted uppercase tracking-wider">{t('cases.partners')}</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex items-center justify-center hover:opacity-100 transition-opacity"
              >
                <div className="relative w-24 h-12 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all">
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
