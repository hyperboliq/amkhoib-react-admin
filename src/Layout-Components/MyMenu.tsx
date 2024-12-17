import { MenuItemLink } from 'react-admin';
import { Box } from '@mui/material';

const CustomMenu = () => {
  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      <MenuItemLink
        to="/"
        primaryText="Dashboard"
        sx={{ color: 'white', textDecoration: 'none' }}
      />
      <MenuItemLink
        to="/clients"
        primaryText="Clients"
        sx={{ color: 'white', textDecoration: 'none' }}
      />
      <MenuItemLink
        to="/documents"
        primaryText="Documents"
        sx={{ color: 'white', textDecoration: 'none' }}
      />
      <MenuItemLink
        to="/categories"
        primaryText="Categories"
        sx={{ color: 'white', textDecoration: 'none' }}
      />
      <MenuItemLink
        to="/projects"
        primaryText="Projects"
        sx={{ color: 'white', textDecoration: 'none' }}
      />
    </Box>
  );
};

export default CustomMenu;
