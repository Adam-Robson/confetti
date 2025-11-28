import { Barlow } from 'next/font/google';
import '@/lib/styles/globals.css';
import '@/lib/styles/colors.css';
import '@/lib/styles/clicks.css';
import { JSX } from 'react';

const barlow = Barlow({
  variable: '--barlow',
  subsets: ['latin'],
  weight: [
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900'
  ],
});

export const metadata = {
  title: 'le fog',
  description: 'website for le fog',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
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
