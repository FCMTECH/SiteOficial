'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  LineChart, 
  Cog, 
  FolderKanban, 
  Code2,
  Palette,
  Check,
  Server,
  Brain,
  Globe
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

export function ServicesSection({ t, tArray }: ServicesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" ref={ref} className="py-20 md:py-28 bg-bg-tertiary">
      <div className="container-premium">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
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

        {/* Desenvolvimento & Tecnologia - Card Grande Completo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl p-8 border border-border-light hover:border-accent-gold/30 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-accent-gold/10 flex items-center justify-center">
                <Code2 className="w-7 h-7 text-accent-gold" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text-primary">
                  {t('services.development.title')}
                </h3>
                <p className="text-sm text-text-secondary">
                  {t('services.development.subtitle')}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Desenvolvimento de Software */}
              <div className="bg-bg-tertiary rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5 text-accent-gold" />
                  <h4 className="font-semibold text-text-primary">{t('services.development.software.title')}</h4>
                </div>
                <ul className="space-y-2">
                  {tArray('services.development.software.items').map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <Check className="w-3.5 h-3.5 text-accent-gold mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Infraestrutura & DevOps */}
              <div className="bg-bg-tertiary rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Server className="w-5 h-5 text-accent-gold" />
                  <h4 className="font-semibold text-text-primary">{t('services.development.infra.title')}</h4>
                </div>
                <ul className="space-y-2">
                  {tArray('services.development.infra.items').map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <Check className="w-3.5 h-3.5 text-accent-gold mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Inteligência Artificial */}
              <div className="bg-bg-tertiary rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="w-5 h-5 text-accent-gold" />
                  <h4 className="font-semibold text-text-primary">{t('services.development.ai.title')}</h4>
                </div>
                <ul className="space-y-2">
                  {tArray('services.development.ai.items').map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <Check className="w-3.5 h-3.5 text-accent-gold mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Stack de Tecnologias */}
            <div className="mt-6 pt-6 border-t border-border-light">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-3">{t('services.development.stack')}</p>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'Node.js', 'Python', 'TypeScript', 'AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'OpenAI', 'LangChain'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-accent-gold/10 text-accent-gold-dark text-xs rounded-full font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Identidade Visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-white rounded-xl p-5 border border-border-light hover:border-accent-gold/30 transition-all duration-300 hover:shadow-lg flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-accent-gold/10 flex items-center justify-center flex-shrink-0">
              <Palette className="w-6 h-6 text-accent-gold" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">
                {t('services.branding.title')}
              </h3>
              <p className="text-sm text-text-secondary">
                {t('services.branding.description')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
