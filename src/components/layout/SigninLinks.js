import React, { Fragment } from "react";
import { Button } from "@blueprintjs/core";
import { NavLink } from "react-router-dom";
import {connect} from 'react-redux'

const SigninLinks = () => {
  return (
    <Fragment>
      {/* <NavLink to="/"> */}
        <Button className="bp3-minimal" icon="user" disabled />
      {/* </NavLink> */}
      {/* <Button className="bp3-minimal" icon="notifications" disabled /> */}
      {/* <NavLink to="/"> */}
        <Button className="bp3-minimal" icon="log-out" disabled />
      {/* </NavLink> */}
    </Fragment>
  );
};

// const mapStateToProps = (state, ownProps) => {
//   return {
//     signUpWindowsState: state.signUpWindowsState
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     showSignUpWindow: () => {
//       return dispatch({
//         type: "SHOW_SIGN_UP_WINDOW"
//       });
//     }
//   };
// };

export default connect()(SigninLinks);
