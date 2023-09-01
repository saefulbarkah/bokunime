'use client';

import { Box } from '@chakra-ui/react';
import React from 'react';
import Navbar from './Navbar';

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <Box
      maxW={'sm'}
      margin={'auto'}
      minHeight={'100vh'}
      border={'1px'}
      position={'relative'}
      overflow={'hidden'}
    >
      {children}
      <Navbar />
    </Box>
  );
}
