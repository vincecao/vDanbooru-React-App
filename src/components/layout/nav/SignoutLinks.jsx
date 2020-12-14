import React from 'react';
import { connect } from 'react-redux';
import { NavButton } from './Nav';

const SignoutLinks = (props) => {
  const handleLoginBtn = props.showSignInWindow;
  const handleSignUpBtn = props.showSignUpWindow;

  return (
    <>
      <NavButton icon="hand" onClick={handleSignUpBtn} text="Sign-up" disabled />
      <NavButton icon="log-in" onClick={handleLoginBtn} text="Login" disabled />
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    signInWindowsState: state.auth.signInWindowsState,
    signUpWindowsState: state.auth.signUpWindowsState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showSignInWindow: () =>
      dispatch({
        type: 'SHOW_SIGN_IN_WINDOW',
      }),
    showSignUpWindow: () =>
      dispatch({
        type: 'SHOW_SIGN_UP_WINDOW',
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignoutLinks);
