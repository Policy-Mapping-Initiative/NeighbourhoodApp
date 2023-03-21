import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import BasicMenu from './menu';
import SearchBar from './searchBar';
import { Dispatch, SetStateAction } from 'react';

export interface TopAppBarProps {
  setSearchBar: Dispatch<SetStateAction<string>>;
}

export function TopAppBar(props: TopAppBarProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <BasicMenu />
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            Neighbourhood
          </Typography>
          <SearchBar setSearchBar={props.setSearchBar} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
