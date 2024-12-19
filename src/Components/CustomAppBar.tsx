import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Logo from '../media/Logo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLogout } from 'react-admin';

const StyledLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: 'none',
  color: 'white',
  marginRight: theme.spacing(3),
  '&:hover': {
      color: '#00B6E4', // Hover color
  },
}));

const ActiveLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: 'none',
  color: '#00B6E4', // Selected color
  fontWeight: 'bold',
  marginRight: theme.spacing(3),
}));

const DarkMenuItem = styled(MenuItem)(({ theme }) => ({
  color: '#333', // Dark color for the menu item text
}));

export const CustomAppBar = () =>  {
  const logout = useLogout();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Function to determine if a link is active
  const isActive = (path: string) => location.pathname === path;

  // Handle profile menu open and close
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
      setAnchorEl(null);
  };

  const handleLogout = () => {
      // Add your logout functionality here, e.g., redirecting or clearing localStorage
      console.log('Logging out...');
      logout();
  
      // Redirect to login or home page
      // For example, use history.push('/login') if using react-router
      setAnchorEl(null);
  };

  return (
      <AppBar position="sticky" sx={{ backgroundColor: '#061135', padding: '0 20px' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {/* Left Side: Logo */}
              <RouterLink to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={Logo} alt="Logo" style={{ height: 40, marginRight: '20px' }} />
              </div>
              </RouterLink>

              {/* Right Side: Navigation Links and Profile Icon */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                  {/* Navigation Links */}
                  {isActive('/') ? (
                      <ActiveLink to="/">Home</ActiveLink>
                  ) : (
                      <StyledLink to="/">Home</StyledLink>
                  )}
                  {isActive('/clients') ? (
                      <ActiveLink to="/clients">Clients</ActiveLink>
                  ) : (
                      <StyledLink to="/clients">Clients</StyledLink>
                  )}
                  {isActive('/documents') ? (
                      <ActiveLink to="/documents">Documents</ActiveLink>
                  ) : (
                      <StyledLink to="/documents">Documents</StyledLink>
                  )}
                  {isActive('/categories') ? (
                      <ActiveLink to="/categories">Categories</ActiveLink>
                  ) : (
                      <StyledLink to="/categories">Categories</StyledLink>
                  )}
                  {isActive('/projects') ? (
                      <ActiveLink to="/projects">Projects</ActiveLink>
                  ) : (
                      <StyledLink to="/projects">Projects</StyledLink>
                  )}

                  {/* Profile Icon with Menu */}
                  <IconButton
                      edge="end"
                      color="inherit"
                      onClick={handleProfileMenuOpen}
                      sx={{ marginLeft: '20px' }}
                  >
                      <AccountCircleIcon />
                  </IconButton>

                  {/* Profile Menu */}
                  <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleProfileMenuClose}
                  >
                      <DarkMenuItem onClick={handleLogout}>Logout</DarkMenuItem>
                  </Menu>
              </div>
          </Toolbar>
      </AppBar>
  );
};

export default CustomAppBar;
