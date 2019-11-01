import React, { Fragment } from "react";
import { Button, Tooltip } from "@blueprintjs/core";
import { connect } from 'react-redux'

const SignoutLinks = (props) => {

  const handleLoginBtn = () => {
    props.showSignInWindow()
  }

  const handleSigupBtn = () => {
    props.showSignUpWindow()
  }

  return (
    <Fragment>
      <Tooltip
        className="bp3-minimal"
        content="Sign-up"
        position="bottom">
        <Button className="bp3-minimal" icon="hand" onClick={handleSigupBtn} />
      </Tooltip>
      <Tooltip
        className="bp3-minimal"
        content="Log-in"
        position="bottom">
        <Button className="bp3-minimal" icon="log-in" onClick={handleLoginBtn} />
      </Tooltip>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    signInWindowsState: state.auth.signInWindowsState,
    signUpWindowsState: state.auth.signUpWindowsState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showSignInWindow: () => {
      return dispatch({
        type: "SHOW_SIGN_IN_WINDOW"
      });
    },
    showSignUpWindow: () => {
      return dispatch({
        type: "SHOW_SIGN_UP_WINDOW"
      });
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(SignoutLinks);
