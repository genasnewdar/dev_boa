import { ColorSchemeScript } from '@mantine/core';
import { MantineProvider } from '@/provider';
import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: '',
  description: '',
};

export default function RootLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <html lang='en' data-mantine-color-scheme="light">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}