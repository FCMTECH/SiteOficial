'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/5561993700174"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ scale: 1.1, y: -4 }}
      aria-label="Conversar via WhatsApp"
    >
      <MessageCircle size={24} className="text-white" />
    </motion.a>
  );
}
