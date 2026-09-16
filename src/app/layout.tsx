import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LiquidNav } from '@/components/LiquidNav';

export const metadata: Metadata = {
  title: 'TJKT 1 — Teknik Jaringan Komputer dan Telekomunikasi',
  description: 'Website digital kelas TJKT 1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="font-sans min-h-screen flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 pb-24 lg:pb-0">{children}</main>
          <Footer />
          <LiquidNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
