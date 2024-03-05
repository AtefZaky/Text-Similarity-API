'use client'

import { FC, ReactNode } from "react";
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';

interface ProvidersProp {
  children: ReactNode
}

const Providers: FC<ProvidersProp> = ({children}) =>{
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  )
}

export default Providers