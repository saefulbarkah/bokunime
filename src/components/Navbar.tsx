'use client';

import { Box, Button, Container, Flex, Icon, Spacer } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { FiHome, FiCalendar, FiBookmark } from 'react-icons/fi';

function Navbar() {
  const pathName = usePathname();
  const navItems = [
    { icon: FiHome, path: '/' },
    { icon: FiCalendar, path: '/release-schedule' },
    { icon: FiBookmark, path: '/bookmark' },
  ];
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        height: '60px',
        backdropFilter: 'blur(50px)',
        backgroundColor: 'rgba(50, 55, 85, 0.82);',
      }}
      bg={'red.500'}
      width={'sm'}
    >
      <Container height={'100%'}>
        <Flex
          alignItems={'center'}
          height={'100%'}
          justifyContent={'space-between'}
        >
          {navItems.map((item, idx) => (
            <>
              <Link href={item.path} key={idx}>
                <Button
                  variant={'ghost'}
                  color={pathName === item.path ? 'primary' : 'secondary.100'}
                  colorScheme="blackAlpha"
                >
                  <Icon as={item.icon} fontSize={30} />
                </Button>
              </Link>
            </>
          ))}
        </Flex>
      </Container>
    </Box>
  );
}

export default Navbar;
