import React, { useState, useContext, useEffect } from 'react'

import loginService from "../services/handleSignUpLogin";
import LoadingSpinner from "../mui-components/LoadingSpinner";
import blogService from "../services/handleBlogs";
import userLikesService from "../services/handleUserLikes";
import { useNotification } from '../custom-hooks/useNotification';

const AuthContext = React.createContext(null)

// custom hook for accessing the current authenticated user. Returns either the current logged in user object, or null.
export function useAuth() {

  const context = useContext(AuthContext);

  // Check/allow context to be used only from inside our AuthProvider wrapped children.
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;

}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { ErrorNotification, SuccessNotification, showErrorNotification, showSuccessNotification } = useNotification();

    function resetForm() {
      setUsername("");
      setPassword("");
      localStorage.removeItem("loggedInBlogAppUser");
    }

      // If user is logged in on their ususal device: retrieve the user once on mount and store it. Give token to relevant services.
      useEffect(() => {
        const loggedInUser = window.localStorage.getItem("loggedInBlogAppUser");
      
        if (loggedInUser) {
          const user = JSON.parse(loggedInUser);
          setUser(user);
          blogService.setToken(user.token);
          userLikesService.setToken(user.token);
        }
      
        setLoading(false); // We're done fetching the user
      }, []);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password }); // should return user: username, name, id, token

      window.localStorage.setItem("loggedInBlogAppUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      userLikesService.setToken(user.token);
      setUsername("");
      setPassword("");
      showSuccessNotification("Logged in successfully.")
    } catch (err) {
      showErrorNotification("Login failed. Verify login details.")
      resetForm();
    }
  }

  function handleLogout() {
    setUser(null);
    blogService.setToken(null);
    userLikesService.setToken(null);
    resetForm();
  }

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, handleLogout, username, setUsername, password, setPassword }}>
      <ErrorNotification />
      <SuccessNotification />
      {loading ? <LoadingSpinner message={"Loading user data..."} /> : children} {}
    </AuthContext.Provider>
  );

}