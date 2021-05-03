import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { signUp } from '../fetch/index'

export const SignUp = () => {
  const history = useHistory()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const inputName = useCallback((e) => {
    setName(e.target.value)
  }, [setName])

  const inputEmail = useCallback((e) => {
    setEmail(e.target.value)
  }, [setEmail])

  const inputPassword = useCallback((e) => {
    setPassword(e.target.value)
  }, [setPassword])

  const inputConfirmPassword = useCallback((e) => {
    setConfirmPassword(e.target.value)
  }, [setConfirmPassword])

  return (
    <Wrapper>
      <h2>sign_up</h2>
      <Input type="text" value={name} placeholder="username" onChange={(e) => inputName(e)}/>
      <Input type="email" value={email} placeholder="email" onChange={(e) => inputEmail(e)}/>
      <Input type="password" value={password} placeholder="password" onChange={(e) => inputPassword(e)}/>
      <Input type="password" value={confirmPassword} placeholder="confirm password" onChange={(e) => inputConfirmPassword(e)} />
      <SubmitWrapper>
        <SubmitButton onClick={() => signUp(name, email, password, confirmPassword, history)}>sign up</SubmitButton>
      </SubmitWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 350px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
`

const Input = styled.input`
  padding: 10px;
`

const SubmitWrapper = styled.div`
  margin: 10px;
`

const SubmitButton = styled.button``