
import { Inter } from 'next/font/google';

import '../styles/index.css';
import Header from './components/Header';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {

  return (
    <html lang={locale}>
      <body className={inter.className}>
            <Header />
            {children}
            <Footer />
      </body>
    </html>
  );
}