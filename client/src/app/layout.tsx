import type { Metadata } from 'next';
import { Barlow } from 'next/font/google';
import '@/lib/styles/globals.css';
import '@/lib/styles/colors.css';
import '@/lib/styles/clicks.css';

const barlow = Barlow({
  variable: '--barlow',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'website for confetti',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={`
    ${barlow.variable} 
    subpixel-antialiased
  `}>
      <body>
        <div className='root'>
          {children}
        </div>
      </body>
    </html>
  );
}
