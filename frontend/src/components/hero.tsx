'use client';

import React from 'react';
import { Box, Heading, Text, Container } from '@chakra-ui/react';
import { PlatformButton } from './platformButton';

export type HeroProp = {};

function Hero({}: HeroProp) {
  return (
    <Box
      display={'flex'}
      flexDir={['column', 'column', 'column', 'column']}
      padding={5}
      paddingTop={100}
      height="90vh"
      flex={1}
      position={'relative'}
    >
      <Heading
        marginY={2}
        color="white"
        fontFamily="heavy"
        cursor={'pointer'}
        textAlign={'center'}
        fontSize={[20, 40, 60, 60]}
        marginBottom={20}
      >
        {`Break down complex contracts into plain, easy-to-read language! `.toUpperCase()}
      </Heading>

      <Box
        display={'flex'}
        flexDir={['column', 'column', 'row', 'row']}
        justifyContent={'center'}
        width="100%"
        alignItems={'center'}
      >
        <PlatformButton
          onClick={() => {
            window.open('https://apps.apple.com/us/app/chaza-legal-ai-companion/id6737719401', '_blank');
          }}
          image={'/ios.png'}
        />
      </Box>
    </Box>
  );
}

export { Hero };
