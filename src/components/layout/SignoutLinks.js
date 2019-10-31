import React, { Fragment } from "react";
import { Button } from "@blueprintjs/core";
import { NavLink } from "react-router-dom";

const SignoutLinks = () => {
  return (
    <Fragment>
      <NavLink to="/">
        <Button className="bp3-minimal" icon="hand" disabled />
      </NavLink>
      <NavLink to="/">
        <Button className="bp3-minimal" icon="log-in" disabled />
      </NavLink>
    </Fragment>
  );
};

export default SignoutLinks;
