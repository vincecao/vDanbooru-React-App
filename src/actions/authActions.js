export const signIn = (credentials) => {
  return (dispatch, getState, firebase) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.signinEmail, credentials.signinPassword)
      .then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      })
      .catch((err) => {
        dispatch({ type: 'LOGIN_FAIL' });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, firebase) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' });
      });
  };
};

export const signUp = (newUser) => {
  return (dispatch, getState, firebase) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.signupEmail, newUser.signupPassword)
      .then((resp) => {
        return firebase.firestore().collection('users').doc(resp.user.uid).set({
          nickName: newUser.signupNickname,
          favs: [],
          avatar: '',
          gender: '',
        });
      })
      .then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' });
      })
      .catch((err) => {
        dispatch({ type: 'SIGNUP_ERROR', err });
      });
  };
};
