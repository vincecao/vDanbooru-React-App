import React from "react";
import { Button } from "@blueprintjs/core";
import { connect } from "react-redux";

const SignoutLinks = (props) => {
  const handleLoginBtn = props.showSignInWindow;
  const handleSigupBtn = props.showSignUpWindow;

  return (
    <>
      <Button
        className="bp3-minimal"
        icon="hand"
        onClick={handleSigupBtn}
        disabled
      >
        <p className="desktop-navbar-txt">Sign-up</p>
      </Button>

      <Button
        className="bp3-minimal"
        icon="log-in"
        onClick={handleLoginBtn}
        disabled
      >
        <p className="desktop-navbar-txt">Login</p>
      </Button>
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
        type: "SHOW_SIGN_IN_WINDOW",
      }),
    showSignUpWindow: () =>
      dispatch({
        type: "SHOW_SIGN_UP_WINDOW",
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignoutLinks);
