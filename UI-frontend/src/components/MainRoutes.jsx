import { Routes, Route, Navigate } from 'react-router-dom'
import UnknownRoute from '../components/UnknownRoute'
import {HomePage} from '../mui-components/HomePage'
import ExplorePage from '../components/ExplorePage'
import UsersPage from '../components/UsersPage'
import UserPage from '../components/IndividualUser'
import IndividualBlogPage from '../components/IndividualBlog'
import CreateLoginForm from '../components/CreateLoginForm'
import CreateSignUpForm from '../components/CreateSignUpForm'
import { useAuth } from './AuthProvider'

export function MainRoutes({ handleBlogSubmitCallback, handleUserPosts, randomBlogRef }) {

  const { user, handleLogin } = useAuth();

    return (
        <Routes>

          <Route path="/" element={<HomePage handleBlogSubmitCallback={handleBlogSubmitCallback} handleUserPosts={handleUserPosts} randomBlogRef={randomBlogRef}/>}
          />

          <Route path="/api/blogs" element={<ExplorePage user={user} />}/>

          <Route path="/api/users" element={<UsersPage />}/>

          <Route path="/api/users/:userId" element={<UserPage user={user} />}/>

          <Route path="/api/blogs/:blogId" element={<IndividualBlogPage user={user} />}/>

          <Route path="/api/login" element={!user ? <CreateLoginForm handleLogin={handleLogin} user={user} /> : <Navigate to="/" />} />

          <Route path="/api/register" element={!user ? <CreateSignUpForm user={user} /> : <Navigate to="/" /> } />

          <Route path="*" element={<UnknownRoute />} />

        </Routes>
    )
}
