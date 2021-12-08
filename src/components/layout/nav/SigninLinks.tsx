import React, { ReactElement } from 'react';
import { NavButton } from './Nav';

export default function SignInLinks({ nickName }: { nickName: string}): ReactElement {
  return (
    <>
      <NavButton icon="user" text={`Hi, ${nickName}`} />
      <NavButton icon="log-out" text="Logout" />
    </>
  );
}
