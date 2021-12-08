import React, { ReactElement } from 'react';
import { NavButton } from './Nav';

export default function SignoutLinks(): ReactElement {
  return (
    <span className="hidden md:flex">
      <NavButton icon="hand" text="Sign-up" disabled />
      <NavButton icon="log-in" text="Login" disabled />
    </span>
  );
}
