// Material UI imports
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LoadingSpinner from "./mui-components/LoadingSpinner";
import ExploreIcon from '@mui/icons-material/Explore';
import { Layout } from "./mui-components/Layout";

// Regular imports
import "./style.css";
import { useState, useRef } from "react";
import blogService from "./services/handleBlogs";
import UserBlog from "./components/UserBlog";
import ExploreBlog from "./components/ExploreBlog";
import { BrowserRouter as Router } from "react-router-dom";

// Custom hooks
import { useCreateExplorePage } from "./custom-hooks/useCreateExplorePage";
import { useUserProfile } from "./custom-hooks/useUserProfile";
import { useGetUserLikedBlogs } from "./custom-hooks/useGetUserLikedBlogs";
import { useNotification } from "./custom-hooks/useNotification";
import { useAuth } from "./components/AuthProvider";

import { MainRoutes } from "./components/MainRoutes";

export default function App() {

  const { user } = useAuth();

  const [showUserPosts, setShowUserPosts] = useState(true);

  const randomBlogRef = useRef(null);

  // custom hook which renders out and handles data for the Front Page page.
  const { explorePageState, setExplorePageState, loading, error } =
    useCreateExplorePage();

  // custom hook for logged in user-blogs
  const { blogs, setUserBlogs, loadingUserProfile, errorUserProfile } =
    useUserProfile();

  // handle user data for random blog post
  const { userLikedBlogs } = useGetUserLikedBlogs();

  // custom hook for notifications
  const { ErrorNotification, SuccessNotification, showErrorNotification, showSuccessNotification } = useNotification();

  if (loading) {
    return <LoadingSpinner message={"Loading data..."} />;
  } else if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (loadingUserProfile) {
    return <LoadingSpinner message={"Loading your profile..."} />;
  } else if (errorUserProfile) {
    return <p>Error: {errorUserProfile.message}</p>;
  }

  // updates Homepage and Explore page state when a user adds a new post from addBlogForm.jsx component
  function handleBlogSubmitCallback(blogObject) {
    const oldUserBlogs = blogs;

    setUserBlogs(oldUserBlogs.concat(blogObject));
  }

  // updates user blogs and the explore page when a user deletes one of his blogs.
  async function handleDelete(ourBlog) {
    const confirm = window.confirm(
      `Are you sure you want to delete "${ourBlog.title}"`
    );

    if (confirm) {
      try {
        const deleteBlog = await blogService.deleteBlog(ourBlog.id);

        const updatedUserBlogs = blogs.filter((blog) => blog.id !== ourBlog.id);
        const updatedExplorePageBlogs = explorePageState.filter(
          (blog) => blog.id !== ourBlog.id
        );
        setUserBlogs(updatedUserBlogs);
        setExplorePageState(updatedExplorePageBlogs);
        showSuccessNotification('Blog deleted!')

        return deleteBlog.data;
      } catch (error) {
        showErrorNotification(error.response?.data?.error || err.message || 'An unknown error occured')
      }
    } else {
      return null;
    }
  }

  // show or hide user's personal blogs
  function handleUserPosts() {
    if (showUserPosts) {
      return (
        <div>
          <Button
            variant="contained"
            onClick={toggleUserPosts}
            sx={{ fontWeight: '600', width: '100%', maxWidth: '200px', my: '30px' }}
          >
            Hide posts
          </Button>
          <ul style={{ marginLeft: '-40px'}}>
            {blogs.map((blog) => (
              <UserBlog
                key={blog.id}
                blogObject={blog}
                handleDeleteCallback={handleDelete}
              />
            ))}
          </ul>
        </div>
      );
    } else {
      return (
        <Button
          variant="contained"
          onClick={toggleUserPosts}
          sx={{ fontWeight: '600', width: '100%', maxWidth: '200px', my: '30px' }}
        >
          Show your posts
        </Button>
      );
    }
  }

  function toggleUserPosts() {
    setShowUserPosts(!showUserPosts);
  }

  // displays a random blog on every new refresh.
  function displayRandomBlog() {
    const randomBlogIndex = Math.floor(Math.random() * explorePageState.length);
    const randomBlog = explorePageState[randomBlogIndex];
  
    return (
      <Box elevation={3} sx={{ p: 3, mt: 4, marginLeft: '25px' }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ 
            marginLeft: '-40px',
            fontWeight: 'bold', 
            color: 'blue',
            display: 'flex',
            alignItems: 'center',
            fontSize: {
              xs: '1.5rem',    // extra-small devices
              sm: '2rem',      // small devices
              md: '2.5rem'     // medium devices and up
            }
          }}
        >
          <ExploreIcon sx={{ mr: 2 }} /> Explore a Random Blog Post
        </Typography>
        <Box sx={{ mt: 2, marginLeft: '-40px' }}>
          <ExploreBlog
            blogObject={randomBlog}
            user={user}
            getUserLikedBlogs={userLikedBlogs}
            showPostedBy={true}
            isIndividualPage={false}
            isRandomBlog={true}
          />
        </Box>
      </Box>
    );
  }
  // on component mount, set useRef to 'random blog card' so it doesn't get re-rendered by any App.jsx state change.
  if (!randomBlogRef.current) {
    randomBlogRef.current = displayRandomBlog(); // returns a React.JSX element
  }

  return (
      <Container sx={{ minHeight: "100vh" }}>
        <Router>
          <ErrorNotification />
          <SuccessNotification />
            <Layout>

              <MainRoutes
                handleBlogSubmitCallback={handleBlogSubmitCallback}
                handleUserPosts={handleUserPosts}
                randomBlogRef={randomBlogRef}
              />

            </Layout>
        </Router>
      </Container>
  );
}
