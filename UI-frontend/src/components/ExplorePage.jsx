import { useState, React } from 'react'
import { Typography, Button, Box, Alert, Container, useTheme, useMediaQuery } from '@mui/material';
import ExploreBlog from './ExploreBlog'
import BasicSelect from '../mui-components/SelectMenu'
import { useGetUserLikedBlogs } from '../custom-hooks/useGetUserLikedBlogs'
import { useCreateExplorePage } from '../custom-hooks/useCreateExplorePage'
import LoadingSpinner from '../mui-components/LoadingSpinner'

export default function ExplorePage({ user }) {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallScreen = useMediaQuery('(max-width:500px)');

  const [sorting, setSorting] = useState('Default')

  const { userLikedBlogs, loading, error } = useGetUserLikedBlogs(user)
  const { explorePageState, loadMoreButtonVisible, setPage } = useCreateExplorePage()

  if(loading) {
    return <LoadingSpinner message={'Loading data...'} />
  }

  if(error) {
    return <p>Error: {error.message}</p>
  }

  const ourPublicBlogs = explorePageState.map((blog) => {
    return blog
  })

  function compareBlogsByLikes(a, b) {
    return b.likes - a.likes
  }

  const getBlogsByLikes = ourPublicBlogs.sort(compareBlogsByLikes)

  const renderBlogsByLikes = (
    <ul style={{ marginLeft: '-45px' }}>
      {getBlogsByLikes.map((blog) => (
        <ExploreBlog
          key={blog.id}
          blogObject={blog}
          user={user}
          getUserLikedBlogs={userLikedBlogs}
          showPostedBy={true}
          isIndividualPage={false}
          isRandomBlog={false}
        />
      ))}
    </ul>
  )

  const renderBlogsByDefault = (
    <ul style={{ marginLeft: '-45px' }}>
      {explorePageState.map((blog) => (
        <ExploreBlog
          key={blog.id}
          blogObject={blog}
          user={user}
          getUserLikedBlogs={userLikedBlogs}
          showPostedBy={true}
          isIndividualPage={false}
          isRandomBlog={false}
        />
      ))}
    </ul>
  )

  const returnSortedPage = sorting === 'Default' ? renderBlogsByDefault : renderBlogsByLikes

// pagination function for the front page 'load more' button
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  return (
    <Container maxWidth="lg" disableGutters>
    <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, mt: 4 }}>
    <Typography 
          variant={isMobile ? "h4" : "h3"} 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold', 
            color: 'blue',
            fontSize: {
              xs: '1.75rem',  // extra-small devices
              sm: '2.5rem',   // small devices
              md: '3rem'      // medium devices and up
            }
          }}
        >
          Front Page
        </Typography>
        <Typography 
          variant={isMobile ? "h6" : "h5"} 
          gutterBottom 
          sx={{ 
            color: 'text.secondary', 
            mb: 4,
            fontSize: {
              xs: '1rem',     // extra-small devices
              sm: '1.25rem',  // small devices
              md: '1.5rem'    // medium devices and up
            }
          }}
        >
          Explore blogs posted by others and interact with them.
        </Typography>
      
      <Box sx={{ mb: 4, mt: 2 }}>
        <BasicSelect sorting={sorting} setSorting={setSorting} />
      </Box>
      
      <Box sx={{ 
          mb: 4, 
          display: isSmallScreen ? 'flex' : 'block',
          justifyContent: isSmallScreen ? 'center' : 'flex-start',
          alignItems: isSmallScreen ? 'center' : 'flex-start',
        }}>
          {returnSortedPage}
        </Box>
      
      <Box display="flex" alignItems="center" justifyContent="center">
        {loadMoreButtonVisible && (
          <Button 
            variant="outlined" 
            onClick={handleLoadMore} 
            sx={{ 
              fontWeight: 600, 
              py: 2, 
              px: 4, 
              minWidth: { xs: '80%', sm: '50%', md: '30%' },
              backgroundColor: 'background.paper',
              color: 'primary.main',
              borderColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'background.paper',
              }
            }}
          >
            Load More Blogs
          </Button>
        )}
        
        {!loadMoreButtonVisible && (
          <Alert 
            severity="info" 
            sx={{ 
              mt: 4, 
              backgroundColor: 'primary.dark', 
              color: 'background.paper', 
              fontSize: { xs: '16px', sm: '18px' },
              width: '100%',
              justifyContent: 'center'
            }}
          >
            No more blogs left to load!
          </Alert>
        )}
      </Box>
    </Box>
  </Container>
  )
}
