import React from 'react';
import { NavButton } from './Nav';

const SignoutLinks = (props) => {
  return (
    <span className='hidden md:flex'>
      <NavButton icon="hand" text="Sign-up" disabled />
      <NavButton icon="log-in" text="Login" disabled />
    </span>
  );
};

export default SignoutLinks;
