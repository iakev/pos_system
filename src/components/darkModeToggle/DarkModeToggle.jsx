import React from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '../../theme/ThemeContextProvider';


export default function DarkModeToggle() {
  const { mode, toggleColorMode } = useThemeContext();
  return (
    <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="primary">
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}
