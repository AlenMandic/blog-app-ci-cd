import React from 'react'
import { Link } from 'react-router-dom'
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Container, Box, Divider, useTheme, useMediaQuery } from '@mui/material'
import { useGetUsers } from '../custom-hooks/useGetUsers'
import LoadingSpinner from '../mui-components/LoadingSpinner'
import PersonIcon from '@mui/icons-material/Person'
import ArticleIcon from '@mui/icons-material/Article'

export default function UsersPage() {
  const { users, loading, error } = useGetUsers()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  if (loading) {
    return <LoadingSpinner message={'Loading users...'} />
  }

  if (error) {
    return <Typography color="error">Error: {error.message}</Typography>
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, }}>
        <Typography variant={isMobile ? 'h4' : 'h3'} component="h1" gutterBottom color="blue" fontWeight="bold">
          Our Community
        </Typography>
        <Typography variant="subtitle1" gutterBottom color="text.secondary">
          Explore our community of bloggers and their contributions.
        </Typography>
        <Divider sx={{ my: 3 }} />
        <List sx={{ width: '100%', borderRadius: '8px' }}>
          {users.map((user) => (
            <React.Fragment key={user.id}>
              <ListItem
                alignItems="flex-start"
                component={Link}
                to={`/api/users/${user.id}`}
                sx={{
                  textDecoration: 'none',
                  borderBottom: 'solid 2px black',
                  color: 'inherit',
                  transition: 'background-color 0.3s',
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" component="span">
                      {user.name}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        <ArticleIcon sx={{ fontSize: 16, verticalAlign: 'text-bottom', mr: 0.5 }} />
                        {user.blogs.length} blog{user.blogs.length !== 1 ? 's' : ''}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Container>
  )
}