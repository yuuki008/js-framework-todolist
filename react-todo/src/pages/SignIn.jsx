import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { auth } from '../db'
import { useHistory } from 'react-router-dom'

export const SignIn = () => {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const inputEmail = useCallback((e) => {
    setEmail(e.target.value)
  }, [setEmail])

  const inputPassword = useCallback((e) => {
    setPassword(e.target.value)
  }, [setPassword])


  const signIn = () => {
    if (email === "" || password === "") {
      alert('必須項目が未入力です')
      return false
    }
    auth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      history.push('/mypage')
    })
    .catch((error) => {
      alert('サインインに失敗しました')
      console.log(error)
    })
  }

  return (
    <Wrapper>
      <h2>sign_in</h2>
      <Input type="email" value={email} placeholder="email" onChange={(e) => inputEmail(e)}/>
      <Input type="password" value={password} placeholder="password" onChange={(e) => inputPassword(e)}/>
      <SubmitWrapper>
        <SubmitButton onClick={() => signIn(email, password)}>sign in</SubmitButton>
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