'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Send, User, Mail, Phone, Building2, MessageSquare, FileText,
  CheckCircle2, AlertCircle, MessageCircle
} from 'lucide-react';

interface ContactSectionProps {
  t: (key: string) => string;
  locale?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactSection({ t, locale }: ContactSectionProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', company: '', subject: '', message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    if (!formData?.name?.trim?.()) newErrors.name = t('contact.required');
    if (!formData?.email?.trim?.()) {
      newErrors.email = t('contact.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData?.email ?? '')) {
      newErrors.email = t('contact.invalidEmail');
    }
    if (!formData?.message?.trim?.()) newErrors.message = t('contact.required');
    setErrors(newErrors);
    return Object.keys(newErrors ?? {})?.length === 0;
  }, [formData, t]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e?.preventDefault?.();
    if (!validate()) return;

    setStatus('sending');
    
    // Montar corpo do email
    const emailBody = `
Nome: ${formData?.name ?? ''}
Email: ${formData?.email ?? ''}
Telefone: ${formData?.phone ?? 'Não informado'}
Empresa: ${formData?.company ?? 'Não informado'}
Assunto: ${formData?.subject ?? 'Contato via site'}

Mensagem:
${formData?.message ?? ''}
    `.trim();
    
    const subject = encodeURIComponent(formData?.subject || 'Contato via Site FCM TECH');
    const body = encodeURIComponent(emailBody);
    const mailtoLink = `mailto:comercial@fcmtech.com.br?subject=${subject}&body=${body}`;
    
    // Abrir cliente de email
    window.location.href = mailtoLink;
    
    setStatus('success');
    setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
  }, [formData, validate]);

  const handleChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...(prev ?? {}), [field]: value }));
    if (errors?.[field as keyof FormErrors]) {
      setErrors(prev => ({ ...(prev ?? {}), [field]: undefined }));
    }
  }, [errors]);

  const inputFields: { key: keyof FormData; icon: typeof User; required?: boolean; type?: string }[] = [
    { key: 'name', icon: User, required: true },
    { key: 'email', icon: Mail, required: true, type: 'email' },
    { key: 'phone', icon: Phone },
    { key: 'company', icon: Building2 },
    { key: 'subject', icon: FileText },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 relative bg-white" ref={ref}>
      <div className="relative z-10 max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2 className="heading-lg font-heading font-bold mb-4 text-text-primary">{t('contact.title')}</h2>
          <p className="text-body text-text-secondary max-w-xl mx-auto">{t('contact.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Formulário */}
          <motion.form
            onSubmit={handleSubmit}
            className="md:col-span-2 bg-bg-tertiary border border-border-light rounded-2xl p-6 md:p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              {inputFields?.map?.((field) => {
                const Icon = field?.icon ?? User;
                const err = errors?.[field?.key as keyof FormErrors];
                return (
                  <div key={field?.key} className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                      <Icon size={16} />
                    </div>
                    <input
                      type={field?.type ?? 'text'}
                      value={formData?.[field?.key] ?? ''}
                      onChange={(e) => handleChange(field?.key, e?.target?.value ?? '')}
                      placeholder={t(`contact.${field?.key}`)}
                      className={`w-full pl-11 pr-4 py-3.5 bg-white border rounded-xl text-sm text-text-primary placeholder:text-text-muted transition-all duration-300 focus:outline-none focus:ring-2 ${
                        err
                          ? 'border-red-500/50 focus:ring-red-500/30'
                          : 'border-border-light focus:border-accent-gold focus:ring-accent-gold/20'
                      }`}
                      aria-label={t(`contact.${field?.key}`)}
                      aria-required={field?.required ?? false}
                    />
                    {err && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle size={12} /> {err}
                      </p>
                    )}
                  </div>
                );
              }) ?? []}
            </div>

            {/* Mensagem (textarea) */}
            <div className="mt-5 relative">
              <div className="absolute left-4 top-4 text-text-muted">
                <MessageSquare size={16} />
              </div>
              <textarea
                value={formData?.message ?? ''}
                onChange={(e) => handleChange('message', e?.target?.value ?? '')}
                placeholder={t('contact.message')}
                rows={5}
                className={`w-full pl-11 pr-4 py-3.5 bg-white border rounded-xl text-sm text-text-primary placeholder:text-text-muted transition-all duration-300 resize-none focus:outline-none focus:ring-2 ${
                  errors?.message
                    ? 'border-red-500/50 focus:ring-red-500/30'
                    : 'border-border-light focus:border-accent-gold focus:ring-accent-gold/20'
                }`}
                aria-label={t('contact.message')}
                aria-required
              />
              {errors?.message && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors?.message}
                </p>
              )}
            </div>

            {/* Botão enviar + feedback */}
            <div className="mt-6 flex items-center gap-4 flex-wrap">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="group flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-accent-gold to-accent-gold-dark text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-gold"
              >
                <Send size={16} className="group-hover:translate-x-0.5 transition-transform" />
                {status === 'sending' ? t('contact.sending') : t('contact.send')}
              </button>

              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm text-green-600 flex items-center gap-2"
                >
                  <CheckCircle2 size={16} /> {t('contact.success')}
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm text-red-500 flex items-center gap-2"
                >
                  <AlertCircle size={16} /> {t('contact.error')}
                </motion.p>
              )}
            </div>
          </motion.form>

          {/* Sidebar */}
          <motion.div
            className="bg-bg-tertiary border border-border-light rounded-2xl p-6 md:p-8 flex flex-col justify-between"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-accent-gold/10 flex items-center justify-center mb-5">
                <MessageCircle size={22} className="text-accent-gold" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-3 text-text-primary">
                {t('contact.sidebar.title')}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {t('contact.sidebar.description')}
              </p>
            </div>

            <a
              href="https://wa.me/5561993700174"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2 px-6 py-3.5 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 transition-all duration-300 hover:scale-105"
            >
              <MessageCircle size={16} />
              {t('contact.sidebar.cta')}
            </a>

            {/* Info de contato */}
            <div className="mt-6 pt-6 border-t border-border-light space-y-3">
              <a
                href="mailto:comercial@fcmtech.com.br"
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent-gold transition-colors"
              >
                <Mail size={14} />
                comercial@fcmtech.com.br
              </a>
              <a
                href="tel:+5561993700174"
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent-gold transition-colors"
              >
                <Phone size={14} />
                +55 61 99370-0174
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
