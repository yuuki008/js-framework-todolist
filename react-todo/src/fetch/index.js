import { db, auth } from "../db"

const usersRef = db.collection('users')

export const listenAuthState = async() => {
  const user = auth.currentUser
  if (user) {
    const data = await usersRef.doc(user.uid).get()
    .then((snapshot) => snapshot.data())
    .catch(() => null)
    console.log(data)
    return data
  } else {
    return null
  }
}

export const getUserData = async (id) => {
  return db.collection('users').doc(id).get()
  .then((snapshot) => snapshot.data())
  .catch(() =>  null)
}