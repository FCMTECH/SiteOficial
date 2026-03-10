'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X } from 'lucide-react';

interface LGPDConsentProps {
  t: (key: string) => string;
}

export function LGPDConsent({ t }: LGPDConsentProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('lgpd-consent');
    if (!consent) {
      // Pequeno delay para não aparecer junto com a intro
      const timer = setTimeout(() => setShowBanner(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('lgpd-consent', JSON.stringify({
      accepted: true,
      date: new Date().toISOString(),
      preferences: { necessary: true, analytics: true, marketing: true }
    }));
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem('lgpd-consent', JSON.stringify({
      accepted: true,
      date: new Date().toISOString(),
      preferences: { necessary: true, analytics: false, marketing: false }
    }));
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[9998] p-4 md:p-6"
        >
          <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl border border-border-light overflow-hidden">
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent-gold/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-accent-gold" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      {t('lgpd.title')}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {t('lgpd.subtitle')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-text-secondary hover:text-text-primary transition-colors text-sm underline"
                >
                  {showDetails ? t('lgpd.hideDetails') : t('lgpd.showDetails')}
                </button>
              </div>

              {/* Main Text */}
              <p className="text-text-secondary text-sm md:text-base mb-4">
                {t('lgpd.description')}
              </p>

              {/* Details Panel */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-bg-tertiary rounded-xl p-4 mb-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-text-primary text-sm">{t('lgpd.necessary')}</p>
                          <p className="text-xs text-text-secondary">{t('lgpd.necessaryDesc')}</p>
                        </div>
                        <span className="text-xs bg-accent-gold/20 text-accent-gold-dark px-2 py-1 rounded-full">
                          {t('lgpd.required')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-text-primary text-sm">{t('lgpd.analytics')}</p>
                          <p className="text-xs text-text-secondary">{t('lgpd.analyticsDesc')}</p>
                        </div>
                        <span className="text-xs text-text-secondary">{t('lgpd.optional')}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-text-primary text-sm">{t('lgpd.marketing')}</p>
                          <p className="text-xs text-text-secondary">{t('lgpd.marketingDesc')}</p>
                        </div>
                        <span className="text-xs text-text-secondary">{t('lgpd.optional')}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={acceptNecessary}
                  className="flex-1 px-6 py-3 border border-border-medium rounded-xl text-text-primary font-medium hover:bg-bg-tertiary transition-colors text-sm"
                >
                  {t('lgpd.acceptNecessary')}
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 px-6 py-3 bg-accent-gold text-white rounded-xl font-medium hover:bg-accent-gold-dark transition-colors text-sm shadow-lg shadow-accent-gold/20"
                >
                  {t('lgpd.acceptAll')}
                </button>
              </div>

              {/* Privacy Link */}
              <p className="text-xs text-text-muted mt-4 text-center">
                {t('lgpd.privacyNote')}{' '}
                <a href="#" className="text-accent-gold hover:underline">
                  {t('lgpd.privacyLink')}
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
