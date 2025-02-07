import React from 'react'
import { Snackbar, Alert, useTheme } from '@mui/material'
import { styled } from '@mui/system'

const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(9), // Adjust this value to position below the header
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  maxWidth: '600px',
}))

const StyledAlert = styled(Alert)(({ theme }) => ({
  width: '100%',
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  fontSize: '1rem',
  '& .MuiAlert-icon': {
    fontSize: '1.5rem',
  },
}))

export function NotificationSuccess({ message }) {
  const theme = useTheme()

  if (message === null) {
    return null
  }

  return (
    <StyledSnackbar 
      open={Boolean(message)} 
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <StyledAlert 
        severity="success" 
        variant="filled"
        sx={{ 
          backgroundColor: theme.palette.success.main,
          color: theme.palette.success.contrastText,
        }}
      >
        {message}
      </StyledAlert>
    </StyledSnackbar>
  )
}

export function NotificationError({ message }) {
  const theme = useTheme()

  if (message === null) {
    return null
  }

  return (
    <StyledSnackbar 
      open={Boolean(message)} 
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <StyledAlert 
        severity="error" 
        variant="filled"
        sx={{ 
          backgroundColor: theme.palette.error.main,
          color: theme.palette.error.contrastText,
        }}
      >
        {message}
      </StyledAlert>
    </StyledSnackbar>
  )
}