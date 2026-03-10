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
  AlertCircle,
  Sparkles
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
        `Nome: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Telefone: ${formData.phone || 'Não informado'}\n` +
        `Empresa: ${formData.company || 'Não informado'}\n\n` +
        `Mensagem:\n${formData.message}`
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

  const inputClasses = "w-full px-4 py-3 bg-white border border-border-light rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-gold/20 focus:border-accent-gold transition-all";

  return (
    <section 
      id="contact" 
      ref={ref}
      className="relative py-24 md:py-32 bg-white overflow-hidden"
    >
      {/* Fundo com gradiente radial */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-bg-tertiary/50 via-transparent to-accent-gold/5" />
      </div>

      {/* Círculos decorativos */}
      <div className="absolute top-20 right-20 w-72 h-72 border border-accent-gold/10 rounded-full" />
      <div className="absolute bottom-20 left-20 w-56 h-56 border border-accent-gold/10 rounded-full" />

      {/* Grid de pontos */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 175, 55, 0.2) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="container-premium relative z-10 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20 mb-4">
            <Sparkles className="w-4 h-4 text-accent-gold" />
            <span className="text-sm text-accent-gold-dark">Contato</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="bg-bg-tertiary rounded-2xl p-8 border border-border-light">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('contact.form.name')}
                    required
                    className={`${inputClasses} pl-12`}
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contact.form.email')}
                    required
                    className={`${inputClasses} pl-12`}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('contact.form.phone')}
                    className={`${inputClasses} pl-12`}
                  />
                </div>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={t('contact.form.company')}
                    className={`${inputClasses} pl-12`}
                  />
                </div>
              </div>

              <div className="relative mb-4">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t('contact.form.subject')}
                  className={`${inputClasses} pl-12`}
                />
              </div>

              <div className="relative mb-6">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact.form.message')}
                  required
                  rows={5}
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-accent-gold text-white rounded-xl font-semibold hover:bg-accent-gold-dark transition-all duration-300 shadow-lg shadow-accent-gold/30 hover:shadow-xl hover:shadow-accent-gold/40 disabled:opacity-70"
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('contact.form.submitting')}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t('contact.form.submit')}
                  </>
                )}
              </button>

              {/* Status Messages */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-xl"
                >
                  <CheckCircle className="w-5 h-5" />
                  {t('contact.form.success')}
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl"
                >
                  <AlertCircle className="w-5 h-5" />
                  {t('contact.form.error')}
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-bg-tertiary rounded-2xl p-8 border border-border-light h-full">
              <div className="mb-8">
                <div className="w-14 h-14 rounded-xl bg-accent-gold/10 flex items-center justify-center mb-4">
                  <MessageCircle className="w-7 h-7 text-accent-gold" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {t('contact.whatsapp')}
                </h3>
                <p className="text-text-secondary mb-6">
                  Resposta rápida em horário comercial
                </p>
                <a
                  href="https://wa.me/5561993270174"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t('contact.whatsappCta')}
                </a>
              </div>

              <div className="border-t border-border-light pt-8">
                <h4 className="text-sm font-medium text-text-secondary mb-4 uppercase tracking-wider">
                  Informações de Contato
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-accent-gold" />
                    <span className="text-text-primary">comercial@fcmtech.com.br</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-accent-gold" />
                    <span className="text-text-primary">+55 61 99327-0174</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
