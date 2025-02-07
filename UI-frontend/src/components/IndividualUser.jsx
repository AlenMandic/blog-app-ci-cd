import { useParams } from 'react-router-dom'
import { useGetIndividualUser } from '../custom-hooks/useGetIndividualUser'
import { useGetUserLikedBlogs } from '../custom-hooks/useGetUserLikedBlogs'
import ExploreBlog from './ExploreBlog'
import Alert from '@mui/material/Alert'
import LoadingSpinner from '../mui-components/LoadingSpinner'
import { Container, Typography, Box, Divider, Avatar, Grid, Paper, useTheme, useMediaQuery } from '@mui/material'

export default function UserPage({ user }) {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const { userId } = useParams()
    const { userLikedBlogs } = useGetUserLikedBlogs(user)
    const { currentUserProfile, currentUserBlogs, loading, error, showErrorPage } = useGetIndividualUser(userId)

    if(loading) {
        return <LoadingSpinner message={'Loading User Profile...'} />
    }

    if(error) {
        return <Typography color="error">Error: {error.message}</Typography>
    }

    const userBlogs = currentUserBlogs.map(blog => (
        <ExploreBlog key={blog.id} blogObject={blog} user={user} getUserLikedBlogs={userLikedBlogs} showPostedBy={false} isIndividualPage={false} isRandomBlog={false} />
    ))

    const errorPage = (
        <Box sx={{ textAlign: 'center', py: 8 }}>
            <Alert severity="error" sx={{ fontWeight: '600', fontSize: '20px', mb: 4 }}>
                Ooops. That page is in another castle.
            </Alert>
            <Typography variant="h5" sx={{ mt: 4 }}>
                🛠️ Something went wrong. Ensure the user profile you are looking for exists.
            </Typography>
        </Box>
    )

    function getTotalLikes() {
        const getLikesArray = currentUserBlogs.map(blog => blog.likes)
        const sumTotalLikes = getLikesArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

        return (
            <Typography variant="h6" color="primary" fontWeight="bold">
                Total likes: <Box component="span" color="secondary.main">{sumTotalLikes}</Box>
            </Typography>
        )
    }

    const userPage = (
        <Box sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                <Grid container spacing={3} alignItems="center">
                    <Grid item>
                        <Avatar 
                            sx={{ 
                                width: theme.spacing(10), 
                                height: theme.spacing(10), 
                                bgcolor: theme.palette.primary.main 
                            }}
                        >
                            {currentUserProfile.name.charAt(0).toUpperCase()}
                        </Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography variant={isMobile ? 'h5' : 'h4'} component="h1" gutterBottom>
                            {currentUserProfile.name}
                        </Typography>
                        {getTotalLikes()}
                    </Grid>
                </Grid>
            </Paper>
            <Typography variant="h5" component="h2" gutterBottom color="blue">
                Blogs posted:
            </Typography>
            <Divider sx={{ mb: 3 }} />
        </Box>
    )

    const renderUserProfile = showErrorPage === false ? userPage : errorPage

    return (
        <Container maxWidth="lg">
            {renderUserProfile}
            <Box sx={{ ml: '-15px' }}>
                {!(showErrorPage) && userBlogs.length === 0 ? (
                    <Typography variant="h6" sx={{ mt: 4, fontStyle: 'italic' }}>
                        {currentUserProfile.name} has not posted any blogs yet!
                    </Typography>
                ) : userBlogs}
            </Box>
        </Container>
    )
}