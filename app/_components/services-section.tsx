'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  LineChart, 
  Cog, 
  FolderKanban, 
  Code2,
  Palette,
  Check
} from 'lucide-react';

interface ServicesSectionProps {
  t: (key: string) => string;
  tArray: (key: string) => string[];
}

const mainServices = [
  { icon: LineChart, key: 'consulting' },
  { icon: Cog, key: 'automation' },
  { icon: FolderKanban, key: 'management' },
];

const extraServices = [
  { icon: Code2, key: 'webDev' },
  { icon: Palette, key: 'branding' },
];

export function ServicesSection({ t, tArray }: ServicesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" ref={ref} className="py-24 md:py-32 bg-bg-tertiary">
      <div className="container-premium px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Main Services - 3 colunas */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {mainServices.map((service, index) => {
            const Icon = service.icon;
            const items = tArray(`services.${service.key}.items`);
            
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-2xl p-6 border border-border-light hover:border-accent-gold/30 transition-all duration-300 hover:shadow-lg h-full">
                  <div className="w-12 h-12 rounded-xl bg-accent-gold/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent-gold" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-text-primary mb-1">
                    {t(`services.${service.key}.title`)}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4">
                    {t(`services.${service.key}.subtitle`)}
                  </p>
                  
                  <ul className="space-y-2 mb-4">
                    {items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                        <Check className="w-4 h-4 text-accent-gold mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-3 border-t border-border-light">
                    <span className="text-base font-bold text-accent-gold">
                      {t(`services.${service.key}.result`)}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Extra Services - 2 colunas */}
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {extraServices.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <div className="bg-white rounded-xl p-5 border border-border-light hover:border-accent-gold/30 transition-all duration-300 hover:shadow-lg flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent-gold/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      {t(`services.${service.key}.title`)}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {t(`services.${service.key}.description`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
