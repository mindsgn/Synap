import React from 'react';
import { Providers } from './providers';
import '../src/global.module.css';
import type { Metadata } from 'next';
import { keywords } from '@/constants/keywords';

export const metadata: Metadata = {
  title: 'Chaza',
  applicationName: 'Chaza',
  authors: [
    {
      name: 'Sibongiseni',
      url: 'https://Sibongiseni.xyz'
    },
    {
      name: 'Mindsgn Studio',
      url: 'https://mindsgn.studio'
    }
  ],
  description:
    'Simplify your legal documents! CHAZA lets you chat directly with contracts. Get answers, clarify terms, and understand legal jargon.',
  keywords,
  twitter: {
    site: 'https://chaza.xyz',
    title: 'Chaza.xyz'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
