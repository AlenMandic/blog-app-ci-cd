import { React, useState } from 'react'
import blogService from '../services/handleBlogs'
import { Button, TextField, Typography } from '@mui/material'
import { useNotification } from '../custom-hooks/useNotification'

export default function AddBlog({ updateUserPageState }) {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState(0)
  const [showBlogForm, setShowBlogForm] = useState(false)

  const { ErrorNotification, SuccessNotification, showErrorNotification, showSuccessNotification } = useNotification();

  function resetOurForm() {
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes(0)
  }

  const blogObject = { title, author, url, likes }

  async function handleBlogSubmit(e) {

    e.preventDefault()
    resetOurForm()

    try {
      const result = await blogService.addBlog(blogObject)

      updateUserPageState(result.data) // updates the state of our user and explore data with new post. addBlogForm -> App.jsx

      setShowBlogForm(!showBlogForm)
      showSuccessNotification('Blog added successfully.')
      return result.data

    } catch(err) {
      showErrorNotification(err.response?.data?.error || err.message || 'An unknown error occured')
    }
  }

  function handleShowPostBlogForm() {
    setShowBlogForm(!showBlogForm)
  }

  function showPostBlogForm() {
    if(showBlogForm) {
      return (
        <>
          <ErrorNotification />
          <SuccessNotification />
          {' '}
          <form onSubmit={handleBlogSubmit} style={{ 
            backgroundColor: 'white', 
            width: '100%', 
            maxWidth: '400px', // Set a max width for better responsiveness
            padding: '20px', // Add padding for better spacing
            borderRadius: '8px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a subtle shadow for depth
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center' 
          }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Post a new blog</Typography>
            <TextField variant="outlined" label="Title" type="text" name="title-input" required value={title} onChange={({ target }) => setTitle(target.value)} 
              sx={{ mb: 2, width: '100%' }} // Full width and margin bottom
              inputProps={{ minLength: 5, maxLength: 60 }} 
            />
            <TextField variant="outlined" label="Author" type="text" name="author-input" required value={author} onChange={({ target }) => setAuthor(target.value)} 
              sx={{ mb: 2, width: '100%' }} 
              inputProps={{ minLength: 5, maxLength: 60 }} 
            />
            <TextField variant="outlined" label="URL" type="text" name="url-input" required value={url} onChange={({ target }) => setUrl(target.value)} 
              sx={{ mb: 2, width: '100%' }} 
              inputProps={{ minLength: 5, maxLength: 100 }} 
            />
            <TextField variant="outlined" label="Likes" type="number" name="likes-input" value={likes} onChange={({ target }) => setLikes(target.value)} 
              sx={{ mb: 2, width: '100%' }} 
              inputProps={{ min: 0 }} // Ensure likes can't be negative
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Button variant="contained" type="submit" sx={{ fontWeight: '600', my: '15px', flexGrow: 1, mr: 1 }}>Post</Button>
              <Button variant="outlined" onClick={handleShowPostBlogForm} sx={{ fontWeight: '600', flexGrow: 1, ml: 1 }}>Cancel</Button>
            </div>
          </form>
        </>
      )
    } else {
      return <>
          <ErrorNotification />
          <SuccessNotification />
          <Button variant="contained" onClick={handleShowPostBlogForm} sx={{ fontWeight: '600', width: '100%', maxWidth: '200px', my: '30px' }}>Post a new blog</Button>
            </>
    }
  }
  return showPostBlogForm()
}
