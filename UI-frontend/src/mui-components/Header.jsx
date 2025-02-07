import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, useMediaQuery, useTheme, Tooltip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import PeopleIcon from '@mui/icons-material/People';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Header = ({ user, handleLogout }) => {
  const isMobile = useMediaQuery('(max-width:550px)');
  const isExtraSmall = useMediaQuery('(max-width:355px)');

  const NavIcon = ({ to, icon, label }) => (
    <Tooltip title={label}>
      <IconButton
        component={RouterLink}
        to={to}
        color="inherit"
        sx={{ 
          mx: isExtraSmall ? 0.25 : 1,
          padding: isExtraSmall ? '4px' : '8px'
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );

  return (
    <AppBar 
    position="fixed" 
    color="primary" 
    elevation={0}
    sx={{ 
      borderRadius: '0 0 16px 16px',
      overflow: 'hidden'
    }}
  >
    <Toolbar sx={{ 
      justifyContent: isMobile ? 'center' : 'space-between',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      py: 1
    }}>
      <Typography
        variant="h6"
        component={RouterLink}
        to="/"
        sx={{
          color: 'inherit',
          textDecoration: 'none',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          mb: isMobile ? 2 : 0,
          width: isMobile ? '100%' : 'auto',
          justifyContent: isMobile ? 'center' : 'flex-start',
        }}
      >
        SnapBlog 📖
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
      }}>
          <NavIcon to="/" icon={<HomeIcon />} label="Home" />
          <NavIcon to="/api/blogs" icon={<ArticleIcon />} label="Blogs" />
          <NavIcon to="/api/users" icon={<PeopleIcon />} label="Users" />
          
          {user ? (
            <Tooltip title="Log Out">
              <IconButton
                color="inherit"
                onClick={handleLogout}
                sx={{ mx: 1 }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <>
              <NavIcon to="/api/login" icon={<LoginIcon />} label="Log In" />
              <NavIcon to="/api/register" icon={<PersonAddIcon />} label="Sign Up" />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;