'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';

export type PlatformButtonProp = {
  image: string;
  onClick: () => void;
};

function PlatformButton({ image, onClick }: PlatformButtonProp) {
  return (
    <Box
      borderWidth={4}
      borderRadius={20}
      borderColor={'white'}
      marginY={2}
      marginX={2}
      h={100}
      width={250}
      cursor={'pointer'}
      backgroundImage={image}
      backgroundSize="cover"
      backgroundPosition={'center'}
      onClick={onClick}
    />
  );
}

export { PlatformButton };
