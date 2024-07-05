import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ConvexClerkProvider from './providers/ConvexClerkProvider';
import AudioProvider from '@/providers/AudioProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Podcastr',
  description: 'Generate your podcast using AI',
  icons: {
    icon: '/icons/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <AudioProvider>
        <body className={inter.className}>
          <ConvexClerkProvider>{children}</ConvexClerkProvider>
        </body>
      </AudioProvider>
    </html>
  );
}
