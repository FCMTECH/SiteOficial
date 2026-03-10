// Configuração do sistema de internacionalização
export const locales = ['pt-BR', 'pt-PT', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pt-BR';

// Detectar idioma com base no navegador
export function detectLocale(acceptLanguage?: string): Locale {
  if (typeof window !== 'undefined') {
    // Verificar localStorage primeiro
    const saved = localStorage.getItem('fcm-locale');
    if (saved && locales.includes(saved as Locale)) {
      return saved as Locale;
    }
    // Detectar do navegador
    const browserLang = navigator?.language ?? '';
    if (browserLang?.startsWith?.('pt')) return 'pt-BR';
    if (browserLang?.startsWith?.('en')) return 'en';
    return 'pt-BR';
  }
  // Server-side: usar Accept-Language header
  if (acceptLanguage) {
    if (acceptLanguage?.includes?.('pt')) return 'pt-BR';
    if (acceptLanguage?.includes?.('en')) return 'en';
  }
  return 'pt-BR';
}
