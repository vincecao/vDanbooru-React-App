import { firestoreReducer } from 'redux-firestore'
import { combineReducers } from 'redux';

const initState = {
  authError: null,
  isSignInOpen: false,
  signInWindowsState: {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    isOpen: false,
    usePortal: true,
  },
  signInHelperMessage: '',
  signInInfo: {
    'signin-email': '',
    'signin-password': ''
  },
  signUpauthError: null,
  isSignUpOpen: false,
  signUpWindowsState: {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    isOpen: false,
    usePortal: true,
  },
  signUpHelperMessage: '',
  signUpInfo: {
    'signupNickname': '',
    'signupEmail': '',
    'signupPassword': ''
  }
};

const authReducer = (state = initState, action) => {
  //sign in
  if (action.type === 'SHOW_SIGN_IN_WINDOW') {
    return {
      ...state,
      signInWindowsState: {
        ...state.signInWindowsState,
        isOpen: true
      }
    }
  }
  if (action.type === 'CLOSE_SIGN_IN_WINDOW') {
    return {
      ...state,
      signInWindowsState: {
        ...state.signInWindowsState,
        isOpen: false
      }
    }
  }
  if (action.type === 'CHANGE_IN_SIGN_IN') {
    return {
      ...state,
      signInInfo: {
        ...state.signInInfo,
        [action.event.target.id]: action.event.target.value
      }
    }
  }
  if (action.type === 'LOGIN_FAIL') {
    console.log('login fail')
    return {
      ...state,
      authError: 'Login Failed'
    }
  }
  if (action.type === 'LOGIN_SUCCESS') {
    console.log('login success')
    return {
      ...state,
      authError: '',
      signInWindowsState: {
        ...state.signInWindowsState,
        isOpen: false
      }
    }
  }
  if (action.type === 'SIGNOUT_SUCCESS') {
    console.log('sign out')
    return state
  }

  //sign up
  if (action.type === 'SHOW_SIGN_UP_WINDOW') {
    return {
      ...state,
      signUpWindowsState: {
        ...state.signUpWindowsState,
        isOpen: true
      }
    }
  }
  if (action.type === 'CLOSE_SIGN_UP_WINDOW') {
    return {
      ...state,
      signUpWindowsState: {
        ...state.signUpWindowsState,
        isOpen: false
      }
    }
  }
  if (action.type === 'CHANGE_IN_SIGN_UP') {
    return {
      ...state,
      signUpInfo: {
        ...state.signUpInfo,
        [action.event.target.id]: action.event.target.value
      }
    }
  }
  if (action.type === 'SIGNUP_SUCCESS') {
    console.log('signup success')
    return {
      ...state,
      signUpauthError: '',
      signUpWindowsState: {
        ...state.signUpWindowsState,
        isOpen: false
      },
      // signInWindowsState: {
      //   ...state.signUpWindowsState,
      //   isOpen: true
      // }
    }
  }
  if (action.type === 'SIGNUP_ERROR') {
    console.log('signup error')
    return {
      ...state,
      signUpauthError: action.err.message

    }
  }

  return state;
};

export default authReducer