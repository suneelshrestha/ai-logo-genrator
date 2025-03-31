'use client';

import Navbar from '@/components/Navbar';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import React, {ReactNode} from 'react';

export default function Provider({children}: {children: ReactNode}) {
  const {data: session, status} = useSession();
  const router = useRouter();
  if (status === 'authenticated') {
    router.replace('/');
  }
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
