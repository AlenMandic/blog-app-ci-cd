import React from 'react';
import { Typography, IconButton, Container, Box, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const FooterContainer = styled(Box)(({ theme }) => ({
  border: 'solid 1px black',
  borderRadius: '12px',
  backgroundColor: '#f5f5f5',
  padding: theme.spacing(4, 0),
  marginTop: theme.spacing(4), // Add top margin
  borderTopLeftRadius: '12px',
  borderTopRightRadius: '12px',
  boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)', // Add subtle shadow for depth
}));

const FooterContent = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const SocialIcons = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginTop: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    marginTop: 0,
  },
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  color: '#3f51b5',
  '&:hover': {
    color: '#303f9f',
  },
}));

const Footer = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <FooterContainer component="footer">
      <FooterContent maxWidth="lg">
        <Box textAlign={isMobile ? 'center' : 'left'}>
          <Typography variant="body1" color="textSecondary">
            © {new Date().getFullYear()} Alen Mandic. All rights reserved.
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Designed and built with passion.
          </Typography>
        </Box>
        <SocialIcons>
          <SocialIconButton href="https://github.com/AlenMandic" target="_blank" aria-label="GitHub">
            <GitHubIcon />
          </SocialIconButton>
          <SocialIconButton href="https://www.linkedin.com/in/alen-mandic-2327a92a7/" target="_blank" aria-label="LinkedIn">
            <LinkedInIcon />
          </SocialIconButton>
          <SocialIconButton href="mailto:alenmandic1@gmail.com" aria-label="Email">
            <EmailIcon />
          </SocialIconButton>
        </SocialIcons>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;