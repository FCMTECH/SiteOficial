'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { locales, defaultLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import en from '@/i18n/messages/en.json';
import ptBR from '@/i18n/messages/pt-BR.json';
import ptPT from '@/i18n/messages/pt-PT.json';

import { IntroAnimation } from './intro-animation';
import { Header } from './header';
import { HeroSection } from './hero-section';
import { ServicesSection } from './services-section';
import { CasesSection } from './cases-section';
import { AboutSection } from './about-section';
import { ContactSection } from './contact-section';
import { Footer } from './footer';
import { WhatsAppButton } from './whatsapp-button';
import { LGPDConsent } from './lgpd-consent';

const messages: Record<Locale, typeof en> = {
  en,
  'pt-BR': ptBR,
  'pt-PT': ptPT,
};

export function ClientApp() {
  const [mounted, setMounted] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    setMounted(true);
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && locales.includes(savedLocale)) {
      setLocale(savedLocale);
    } else {
      const browserLang = navigator.language;
      if (browserLang.startsWith('pt-BR')) {
        setLocale('pt-BR');
      } else if (browserLang.startsWith('pt')) {
        setLocale('pt-PT');
      } else {
        setLocale('en');
      }
    }
  }, []);

  const handleLocaleChange = useCallback((newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  }, []);

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let value: unknown = messages[locale];
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  }, [locale]);

  const tArray = useCallback((key: string): string[] => {
    const keys = key.split('.');
    let value: unknown = messages[locale];
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return [];
      }
    }
    return Array.isArray(value) ? value : [];
  }, [locale]);

  return (
    <>
      {/* Intro Animation */}
      <AnimatePresence>
        {mounted && !introComplete && (
          <IntroAnimation 
            onComplete={() => setIntroComplete(true)} 
            t={t}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted && introComplete ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className={mounted && introComplete ? 'opacity-100' : 'opacity-0'}
      >
        <Header 
          locale={locale} 
          onLocaleChange={handleLocaleChange} 
          t={t} 
        />
        <main>
          <HeroSection t={t} />
          <ServicesSection t={t} tArray={tArray} />
          <CasesSection t={t} />
          <AboutSection t={t} />
          <ContactSection t={t} locale={locale} />
        </main>
        <Footer t={t} />
        <WhatsAppButton />
        
        {/* LGPD Consent Banner */}
        <LGPDConsent t={t} />
      </motion.div>
    </>
  );
}
