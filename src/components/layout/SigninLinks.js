import React, { Fragment } from "react";
import { Button, Tooltip } from "@blueprintjs/core";
import { connect } from 'react-redux'
import { signOut } from '../../actions/authActions'

const SigninLinks = (props) => {
  return (
    <Fragment>
      {/* <Tooltip
        className="bp3-minimal"
        content={"Hi, " + props.profile.nickName}
        position="bottom"
      > */}
      <Button className="bp3-minimal" icon="user">
        <p className="desktop-navbar-txt">{"Hi, " + props.profile.nickName}</p>
      </Button>

      {/* </Tooltip> */}
      <Tooltip
        className="bp3-minimal"
        content="Log-out"
        position="bottom"
      >
        <Button className="bp3-minimal" icon="log-out" onClick={props.signOut}>
          {/* <p className="desktop-navbar-txt">Log-Out</p> */}
        </Button>
      </Tooltip>
    </Fragment>
  );
};


const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninLinks);
