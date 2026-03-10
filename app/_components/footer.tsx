'use client';

import { Linkedin, MessageCircle } from 'lucide-react';

interface FooterProps {
  t: (key: string) => string;
}

export function Footer({ t }: FooterProps) {
  const scrollTo = (id: string) => {
    document?.getElementById?.(id)?.scrollIntoView?.({ behavior: 'smooth' });
  };

  const currentYear = 2026;

  const serviceLinks = [
    { label: 'services.consulting.title', id: 'services' },
    { label: 'services.automation.title', id: 'services' },
    { label: 'services.projectMgmt.title', id: 'services' },
    { label: 'services.webDev.title', id: 'services' },
    { label: 'services.branding.title', id: 'services' },
  ];

  const companyLinks = [
    { label: 'cases.title', id: 'cases' },
    { label: 'contact.title', id: 'contact' },
  ];

  return (
    <footer className="relative pt-16 pb-8 bg-white border-t border-border-light">
      <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo e tagline */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent-gold/10 flex items-center justify-center">
                <span className="font-heading font-bold text-sm text-accent-gold">F</span>
              </div>
              <span className="font-heading font-bold text-lg">
                <span className="text-accent-gold">FCM</span>
                <span className="text-text-primary"> TECH</span>
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              {t('footer.tagline')}
            </p>

            {/* Social */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://www.linkedin.com/company/fcmtech/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-bg-tertiary flex items-center justify-center text-text-muted hover:text-accent-gold hover:bg-accent-gold/10 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://wa.me/5561993700174"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-bg-tertiary flex items-center justify-center text-text-muted hover:text-green-600 hover:bg-green-500/10 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Serviços */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-text-primary mb-4 uppercase tracking-wider">
              {t('footer.servicesTitle')}
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks?.map?.((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => scrollTo(link?.id ?? '')}
                    className="text-sm text-text-muted hover:text-accent-gold transition-colors duration-300"
                  >
                    {t(link?.label ?? '')}
                  </button>
                </li>
              )) ?? []}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-text-primary mb-4 uppercase tracking-wider">
              {t('footer.companyTitle')}
            </h4>
            <ul className="space-y-2.5">
              {companyLinks?.map?.((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => scrollTo(link?.id ?? '')}
                    className="text-sm text-text-muted hover:text-accent-gold transition-colors duration-300"
                  >
                    {t(link?.label ?? '')}
                  </button>
                </li>
              )) ?? []}
            </ul>
          </div>

          {/* Contato rápido */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-text-primary mb-4 uppercase tracking-wider">
              {t('contact.title')}
            </h4>
            <div className="space-y-2.5">
              <a
                href="mailto:comercial@fcmtech.com.br"
                className="block text-sm text-text-muted hover:text-accent-gold transition-colors"
              >
                comercial@fcmtech.com.br
              </a>
              <a
                href="tel:+5561993700174"
                className="block text-sm text-text-muted hover:text-accent-gold transition-colors"
              >
                +55 61 99370-0174
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border-light text-center">
          <p className="text-xs text-text-muted">
            {(t('footer.copyright') ?? '').replace('{year}', String(currentYear))}
          </p>
        </div>
      </div>
    </footer>
  );
}
