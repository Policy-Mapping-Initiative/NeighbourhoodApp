import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { Menu, MenuItem } from '@mui/material';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

   const handleClose = () => {
     setAnchorEl(null);

     // Disaptch Action to open the our modal
    };

  return (
    <div>
      <IconButton
        id="basic-button"
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu 
        id = "top-left-menu"
        open = {open} 
        onClose = {handleClose}
        anchorEl = {anchorEl}
        MenuListProps = {{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick = {handleClose}>City Wide Policies</MenuItem>
      </Menu>
    </div>
  );
}
