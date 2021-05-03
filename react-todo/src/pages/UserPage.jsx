import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { listenAuthState } from '../fetch/index'
import styled from 'styled-components'

export const UserPage = () => {
  const history = useHistory()
  const [user, setUserData] = useState({})

  const getUserData = async () => {
    const data = await listenAuthState()
    if (!data) return history.push('/signin')
    setUserData(data)
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <Wrapper>
      {user && (
        <>
          <h2>{user?.name}</h2>
          <div>{user?.email}</div>
          <div className="center">
            <Button onClick={() => history.push('/user/payment/edit')} >
              カード情報の編集
            </Button>
          </div>
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 20px auto;
`

const Button = styled.button`
  margin: 10px 0;
  padding: 5px;
  font-weight: 500;
  font-size: 16px;
`
