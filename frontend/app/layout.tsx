import React from 'react';
import { Providers } from './providers';
import '../src/global.module.css';
import type { Metadata } from 'next';
import { keywords } from '@/constants/keywords';

export const metadata: Metadata = {
  title: 'Synap',
  applicationName: 'Synap',
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
  description: "**Synap** is a mobile app designed to help users test their knowledge on topics they've learned. The app generates multiple-choice questions based on user input, reinforcing learning through active recall.",
  keywords,
  twitter: {
    site: 'https://synap.mindsgn.studio',
    title: 'Synap'
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
