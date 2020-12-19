import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import firebase from './const/fbConfig';
import App from './components/App';
import './tailwind.css';
import LightBoxProvider from './contexts/lightBoxContext';
import { ThemeProvider } from './contexts/themeContext';

const composeEnhancers = composeWithDevTools({
  realtime: true,
});

const store = createStore(composeEnhancers(applyMiddleware(thunk.withExtraArgument(firebase))));

const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <ThemeProvider>
        <LightBoxProvider>
          <App />
        </LightBoxProvider>
      </ThemeProvider>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);
