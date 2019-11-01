export const signIn = (credentials) => {
  return (dispatch, getState, firebase) => {

    firebase.auth().signInWithEmailAndPassword(
      credentials.signinEmail,
      credentials.signinPassword
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' })
    }).catch((err) => {
      dispatch({ type: 'LOGIN_FAIL' })
    })
  }
}

export const signOut = () => {
  return (dispatch, getState, firebase) => {
    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    })
  }
}

export const signUp = (newUser) => {
  return (dispatch, getState, firebase) => {
    firebase.auth().createUserWithEmailAndPassword(
      newUser.signupEmail,
      newUser.signupPassword
    ).then((resp) => {
      return firebase.firestore().collection('users').doc(resp.user.uid).set({
        nickName: newUser.signupNickname,
        favs: [{
          src: 'https://safebooru.org/images/2821/71c10ac8199f7e03cd17fbc3c9495d22c6a10d81.jpg',
          thumbnail: 'https://safebooru.org/images/2821/71c10ac8199f7e03cd17fbc3c9495d22c6a10d81.jpg',
          thumbnailHeight: 1415,
          thumbnailWidth: 1000,
          isSelected: true,
          caption: '2928983'
        }, {
          src: 'https://safebooru.org/images/2821/71c10ac8199f7e03cd17fbc3c9495d22c6a10d81.jpg',
          thumbnail: 'https://safebooru.org/images/2821/71c10ac8199f7e03cd17fbc3c9495d22c6a10d81.jpg',
          thumbnailHeight: 1415,
          thumbnailWidth: 1000,
          isSelected: true,
          caption: '2928983'
        }],
        avatar: '',
        gender: ''
      })
    }).then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' })
    }).catch(err => {
      dispatch({ type: 'SIGNUP_ERROR', err })
    })
  }
}