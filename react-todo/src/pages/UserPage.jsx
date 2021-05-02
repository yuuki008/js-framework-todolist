import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { listenAuthState } from '../fetch/index'
import styled from 'styled-components'

export const UserPage = () => {
  const history = useHistory()

  const [user, setUserData] = useState({})

  const getUserData = async () => {
    const data = await listenAuthState()
    console.log(data)
    if (data) {
      setUserData(data)
    } else {
      history.push('/signin')
    }
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

