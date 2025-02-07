import { React, useState } from 'react'
import loginService from '../services/handleSignUpLogin'
import SignUp from '../mui-components/Sign-up'
import { useNavigate } from 'react-router-dom'
import { useNotification } from '../custom-hooks/useNotification'

export default function CreateSignUpForm({ user }) {

    const navigate = useNavigate()

    const { ErrorNotification, SuccessNotification, showErrorNotification, showSuccessNotification } = useNotification();

    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

      function handleShowMessage() {
        showSuccessNotification('Your account has been created successfully! You may now log in.')
      }

      function resetForm() {
        setUsername('')
        setName('')
        setPassword('')
        setRepeatPassword('')
      }

      async function handleSignUp(e) {
        e.preventDefault()

        if(password !== repeatPassword) {
            showErrorNotification('Passwords dont match!')
            return null
        }

        const newUser = { username, name, password }

         try {
          const response = await loginService.registerUser(newUser)

          if(response.status === 201) {
            handleShowMessage()
            navigate('/api/login')
          }

          resetForm()
          return response

         } catch(err) {
          console.log(err)
          showErrorNotification(err.toString())
         }
      }

    return <>
      <ErrorNotification />
      <SuccessNotification />
      <SignUp user={user} setUsername={setUsername} username={username} name={name} setName={setName} password={password} setPassword={setPassword} repeatPassword={repeatPassword} setRepeatPassword={setRepeatPassword} handleSignUp={handleSignUp} />
      </>
      }