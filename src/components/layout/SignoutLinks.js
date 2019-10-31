import React, { Fragment } from "react";
import { Button } from "@blueprintjs/core";
import { NavLink } from "react-router-dom";
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
      {/* <NavLink to="/"> */}
      <Button className="bp3-minimal" icon="hand" onClick={handleSigupBtn} />
      {/* </NavLink> */}
      {/* <NavLink to="/"> */}
      <Button className="bp3-minimal" icon="log-in" onClick={handleLoginBtn} />
      {/* </NavLink> */}
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    signInWindowsState: state.signInWindowsState,
    signUpWindowsState: state.signUpWindowsState
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
