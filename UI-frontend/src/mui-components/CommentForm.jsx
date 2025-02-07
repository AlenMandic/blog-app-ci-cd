import React, { useState } from 'react'
import { Button, TextField, Box } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

export default function CommentForm ({ onSubmit }) {
  const [comment, setComment] = useState('')

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(event, comment)
    setComment('')
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: '600px' }}>
      <TextField
        label="Add a comment"
        variant="outlined"
        multiline
        rows={3}
        fullWidth
        value={comment}
        onChange={handleCommentChange}
        sx={{
          borderBottom: 'solid 4px black',
          marginBottom: 2,
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'background.paper',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          },
        }}
        inputProps={{ minLength: 3, maxLength: 200 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          borderRadius: '20px',
          padding: '8px 24px',
          textTransform: 'none',
          fontWeight: 'bold',
        }}
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </Box>
  )
}