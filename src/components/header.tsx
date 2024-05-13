import { AppBar } from '@mui/material';
import React from 'react';

import { Text } from './utils/text';

interface Props {}

export const Header: React.FC<Props> = () => {
  return (
    <div>
      <AppBar color='secondary' enableColorOnDark position='fixed'>
        <div style={{ display: 'flex', lineHeight: '100%', textAlign: 'center' }}>
          <Text htmlType='h5'>Typing Game</Text>
        </div>
      </AppBar>
    </div>
  );
};
