import React from 'react'
import { useParams } from 'react-router-dom'
import { useIndividualBlog } from '../custom-hooks/useIndividualBlog'
import { useGetUserLikedBlogs } from '../custom-hooks/useGetUserLikedBlogs'
import handleBlogs from '../services/handleBlogs'
import ExploreBlog from './ExploreBlog'
import Alert from '@mui/material/Alert'
import { Container, Typography, Box, Divider, useMediaQuery, useTheme } from '@mui/material'
import LoadingSpinner from '../mui-components/LoadingSpinner'
import CommentForm from '../mui-components/CommentForm'
import CommentPost from '../mui-components/CommentPost'

export default function IndividualBlogPage({ user }) {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const { blogId } = useParams()
    const { blogInfo, comments, setComments, loading, error } = useIndividualBlog(blogId)
    const { userLikedBlogs } = useGetUserLikedBlogs(user)

    const errorPage = (
        <Box sx={{ textAlign: 'center', py: 8 }}>
            <Alert severity="error" sx={{ fontWeight: '600', fontSize: '20px', mb: 4 }}>
                Oops! That page is in another castle.
            </Alert>
            <Typography variant="h5" sx={{ mt: 4 }}>
                🛠️ Something went wrong. Ensure the blog post you are looking for exists.
            </Typography>
        </Box>
    )

    if(loading) {
        return <LoadingSpinner message={'Loading blog data...'} />
    } else if (error) {
        return errorPage
    }

    const handleCommentSubmit = async (event, commentContent) => {

      const trimmedContent = commentContent.trim()

      if (trimmedContent.length < 3 || trimmedContent.length === 0) {
        alert('Invalid comment content. Please enter at least 3 characters.')
        return
      }

     try {

      if(user) {

          const newComment = {

              postedBy: {
                username: user.username,
                id: user.id,
              },
              commentContent: trimmedContent,
            }

          const response = await handleBlogs.addBlogComment(blogId, newComment)

          setComments([response, ...comments])
          return response

      } else {
         alert('Please log in to post comments.')
         return
      }

     } catch(err) {
      alert(err)
     }

  }
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 6 }}>
                <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ mb: 2, fontWeight: 'bold', color: 'blue' }}>
                    Blog Post
                </Typography>
                <Divider sx={{ mb: 4 }} />
                <Box sx={{ ml: '-25px' }}>
                    <ExploreBlog
                        blogObject={blogInfo}
                        user={user}
                        getUserLikedBlogs={userLikedBlogs}
                        showPostedBy={true}
                        isIndividualPage={true}
                    />
                </Box>
            </Box>

            <Box sx={{ mb: 6 }}>
                <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ mb: 2, fontWeight: 'bold', color: 'blue' }}>
                    Discussion
                </Typography>
                <Divider sx={{ mb: 4 }} />
                <CommentForm onSubmit={handleCommentSubmit} />
                <Box sx={{ mt: 4 }}>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <CommentPost key={index} comment={comment} />
                        ))
                    ) : (
                        <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                            No comments yet. Be the first to share your thoughts!
                        </Typography>
                    )}
                </Box>
            </Box>
        </Container>
    )
}