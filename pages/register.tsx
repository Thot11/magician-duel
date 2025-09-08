import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Link from 'next/link'
import Header from '../components/header'
import { useAuth } from '../context/AuthContext'

const RegisterPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(180deg, #050022 0%, #0a0047 100%);
`

const RegisterContainer = styled.div`
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

const ErrorText = styled.p`
  color: red;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
  height: 1rem;
`

const SuccessText = styled.p`
  color: green;
  margin-bottom: 1rem;
`

function RegisterPage() {
  const [pseudo, setPseudo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    setError('')
    setLoading(true)

    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, pseudo }),
      })

      if (res.ok) {
        const data = await res.json()
        if (data.access_token) {
          login(data.access_token)
        }
        setSuccess(true)
        setTimeout(() => {
          router.push('/')
        }, 2000)
      } else {
        const errorData = await res.json()
        setError(errorData.message || 'Registration failed')
      }
    } catch (err) {
      setError('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const isButtonDisabled =
    !pseudo || !email || !password || !confirmPassword || loading

  return (
    <>
      <Header />
      <RegisterPageContainer>
        <RegisterContainer>
          <Title>Register</Title>
          {success ? (
            <SuccessText>Registration successful! Redirecting...</SuccessText>
          ) : (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="pseudo">Pseudo</Label>
                <Input
                  type="text"
                  id="pseudo"
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <FormGroup>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </FormGroup>
              <ErrorText>{error}</ErrorText>
              <Button type="submit" disabled={isButtonDisabled}>
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </Form>
          )}
          <Subtext>
            Already have an account? <Link href="/login">Login</Link>
          </Subtext>
        </RegisterContainer>
      </RegisterPageContainer>
    </>
  )
}

export default RegisterPage
