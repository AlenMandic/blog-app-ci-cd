import React from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useAuth } from '../components/AuthProvider'

export default function Login({ showPassword, handleShowPassword, handleLogin, user }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const { username, setUsername, password, setPassword } = useAuth()

  const loggedIn = (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h4" color="primary" fontWeight="bold">
        Welcome back!
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        You are currently logged in.
      </Typography>
    </Box>
  )

  const notLoggedIn = (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          border: 'solid 2px black',
          borderRadius: '12px',
          p: 4,
          width: '100%',
          maxWidth: 400,
          borderRadius: 2,
        }}
      >
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <IconButton
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              '&:hover': { backgroundColor: theme.palette.primary.dark },
              mb: 2,
            }}
          >
            <LockOutlined />
          </IconButton>
          <Typography component="h1" variant="h5" fontWeight="bold">
            Log In
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }} autoComplete='login-form'>
          <TextField
            label="Username"
            value={username}
            margin="normal"
            required
            fullWidth
            id="username-input"
            name="username-input"
            autoComplete="username-input4323424324"
            autoFocus
            inputProps={{
              minLength: 3,
              maxLength: 30,
            }}
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            label="Password"
            value={password}
            margin="normal"
            required
            fullWidth
            id="password-input"
            name="password-input"
            autoComplete='password-input536263243243'
            inputProps={{
              minLength: 15,
              maxLength: 80,
            }}
            type={showPassword ? 'text' : 'password'}
            onChange={({ target }) => setPassword(target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold' }}
          >
            Sign In
          </Button>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link to="/api/register" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="primary">
                Don't have an account? Sign Up
              </Typography>
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  )

  return (
    <>
      {!user && (
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          sx={{ textAlign: 'center', my: 4, fontWeight: 'bold', color: 'blue' }}
        >
          Welcome to SnapBlog
        </Typography>
      )}
      {!user && notLoggedIn}
      {user && loggedIn}
    </>
  )
}