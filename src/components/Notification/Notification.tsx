import React, { FC } from 'react';
import StyledBackdrop from './StyledBackdrop';
import StyledModal from './StyledModal';
// import Button from '../Button';
import Box from '../Box';
import Text from '../Text';

export interface NotificationProps {
  win: boolean;
  txns: string[];
  // onClose: () => void;
}

const Notification: FC<NotificationProps> = ({ 
  win, 
  txns,
  // onClose,
}) => (
  // Disabling gaming reset simplifies a lot of problems,
  // For example, no need for a button to get more gas, 
  // no need for a more sophisticiated perf measurement etc.
  <StyledModal>
    <StyledBackdrop />
    <Box paddingBlock="s5" background="transparent">
      <Text fontSize={24} as="p" color="white">
        {win ? 'You win!' : 'Oops...Game Over!'}
      </Text>
    </Box>
    <Box paddingBlock="s5" background="transparent">
      <Text fontSize={17} as="p" color="white">
        {txns.length + ' txns committed on Sui blockchain'} 
      </Text>
    </Box>
    {/* <Button onClick={onClose}>{win ? 'Continue' : 'Retry'}</Button> */}
  </StyledModal>
);

export default Notification;
