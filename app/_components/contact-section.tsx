'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Send, 
  Mail, 
  Phone, 
  MessageCircle,
  User,
  Building,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface ContactSectionProps {
  t: (key: string) => string;
  locale: string;
}

export function ContactSection({ t, locale }: ContactSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const subject = encodeURIComponent(`[Site FCM TECH] ${formData.subject || 'Contato'}`);
      const body = encodeURIComponent(
        `Nome: ${formData.name}\nEmail: ${formData.email}\nTelefone: ${formData.phone || 'Não informado'}\nEmpresa: ${formData.company || 'Não informado'}\n\nMensagem:\n${formData.message}`
      );
      
      window.location.href = `mailto:comercial@fcmtech.com.br?subject=${subject}&body=${body}`;
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClasses = "w-full px-4 py-3 bg-white border border-border-light rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-gold/20 focus:border-accent-gold transition-all";

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32 bg-white">
      <div className="container-premium px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="bg-bg-tertiary rounded-xl p-6 border border-border-light">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t('contact.form.name')} required className={`${inputClasses} pl-10`} />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t('contact.form.email')} required className={`${inputClasses} pl-10`} />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={t('contact.form.phone')} className={`${inputClasses} pl-10`} />
                </div>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder={t('contact.form.company')} className={`${inputClasses} pl-10`} />
                </div>
              </div>
              <div className="relative mb-4">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder={t('contact.form.subject')} className={`${inputClasses} pl-10`} />
              </div>
              <div className="mb-4">
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder={t('contact.form.message')} required rows={4} className={`${inputClasses} resize-none`} />
              </div>
              <button type="submit" disabled={status === 'loading'} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent-gold text-white rounded-lg font-semibold hover:bg-accent-gold-dark transition-colors disabled:opacity-70">
                {status === 'loading' ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-5 h-5" />}
                {status === 'loading' ? t('contact.form.submitting') : t('contact.form.submit')}
              </button>
              {status === 'success' && (
                <div className="mt-4 flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg text-sm">
                  <CheckCircle className="w-4 h-4" /> {t('contact.form.success')}
                </div>
              )}
              {status === 'error' && (
                <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-lg text-sm">
                  <AlertCircle className="w-4 h-4" /> {t('contact.form.error')}
                </div>
              )}
            </form>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-bg-tertiary rounded-xl p-6 border border-border-light h-full">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-lg bg-accent-gold/10 flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-accent-gold" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">{t('contact.sidebar.title')}</h3>
                <p className="text-sm text-text-secondary mb-4">{t('contact.sidebar.description')}</p>
                <a href="https://wa.me/5561993270174" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 w-full px-5 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors justify-center">
                  <MessageCircle className="w-5 h-5" /> {t('contact.sidebar.cta')}
                </a>
              </div>
              <div className="border-t border-border-light pt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-accent-gold" />
                  <span className="text-sm text-text-secondary">comercial@fcmtech.com.br</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-accent-gold" />
                  <span className="text-sm text-text-secondary">+55 61 99327-0174</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
