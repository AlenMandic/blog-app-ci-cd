import  { React, useState } from 'react'
import SignInSide from '../mui-components/Login'

export default function CreateLoginForm({ handleLogin, user }) {

  const [showPassword, setShowPassword] = useState(false)

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

    return <>
     <SignInSide showPassword={showPassword} handleShowPassword={handleShowPassword} handleLogin={handleLogin} user={user} />
    </>
  }
