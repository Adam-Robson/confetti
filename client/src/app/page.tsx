import Link from 'next/link';
import Image from 'next/image';
import { JSX } from 'react';
import { GlobalProvider } from '@/app/contexts/global-provider';
import ThemeSwitch from '@/components/theme-switch';
import '@/lib/styles/home.css';

export default function Home(): JSX.Element {
  return (
    <GlobalProvider>
      <div className="page">
        <header className="header">
          <nav className="nav">
            <ul className="nav-list">
              <li className="nav-item"><Link href="/">home</Link></li>
              <li className="nav-item"><Link href="/posts">posts</Link></li>
              <li className="nav-item"><Link href="/audio">audio</Link></li>
            </ul>
          </nav>
        </header>
        <main className="main">
          <div className="switch-container">
            <ThemeSwitch />
          </div>
          <Image
            src="/animal.png"
            alt="le fog"
            width={622}
            height={350}
            priority
            className="mb-8"
          />
          <div className="content-inner">
            <h2 className='text-center'>Fragments bank</h2>
            <h3>
              I write things down on occasion, when
              they stay with me long enough.
            </h3>
            <h4 className='font-medium'>
              I collect them here.
              Feel free to explore.
            </h4>
          </div>
        </main>
      </div>
    </GlobalProvider>
  );
}
