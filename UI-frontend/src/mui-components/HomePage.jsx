import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Box, Paper, Grid, useTheme, useMediaQuery } from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import CreateIcon from '@mui/icons-material/Create';
import AddBlog from '../components/AddBlogForm';
import { useAuth } from '../components/AuthProvider';

export function HomePage({ handleBlogSubmitCallback, handleUserPosts, randomBlogRef }) {

const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

const { user } = useAuth();

  return (
    <Box sx={{ flexGrow: 1, py: 4 }}>
      <Typography 
        variant={isMobile ? "h3" : "h2"} 
        component="h1" 
        gutterBottom 
        align="center" 
        sx={{ 
          fontWeight: 'bold', 
          color: 'blue',
          fontSize: {
            xs: '2rem',
            sm: '3rem',
            md: '3.75rem'
          }
        }}
      >
        Welcome to SnapBlog
      </Typography>
      <Typography 
        variant="h5" 
        gutterBottom 
        align="center" 
        sx={{ 
          mb: 4, 
          color: 'text.secondary',
          fontSize: {
            xs: '1rem',    // extra-small devices
            sm: '1.25rem', // small devices
            md: '1.5rem'   // medium devices and up (default h5 size)
          }
        }}
      >
        Share and save your favorite blog posts with others.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: 'solid 1px black' }}>
          <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
              Start exploring
            </Typography>
            <Button
              component={Link}
              to="/api/blogs"
              variant="contained"
              size="large"
              startIcon={<ExploreIcon />}
              sx={{ py: 2 }}
            >
              Browse the Front Page
            </Button>
            <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
              Discover interesting blogs from our community.
            </Typography>
          </Paper>
        </Grid>

        {!user && (
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', bgcolor: 'primary.light' }}>
              <Typography variant="h6" gutterBottom align="center" sx={{ color: 'primary.contrastText' }}>
                Join Our Community
              </Typography>
              <Button
                component={Link}
                to="/api/login"
                variant="contained"
                color="secondary"
                size="large"
                sx={{ py: 2 }}
              >
                Log In or Sign Up
              </Button>
              <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', color: 'primary.contrastText' }}>
                Log in to post and like other blogs!
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>

      {randomBlogRef.current}

      {user && (
        <Box sx={{ mt: 4 }}>
          <Box elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <CreateIcon sx={{ mr: 1 }} /> Create a New Blog
            </Typography>
            <AddBlog updateUserPageState={handleBlogSubmitCallback} user={user} />
          </Box>
          <Box elevation={3} sx={{ p: 3, mt: 4 }}>
            <Typography variant="h4" gutterBottom>📚 Your Blogs</Typography>
            {handleUserPosts()}
          </Box>
        </Box>
      )}
    </Box>
  );
}