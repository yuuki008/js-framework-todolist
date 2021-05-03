import { db, auth, timestamp } from "../db"


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

export const signUp = (name, email, password, confirmPassword, history) => {
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
        customer_id: "",
        payment_method_id: "",
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

export const signIn = (email, password, history) => {
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