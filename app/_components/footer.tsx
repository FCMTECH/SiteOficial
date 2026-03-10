'use client';

import Image from 'next/image';
import { Linkedin, MessageCircle, Mail, Phone } from 'lucide-react';

interface FooterProps {
  t: (key: string) => string;
}

export function Footer({ t }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-bg-tertiary border-t border-border-light">
      <div className="container-premium py-12">
        <div className="grid md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-3">
              <div className="relative w-8 h-8">
                <Image src="/images/logo.png" alt="FCM TECH" fill className="object-contain" />
              </div>
              <span className="text-lg font-bold text-text-primary">FCM<span className="text-accent-gold">TECH</span></span>
            </div>
            <p className="text-sm text-text-secondary mb-4">{t('footer.tagline')}</p>
            <div className="flex gap-2">
              <a href="https://linkedin.com/company/fcmtech" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white border border-border-light flex items-center justify-center text-text-secondary hover:text-accent-gold transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://wa.me/5561993270174" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white border border-border-light flex items-center justify-center text-text-secondary hover:text-green-600 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">{t('footer.servicesTitle')}</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><button onClick={() => scrollToSection('services')} className="hover:text-accent-gold transition-colors">{t('footer.services.consulting')}</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-accent-gold transition-colors">{t('footer.services.automation')}</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-accent-gold transition-colors">{t('footer.services.management')}</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-accent-gold transition-colors">{t('footer.services.development')}</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-accent-gold transition-colors">{t('footer.services.branding')}</button></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">{t('footer.companyTitle')}</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><button onClick={() => scrollToSection('cases')} className="hover:text-accent-gold transition-colors">{t('footer.company.cases')}</button></li>
              <li><button onClick={() => scrollToSection('about')} className="hover:text-accent-gold transition-colors">{t('footer.company.about')}</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-accent-gold transition-colors">{t('footer.company.contact')}</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">{t('footer.contactTitle')}</h4>
            <div className="space-y-2 text-sm text-text-secondary">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-4 h-4 text-accent-gold" />
                <span>comercial@fcmtech.com.br</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Phone className="w-4 h-4 text-accent-gold" />
                <span>+55 61 99327-0174</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border-light text-center text-sm text-text-muted">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
}
