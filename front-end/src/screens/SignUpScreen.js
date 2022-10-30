import React, { useState, useContext, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import axios from 'axios'
import { Store } from '../Store.js'
import { toast } from 'react-toastify'
import { getError } from '../utils.js'
export default function SignUpScreen() {
  const navigate = useNavigate()
  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { userInfo } = state

  const submitHandler = async (e) => {
    try {
      e.preventDefault()
      if (password !== confirmPassword) {
        toast.error('密码不相同')
        return
      }
      const { data } = await axios.post('/api/users/signup', {
        name,
        email,
        password
      })
      ctxDispatch({ type: 'USER_SIGNIN', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
      navigate(redirect || '/')
    } catch (error) {
      toast.error(getError(error))
    }
  }
  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])
  return (
    <Container className="small-container">
      <Helmet>
        <title>sign up</title>
      </Helmet>
      <h1 className="my-3">sign-up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="name" required onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmpassword">
          <Form.Label>confirm password</Form.Label>
          <Form.Control type="confirmpassword" required onChange={(e) => setConfirmPassword(e.target.value)} />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign up</Button>
        </div>
        <div className="mb-3">
          已经有账户了{''}
          <Link to={`/signup?redirect=${redirect}`}>sign in</Link>
        </div>
      </Form>
    </Container>
  )
}
