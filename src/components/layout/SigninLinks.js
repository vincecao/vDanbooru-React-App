import React, { Fragment } from "react";
import { Button } from "@blueprintjs/core";
import { NavLink } from "react-router-dom";

const SigninLinks = () => {
  return (
    <Fragment>
      <NavLink to="/">
        <Button className="bp3-minimal" icon="user" disabled />
      </NavLink>
      {/* <Button className="bp3-minimal" icon="notifications" disabled /> */}
      <NavLink to="/">
        <Button className="bp3-minimal" icon="log-out" disabled />
      </NavLink>
    </Fragment>
  );
};

export default SigninLinks;
