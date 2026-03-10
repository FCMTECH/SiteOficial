'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Search, Zap, FolderKanban, Globe, Palette,
  ArrowRight, CheckCircle2
} from 'lucide-react';

interface ServicesSectionProps {
  t: (key: string) => string;
  tArray: (key: string) => string[];
}

const serviceIcons = [
  Search,   // Consultoria
  Zap,      // Automações
  FolderKanban, // Gestão
];

const extraServices = [
  { icon: Globe, key: 'webDev' },
  { icon: Palette, key: 'branding' },
];

export function ServicesSection({ t, tArray }: ServicesSectionProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const serviceKeys = ['consulting', 'automation', 'projectMgmt'] as const;

  return (
    <section id="services" className="py-24 md:py-32 relative bg-bg-tertiary" ref={ref}>
      <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título da seção */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2 className="heading-lg font-heading font-bold mb-4 text-text-primary">
            {t('services.title')}
          </h2>
          <p className="text-body text-text-secondary max-w-xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Cards principais (3 colunas) */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {serviceKeys?.map?.((key, idx) => {
            const Icon = serviceIcons?.[idx] ?? Search;
            const items = tArray(`services.${key}.items`);
            return (
              <motion.div
                key={key}
                className="group relative bg-white border border-border-light rounded-2xl p-6 md:p-8 hover:border-accent-gold/30 transition-all duration-500 hover:shadow-lg"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -4 }}
              >
                {/* Ícone */}
                <div className="w-12 h-12 rounded-xl bg-accent-gold/10 flex items-center justify-center mb-5 group-hover:bg-accent-gold/20 transition-colors">
                  <Icon size={22} className="text-accent-gold" />
                </div>

                <h3 className="font-heading font-semibold text-lg mb-1 text-text-primary">
                  {t(`services.${key}.title`)}
                </h3>
                <p className="text-sm text-accent-gold-dark mb-5">
                  {t(`services.${key}.subtitle`)}
                </p>

                {/* Lista de itens */}
                <ul className="space-y-2.5 mb-6">
                  {items?.map?.((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <CheckCircle2 size={15} className="text-accent-gold mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  )) ?? []}
                </ul>

                {/* Resultado */}
                <div className="pt-4 border-t border-border-light">
                  <p className="text-sm text-accent-gold-dark flex items-center gap-2">
                    <ArrowRight size={14} />
                    {t(`services.${key}.result`)}
                  </p>
                </div>
              </motion.div>
            );
          }) ?? []}
        </div>

        {/* Cards menores (2 colunas) */}
        <div className="grid md:grid-cols-2 gap-6">
          {extraServices?.map?.((svc, idx) => {
            const Icon = svc?.icon ?? Globe;
            return (
              <motion.div
                key={svc?.key}
                className="group bg-white border border-border-light rounded-2xl p-6 md:p-8 hover:border-accent-gold/30 transition-all duration-500 hover:shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + idx * 0.15, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-accent-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-gold/20 transition-colors">
                    <Icon size={22} className="text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2 text-text-primary">
                      {t(`services.${svc?.key}.title`)}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {t(`services.${svc?.key}.description`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          }) ?? []}
        </div>
      </div>
    </section>
  );
}
