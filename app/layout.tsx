import type { Metadata } from 'next';
import { Anton, Space_Grotesk } from 'next/font/google';
import { ReactLenis } from 'lenis/react';

import 'lenis/dist/lenis.css';
import './globals.css';
import Footer from '@/components/Footer';
import ScrollProgressIndicator from '@/components/ScrollProgressIndicator';
import ParticleBackground from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import Preloader from '@/components/Preloader';
import StickyEmail from './_components/StickyEmail';
import StickyRPS from './_components/StickyRPS';

const antonFont = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
});

const spaceGrotesk = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-space',
});

export const metadata: Metadata = {
  title: 'Chethana G — Full Stack Developer',
  description:
    'Full stack developer merging code and design. Builds beautiful, functional solutions that solve real problems.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${antonFont.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ReactLenis root options={{ lerp: 0.1, duration: 1.4 }}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CustomCursor />
          <Preloader />
          <ScrollProgressIndicator />
          <ParticleBackground />
          <StickyEmail />
          <StickyRPS />
        </ReactLenis>
      </body>
    </html>
  );
}
