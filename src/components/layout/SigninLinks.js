import React from "react";
import { Button } from "@blueprintjs/core";
import { connect } from "react-redux";
import { signOut } from "../../actions/authActions";

const SigninLinks = (props) => {
  return (
    <>
      <Button className="bp3-minimal" icon="user">
        <p className="desktop-navbar-txt">{"Hi, " + props.profile.nickName}</p>
      </Button>
      <Button className="bp3-minimal" icon="log-out" onClick={props.signOut}>
        <p className="desktop-navbar-txt">Logout</p>
      </Button>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninLinks);
