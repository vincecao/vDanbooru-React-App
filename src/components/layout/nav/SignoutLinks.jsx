import React from 'react';
import { NavButton } from './Nav';

const SignoutLinks = (props) => {
  return (
    <>
      <NavButton icon="hand" text="Sign-up" disabled />
      <NavButton icon="log-in" text="Login" disabled />
    </>
  );
};

export default SignoutLinks;
