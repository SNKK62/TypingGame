import './globals.css';
import { Inter } from 'next/font/google';

import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '超激ムズタイピングゲーム',
  description: '苦しみながら楽しくタイピングゲームを遊べます！',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
