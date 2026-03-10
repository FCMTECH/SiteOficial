'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Award } from 'lucide-react';

interface CasesSectionProps {
  t: (key: string) => string;
}

// Dados dos cases e clientes
const mainCases = [
  { key: 'stn', logo: '/images/clients/stn.png', name: 'STN' },
  { key: 'tse', logo: '/images/clients/STE.png', name: 'TSE' },
  { key: 'panasonic', logo: '/images/clients/Panasonic.png', name: 'Panasonic' },
  { key: 'pfal', logo: '/images/clients/PF-AL.png', name: 'PF-AL' },
  { key: 'pmdf', logo: '/images/clients/pmdf.png', name: 'PMDF' },
  { key: 'dpu', logo: '/images/clients/DPU.png', name: 'DPU' },
];

const partnerLogos = [
  { src: '/images/clients/ewave.jpeg', name: 'Ewave do Brasil' },
  { src: '/images/clients/itss.png', name: 'ITSS' },
  { src: '/images/clients/3corp.png', name: '3Corp' },
  { src: '/images/clients/skytech.jpg', name: 'SkyTech' },
  { src: '/images/clients/saga.jpeg', name: 'Saga' },
  { src: '/images/clients/k2.png', name: 'K2' },
  { src: '/images/clients/sosdocs.jpeg', name: 'SOSDocs' },
  { src: '/images/clients/BMG.svg', name: 'BMG' },
  { src: '/images/clients/INOVAFARMA.png', name: 'Inovafarma' },
  { src: '/images/clients/Sigecom.png', name: 'Sigecom' },
];

export function CasesSection({ t }: CasesSectionProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="cases" className="py-24 md:py-32 relative bg-white" ref={ref}>
      <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2 className="heading-lg font-heading font-bold mb-4 text-text-primary">
            {t('cases.title')}
          </h2>
          <p className="text-body text-text-secondary max-w-xl mx-auto">
            {t('cases.subtitle')}
          </p>
        </motion.div>

        {/* Cases cards - grid responsivo */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-16">
          {mainCases?.map?.((c, idx) => (
            <motion.div
              key={c?.key}
              className="group bg-bg-tertiary border border-border-light rounded-2xl p-6 flex flex-col items-center text-center hover:border-accent-gold/30 transition-all duration-500 hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.23, 1, 0.32, 1] }}
              whileHover={{ y: -4 }}
            >
              <div className="relative w-full aspect-[3/1.5] mb-4 flex items-center justify-center">
                <Image
                  src={c?.logo ?? ''}
                  alt={`Logo ${c?.name ?? ''}`}
                  fill
                  className="object-contain p-2 transition-all duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                {t(`cases.${c?.key}`)}
              </p>
            </motion.div>
          )) ?? []}
        </div>

        {/* Carrossel de parceiros */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center gap-2 justify-center mb-8">
            <Award size={18} className="text-accent-gold" />
            <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">
              {t('cases.partners')}
            </h3>
          </div>

          {/* Grid de parceiros */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 md:gap-8">
            {partnerLogos?.map?.((p, idx) => (
              <motion.div
                key={`partner-${p?.name}-${idx}`}
                className="relative w-full aspect-[2.5/1] opacity-60 hover:opacity-100 transition-opacity duration-500"
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 0.6, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + idx * 0.05 }}
                whileHover={{ opacity: 1 }}
              >
                <Image
                  src={p?.src ?? ''}
                  alt={`Parceiro de tecnologia ${p?.name ?? ''}`}
                  fill
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 20vw"
                />
              </motion.div>
            )) ?? []}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
