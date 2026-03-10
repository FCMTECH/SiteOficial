'use client';

import Image from 'next/image';
import { Linkedin, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  t: (key: string) => string;
}

export function Footer({ t }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-bg-tertiary border-t border-border-light overflow-hidden">
      {/* Decoração sutil */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent" />
      
      <div className="container-premium px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logo.png"
                  alt="FCM TECH"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-text-primary">
                FCM<span className="text-accent-gold">TECH</span>
              </span>
            </div>
            <p className="text-text-secondary text-sm mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com/company/fcmtech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white border border-border-light flex items-center justify-center text-text-secondary hover:text-accent-gold hover:border-accent-gold/30 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/5561993270174"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white border border-border-light flex items-center justify-center text-text-secondary hover:text-green-600 hover:border-green-500/30 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
              {t('footer.services')}
            </h4>
            <ul className="space-y-3">
              {['Consultoria', 'Automação', 'Gestão de Projetos', 'Desenvolvimento Web', 'Identidade Visual'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="text-text-secondary hover:text-accent-gold transition-colors text-sm"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
              {t('footer.company')}
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Casos de Sucesso', id: 'cases' },
                { label: 'Sobre Nós', id: 'about' },
                { label: 'Contato', id: 'contact' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-text-secondary hover:text-accent-gold transition-colors text-sm"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-accent-gold mt-0.5" />
                <span className="text-text-secondary text-sm">comercial@fcmtech.com.br</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-accent-gold mt-0.5" />
                <span className="text-text-secondary text-sm">+55 61 99327-0174</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent-gold mt-0.5" />
                <span className="text-text-secondary text-sm">Brasília, DF - Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border-light">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-text-muted">
              © {currentYear} FCM TECH. {t('footer.rights')}
            </p>
            <div className="flex items-center gap-1 text-sm text-text-muted">
              <span>Feito com</span>
              <span className="text-accent-gold">♥</span>
              <span>pela FCM TECH</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
