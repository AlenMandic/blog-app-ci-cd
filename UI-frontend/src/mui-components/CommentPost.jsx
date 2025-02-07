import React from 'react'
import { Avatar, Box, Typography, Paper } from '@mui/material'
import { Link } from 'react-router-dom'

export default function CommentPost ({ comment }) {
  return (
    <Paper
      sx={{
        padding: { xs: 2, sm: 3 },
        border: 'solid 2px black',
        marginTop: 2,
        width: '100%',
        maxWidth: '600px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      elevation={0}
    >
      <Box display="flex" alignItems="center">
        <Avatar 
          sx={{ 
            marginRight: 2, 
            width: 48, 
            height: 48,
            bgcolor: 'primary.main',
          }}
        >
          {comment.postedBy.username.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Link to={`/api/users/${comment.postedBy.id}`} style={{ textDecoration: 'none' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
              {comment.postedBy.username}
            </Typography>
          </Link>
          <Typography variant="caption" color="text.secondary">
            {/* Add a timestamp here if available */}
            Posted on {new Date().toLocaleDateString()}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body1" sx={{ marginTop: 2, lineHeight: 1.6 }}>
        {comment.commentContent}
      </Typography>
    </Paper>
  )
}