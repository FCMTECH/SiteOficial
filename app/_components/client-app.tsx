'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Locale } from '@/i18n/config';
import { locales, defaultLocale } from '@/i18n/config';
import ptBR from '@/i18n/messages/pt-BR.json';
import ptPT from '@/i18n/messages/pt-PT.json';
import en from '@/i18n/messages/en.json';
import { IntroAnimation } from './intro-animation';
import { Header } from './header';
import { HeroSection } from './hero-section';
import { ServicesSection } from './services-section';
import { CasesSection } from './cases-section';
import { AboutSection } from './about-section';
import { ContactSection } from './contact-section';
import { Footer } from './footer';
import { WhatsAppButton } from './whatsapp-button';

// Mapa de mensagens por idioma
const messagesMap: Record<Locale, Record<string, unknown>> = {
  'pt-BR': ptBR as unknown as Record<string, unknown>,
  'pt-PT': ptPT as unknown as Record<string, unknown>,
  'en': en as unknown as Record<string, unknown>,
};

export function ClientApp() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [introComplete, setIntroComplete] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Detectar idioma no mount
  useEffect(() => {
    setMounted(true);
    const saved = localStorage?.getItem?.('fcm-locale');
    if (saved && locales.includes(saved as Locale)) {
      setLocale(saved as Locale);
    } else {
      const browserLang = navigator?.language ?? '';
      if (browserLang?.startsWith?.('pt')) {
        setLocale('pt-BR');
      } else if (browserLang?.startsWith?.('en')) {
        setLocale('en');
      } else {
        setLocale('pt-BR');
      }
    }
  }, []);

  const changeLocale = useCallback((newLocale: Locale) => {
    setLocale(newLocale);
    localStorage?.setItem?.('fcm-locale', newLocale);
  }, []);

  const t = useCallback((key: string): string => {
    const keys = key?.split?.('.') ?? [];
    let value: unknown = messagesMap[locale] ?? {};
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }
    if (typeof value === 'string') return value;
    return key;
  }, [locale]);

  const tArray = useCallback((key: string): string[] => {
    const keys = key?.split?.('.') ?? [];
    let value: unknown = messagesMap[locale] ?? {};
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }
    if (Array.isArray(value)) return value as string[];
    return [];
  }, [locale]);

  // Para sites estáticos: mostrar conteúdo diretamente sem animação de intro
  const showIntro = mounted && !introComplete;

  return (
    <>
      {showIntro && (
        <IntroAnimation
          t={t}
          onComplete={() => setIntroComplete(true)}
        />
      )}
      <div
        className={`transition-opacity duration-700 ${
          !mounted || introComplete ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Header t={t} locale={locale} onLocaleChange={changeLocale} />
        <main>
          <HeroSection t={t} />
          <ServicesSection t={t} tArray={tArray} />
          <CasesSection t={t} />
          <AboutSection t={t} />
          <ContactSection t={t} locale={locale} />
        </main>
        <Footer t={t} />
        <WhatsAppButton />
      </div>
    </>
  );
}
