// app/providers.tsx
'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, ThemeComponentProps } from '@chakra-ui/react';

// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  bgTheme: {
    100: '#191D37',
  },
  secondary: {
    100: 'rgba(251, 251, 255, 0.75);',
  },
  primary: '#32CCF6',
  danger: '#FF2060',
  active: '#C2043B',
};

export const theme = extendTheme({
  colors,
  styles: {
    global: {
      body: {
        bg: '#191D37',
        color: 'white',
      },
    },
  },
});

export function ChackraProvider({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
