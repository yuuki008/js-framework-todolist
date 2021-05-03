import { db, auth } from "../db"

const usersRef = db.collection('users')

export const listenAuthState = async () => {
  return new Promise(resolve => {
    return auth.onAuthStateChanged(async (user) => {
      if (!user) return resolve(null)
      usersRef.doc(user.uid).get()
        .then((snapshot) => {
          const data = snapshot.data()
          resolve(data)
        })
        .catch(() => resolve(null))
    })
  })
}

export const getUserData = async (id) => {
  return db.collection('users').doc(id).get()
  .then((snapshot) => snapshot.data())
  .catch(() =>  null)
}