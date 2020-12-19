import React from 'react';
import { NavButton } from './Nav';

const SignInLinks = (props) => {
  return (
    <>
      <NavButton icon="user" text={'Hi, ' + props.profile.nickName} />
      <NavButton icon="log-out" text="Logout" />
    </>
  );
};

export default SignInLinks;
