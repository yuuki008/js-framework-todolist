import { useEffect } from 'react'
import { auth, db } from './db'
import { useHistory } from 'react-router'

export const AuthWrapper = (props) => {
  const history = useHistory()

  const listenAuthState = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const id = user.uid
        db.collection('users').doc(id).get()
        .then((snapshot) => {
          const data = snapshot.data()
          if (!data) {
            history.push('signin')
          }
        })
        .catch((error) => {
          console.error(error)
          history.push('signin')
        })
      } else {
        history.push('signin')
      }
    })
  }

  useEffect(() => {
    listenAuthState()
  }, [])

  return props.children
}

