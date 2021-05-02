import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { auth, timestamp, db } from '../db'
import { useHistory } from 'react-router-dom'

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

  const signUp = () => {
    if (name === '' || email === "" || password === "") {
      alert('必須項目が未入力です')
      return false
    }
    if (password !== confirmPassword) {
      alert('パスワードが一致しません')
      return false
    }
    auth.createUserWithEmailAndPassword(email, password).then((result) => {
      const user = result.user
      if (user) {
        const id = user.uid
        const userData = {
          id: id,
          email: email,
          name: name,
          created_at: timestamp.now()
        }
        db.collection('users').doc(id).set(userData)
        .then(() => {
          history.push('/')
        })
        .catch((error) => {
          alert('新規作成に失敗しました')
          console.log(error)
        })
      }
    })
  }

  return (
    <Wrapper>
      <h2>sign_up</h2>
      <Input type="text" value={name} placeholder="username" onChange={(e) => inputName(e)}/>
      <Input type="email" value={email} placeholder="email" onChange={(e) => inputEmail(e)}/>
      <Input type="password" value={password} placeholder="password" onChange={(e) => inputPassword(e)}/>
      <Input type="password" value={confirmPassword} placeholder="confirm password" onChange={(e) => inputConfirmPassword(e)} />
      <SubmitWrapper>
        <SubmitButton onClick={() => signUp(name, email, password, confirmPassword)}>sign up</SubmitButton>
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