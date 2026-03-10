import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fcmtech.com.br'),
  title: 'FCM TECH — Automação. Gestão & Performance',
  description: 'Consultorias práticas, automações, gestão de projetos e identidade visual — entregamos resultado mensurável e aplicação imediata.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'FCM TECH — Automação. Gestão & Performance',
    description: 'Consultorias práticas, automações, gestão de projetos e identidade visual — entregamos resultado mensurável e aplicação imediata.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" />
      </head>
      <body className="font-sans bg-bg-primary text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
