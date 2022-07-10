import React, { FC } from 'react';
import Box from '../Box';
import Button from '../Button';
import Text from '../Text';

interface SmashProps {
  onClick: () => void;
}

const Smash: FC<SmashProps> = ({
  onClick,
}) => (
  <Box alignItems="center" justifyContent='space-around'>
    <Button onClick={onClick} disable={false}>
      <Text fontSize={22} textTransform="capitalize">
        Smaaaaaaaaash
      </Text>
    </Button>
  </Box>
);

export default React.memo(Smash);
