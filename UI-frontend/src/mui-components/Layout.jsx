import React from 'react';
import Container from '@mui/material/Container';
import { Chip, Avatar } from '@mui/material';
import ResponsiveHeader from './Header';
import Footer from './Footer';
import { useMediaQuery } from '@mui/material';
import { useAuth } from '../components/AuthProvider';

export function Layout({ children }) {

  const isMobile = useMediaQuery('(max-width:560px)')
  const { user, handleLogout } = useAuth();

  const getInitials = (name) => {
    return name.split(' ').map(part => part.charAt(0)).join('').toUpperCase();
  };

  return (
    <Container sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ResponsiveHeader user={user} handleLogout={handleLogout} />
      <div style={{ flexGrow: 1, paddingTop: 2, paddingBottom: 2, marginTop: isMobile ? '110px' : '70px' }}>
        {user && (
          <Chip
            avatar={<Avatar>{getInitials(user.name)}</Avatar>}
            label={`Logged in as ${user.name}`}
            color="primary"
            sx={{ mb: 2 }}
          />
        )}
        {children}
      </div>
      <Footer />
    </Container>
  );
}