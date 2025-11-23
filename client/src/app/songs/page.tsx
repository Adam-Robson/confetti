import { ReactNode } from 'react';
import { GlobalProvider } from '../contexts/global-provider';

export default function SongsPage(
  { children }: { children: ReactNode }
) {
  return (
    <div className='root'>
      <GlobalProvider>
        {children}
      </GlobalProvider>
    </div>
  );
}
