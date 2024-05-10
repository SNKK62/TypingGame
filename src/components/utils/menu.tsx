'use client';

import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, MenuItem } from '@mui/material';
import RawMenu from '@mui/material/Menu';
import React, { useState } from 'react';

interface MenuProps {}

export const Menu: React.FC<MenuProps> = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (event: React.MouseEvent) => setAnchorEl(event.currentTarget);
  return (
    <div>
      <IconButton size='medium' color='inherit' aria-label='menu' onClick={handleOpen}>
        <MenuIcon />
      </IconButton>

      <RawMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
        }}
        // MenuProps={{
        //   getContentAnchorEl: null, // anchorOrigin, transformOrigin が変更可能になるように元々ポップオーバーの基準となっている要素を解除
        //   anchorOrigin: { vertical: 'top', horizontal: 'left' }, // ポップオーバーの表示起点
        //   transformOrigin: { vertical: 'top', horizontal: 'left' }, // 表示時の transform の起点
        // }}
      >
        <MenuItem>Top</MenuItem>
        <MenuItem divider>Play</MenuItem>
        <MenuItem divider>Make</MenuItem>
        {/* <MenuItem>Bonjour!</MenuItem> */}
      </RawMenu>
    </div>
  );
};
