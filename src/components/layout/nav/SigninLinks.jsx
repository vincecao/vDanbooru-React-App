import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../../actions/authActions';
import { NavButton } from './Nav';

const SignInLinks = (props) => {
  return (
    <>
      <NavButton icon="user" text={'Hi, ' + props.profile.nickName} />
      <NavButton icon="log-out" onClick={props.signOut} text="Logout" />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInLinks);
