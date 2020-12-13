import authReducer from './authReducer';
import favoriteReducer from './favoriteReducer';
import { firestoreReducer } from 'redux-firestore';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  favorite: favoriteReducer,
  firestore: firestoreReducer, //database
  firebase: firebaseReducer, //auth
});

export default rootReducer;
