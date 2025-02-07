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
  Grid,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, PersonAddOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'

export default function SignUp({ user, username, setUsername, name, setName, password, setPassword, repeatPassword, setRepeatPassword, handleSignUp }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [showPassword, setShowPassword] = React.useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = React.useState(false)

  const handleShowPassword = () => setShowPassword((show) => !show)
  const handleShowRepeatPassword = () => setShowRepeatPassword((show) => !show)

  const loggedIn = (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h4" color="primary" fontWeight="bold">
        You're already part of our community!
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        You are currently logged in and have an account.
      </Typography>
    </Box>
  )

  const notLoggedIn = (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          border: 'solid 2px black',
          borderRadius: '12px',
          width: '100%',
          maxWidth: 500,
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
            <PersonAddOutlined />
          </IconButton>
          <Typography component="h1" variant="h5" fontWeight="bold">
            Sign Up
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSignUp} sx={{ mt: 3 }} autoComplete='signup-form'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="signupUsername"
                label="Username"
                name="signupUsername"
                autoComplete="new-username"
                value={username}
                inputProps={{
                  minLength: 3,
                  maxLength: 30,
                }}
                onChange={({ target }) => setUsername(target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="signUpname"
                label="Name"
                name="signUpname"
                autoComplete="new-name"
                value={name}
                inputProps={{
                  minLength: 3,
                  maxLength: 30,
                }}
                onChange={({ target }) => setName(target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="signUp-password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="signUp-password"
                autoComplete='new-password21351212315'
                value={password}
                inputProps={{
                  minLength: 15,
                  maxLength: 80,
                }}
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="repeatPassword"
                label="Repeat password"
                type={showRepeatPassword ? 'text' : 'password'}
                id="repeatPassword"
                autoComplete='new-repeatPassword'
                value={repeatPassword}
                inputProps={{
                  minLength: 15,
                  maxLength: 80,
                }}
                onChange={({ target }) => setRepeatPassword(target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowRepeatPassword} edge="end">
                        {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Alert severity="info" sx={{ mt: 2, backgroundColor: theme.palette.info.light }}>
            Password must be 15 characters or more; include at least 1 capital letter, 1 number, and 1 special character!
          </Alert>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold' }}
          >
            Sign Up
          </Button>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link to="/api/login" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="primary">
                Already have an account? Sign in
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
          Join the SnapBlog Community
        </Typography>
      )}
      {user && loggedIn}
      {!user && notLoggedIn}
    </>
  )
}