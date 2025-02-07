import blogService from '../services/handleBlogs'
import { useState, useEffect } from 'react'
import { useAuth } from '../components/AuthProvider'

export const useUserProfile = () => {

    const [blogs, setUserBlogs] = useState([])
    const [loadingUserProfile, setLoading] = useState(false)
    const [errorUserProfile, setError] = useState(null)

    const { user, loading } = useAuth()

    // If user is logged in, we render their blog posts.
  useEffect(() => {

    if (!loading && user) {

      const fetchUserBlogs = async () => {

        try {
          setLoading(true)
          const blogs = await blogService.getUserBlogs(user)
          setUserBlogs(blogs)

        } catch (err) {
          setError(err.message)
        } finally {
          setLoading(false)
        }
      }

      fetchUserBlogs()
    }

  }, [user, loading])

  return { blogs, setUserBlogs, loadingUserProfile, errorUserProfile }

}