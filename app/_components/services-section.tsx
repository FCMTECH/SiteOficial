'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  LineChart, 
  Cog, 
  FolderKanban, 
  Globe, 
  Palette,
  Check,
  Sparkles
} from 'lucide-react';

interface ServicesSectionProps {
  t: (key: string) => string;
  tArray: (key: string) => string[];
}

const services = [
  { 
    icon: LineChart, 
    key: 'consulting',
    gradient: 'from-accent-gold/20 to-accent-gold/5'
  },
  { 
    icon: Cog, 
    key: 'automation',
    gradient: 'from-accent-blue/20 to-accent-blue/5'
  },
  { 
    icon: FolderKanban, 
    key: 'management',
    gradient: 'from-accent-teal/20 to-accent-teal/5'
  },
];

const extraServices = [
  { icon: Globe, key: 'webdev' },
  { icon: Palette, key: 'branding' },
];

export function ServicesSection({ t, tArray }: ServicesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      id="services" 
      ref={ref}
      className="relative py-24 md:py-32 bg-bg-tertiary overflow-hidden"
    >
      {/* Fundo com padrão de pontos tecnológico */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 175, 55, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Gradientes decorativos */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl" />

      {/* Linhas decorativas */}
      <div className="absolute top-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/10 to-transparent" />
      <div className="absolute bottom-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/10 to-transparent" />

      <div className="container-premium relative z-10 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20 mb-4">
            <Sparkles className="w-4 h-4 text-accent-gold" />
            <span className="text-sm text-accent-gold-dark">Soluções</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            {t('services.title')}
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Main Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            const items = tArray(`services.${service.key}.items`);
            
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative"
              >
                <div className="relative bg-white rounded-2xl p-8 border border-border-light hover:border-accent-gold/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent-gold/10 hover:-translate-y-2 overflow-hidden">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent-gold/10 to-transparent rounded-bl-3xl" />
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-accent-gold/10 flex items-center justify-center mb-6 group-hover:bg-accent-gold/20 transition-colors">
                      <Icon className="w-7 h-7 text-accent-gold" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-text-primary mb-2">
                      {t(`services.${service.key}.title`)}
                    </h3>
                    <p className="text-sm text-text-secondary mb-6">
                      {t(`services.${service.key}.subtitle`)}
                    </p>
                    
                    <ul className="space-y-3 mb-6">
                      {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                          <Check className="w-4 h-4 text-accent-gold mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="pt-4 border-t border-border-light">
                      <span className="text-lg font-bold text-accent-gold">
                        {t(`services.${service.key}.result`)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Extra Services */}
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {extraServices.map((service, index) => {
            const Icon = service.icon;
            
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-xl p-6 border border-border-light hover:border-accent-gold/30 transition-all duration-300 hover:shadow-lg flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent-gold/10 flex items-center justify-center group-hover:bg-accent-gold/20 transition-colors">
                    <Icon className="w-6 h-6 text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      {t(`services.${service.key}.title`)}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {t(`services.${service.key}.subtitle`)}
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
