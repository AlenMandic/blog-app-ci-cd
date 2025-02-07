import { useState, useEffect, React } from 'react'
import userLikeService from '../services/handleUserLikes'
import { useAuth } from '../components/AuthProvider'

export const useGetUserLikedBlogs = () => {

    const [userLikedBlogs, setUserLikedBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { user } = useAuth()

      // figure out which blogs have been liked by the user to handle like/dislike buttons
  useEffect(() => {

    const fetchUserLikedBlogs = async () => {

      try {

        if (user) {
           setLoading(true)
          const result = await userLikeService.getLikedPosts(user)

          setUserLikedBlogs(result)
        }

      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserLikedBlogs()
  }, [user])

  return { userLikedBlogs, loading, error }

}