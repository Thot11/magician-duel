import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import Header from '../components/header'

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(180deg, #050022 0%, #0a0047 100%);
`

const LoginContainer = styled.div`
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
`

const Title = styled.h1`
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #1c1e21;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const FormGroup = styled.div`
  margin-bottom: 1rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  text-align: left;
  font-weight: 600;
  color: #606770;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #dddfe2;
  border-radius: 6px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #1877f2;
    box-shadow: 0 0 0 2px #e7f3ff;
  }
`

const Button = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  background-color: #1877f2;
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #166fe5;
  }
`

const Subtext = styled.p`
  margin-top: 1rem;
  color: #606770;

  a {
    color: #1877f2;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 1rem;
`

function LoginPage() {
  const [emailOrPseudo, setEmailOrPseudo] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailOrPseudo, password }),
      })

      if (res.ok) {
        const data = await res.json()
        if (data.access_token) {
          login(data.access_token)
        }
        router.push('/')
      } else {
        const errorData = await res.json()
        setError(errorData.message || 'Login failed')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      console.error(err)
    }
  }

  return (
    <>
      <Header />
      <LoginPageContainer>
        <LoginContainer>
          <Title>Login</Title>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="emailOrPseudo">Email / Username</Label>
              <Input
                type="text"
                id="emailOrPseudo"
                value={emailOrPseudo}
                onChange={(e) => setEmailOrPseudo(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button type="submit">Login</Button>
          </Form>
          <Subtext>
            Don&apos;t have an account? <Link href="/register">Register</Link>
          </Subtext>
        </LoginContainer>
      </LoginPageContainer>
    </>
  )
}

export default LoginPage
