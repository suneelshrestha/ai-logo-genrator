import Navbar from '@/components/Navbar';
import React, {ReactNode} from 'react';

export default function Provider({children}: {children: ReactNode}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
