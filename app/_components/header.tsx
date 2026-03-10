'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { locales } from '@/i18n/config';
import Image from 'next/image';

interface HeaderProps {
  t: (key: string) => string;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

const navLinks = ['services', 'cases', 'about', 'contact'] as const;

export function Header({ t, locale, onLocaleChange }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window?.scrollY > 50);
    window?.addEventListener?.('scroll', handleScroll);
    return () => window?.removeEventListener?.('scroll', handleScroll);
  }, []);

  // Fechar dropdown de idioma ao clicar fora
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef?.current && !langRef.current.contains(e?.target as Node)) {
        setLangOpen(false);
      }
    };
    document?.addEventListener?.('mousedown', handleClick);
    return () => document?.removeEventListener?.('mousedown', handleClick);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const el = document?.getElementById?.(id);
    el?.scrollIntoView?.({ behavior: 'smooth' });
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-md'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 md:h-20" aria-label="Navegação principal">
          {/* Logo */}
          <button
            onClick={() => window?.scrollTo?.({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group"
            aria-label="FCM TECH - Voltar ao topo"
          >
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image
                src="/images/logo.png"
                alt="FCM TECH logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-heading font-bold text-lg md:text-xl tracking-tight">
              <span className="text-accent-gold">FCM</span>
              <span className="text-text-primary"> TECH</span>
            </span>
          </button>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks?.map?.((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                className="text-sm text-text-secondary hover:text-accent-gold transition-colors duration-300 tracking-wide uppercase"
              >
                {t(`nav.${link}`)}
              </button>
            )) ?? []}
          </div>

          {/* Seletor de idioma + CTA */}
          <div className="hidden md:flex items-center gap-4">
            {/* Seletor de idioma */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent-gold transition-colors px-2 py-1.5 rounded-lg hover:bg-accent-gold/5"
                aria-label="Selecionar idioma"
              >
                <Globe size={16} />
                <span className="text-xs">{locale?.toUpperCase?.() ?? 'PT-BR'}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-border-light rounded-xl shadow-lg overflow-hidden"
                  >
                    {locales?.map?.((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          onLocaleChange(loc);
                          setLangOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          locale === loc
                            ? 'text-accent-gold bg-accent-gold/10'
                            : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                        }`}
                      >
                        {t(`language.${loc}`)}
                      </button>
                    )) ?? []}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA */}
            <button
              onClick={() => scrollToSection('contact')}
              className="px-5 py-2.5 bg-gradient-to-r from-accent-gold to-accent-gold-dark text-white rounded-full text-sm font-medium hover:shadow-gold transition-all duration-300 hover:scale-105"
            >
              {t('nav.cta')}
            </button>
          </div>

          {/* Botão Mobile */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-border-light"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks?.map?.((link) => (
                <button
                  key={link}
                  onClick={() => scrollToSection(link)}
                  className="block w-full text-left px-4 py-3 text-text-secondary hover:text-accent-gold transition-colors rounded-lg hover:bg-accent-gold/5"
                >
                  {t(`nav.${link}`)}
                </button>
              )) ?? []}
              {/* Idiomas no mobile */}
              <div className="pt-4 border-t border-border-light">
                <div className="flex items-center gap-2 px-4 py-2 text-xs text-text-muted uppercase tracking-wider">
                  <Globe size={14} /> {t(`language.${locale}`)}
                </div>
                {locales?.map?.((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      onLocaleChange(loc);
                      setMobileOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2.5 text-sm rounded-lg transition-colors ${
                      locale === loc
                        ? 'text-accent-gold bg-accent-gold/10'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                    }`}
                  >
                    {t(`language.${loc}`)}
                  </button>
                )) ?? []}
              </div>
              <div className="pt-4">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full px-5 py-3 bg-gradient-to-r from-accent-gold to-accent-gold-dark text-white rounded-full text-sm font-medium"
                >
                  {t('nav.cta')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
