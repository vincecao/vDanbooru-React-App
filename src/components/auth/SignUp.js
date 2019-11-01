import React, { Component } from 'react'
import {
  Overlay,
  FormGroup,
  InputGroup,
  Classes,
  Button,
  Intent
} from "@blueprintjs/core";
import classNames from "classnames";
import { connect } from 'react-redux'
import { signUp } from '../../actions/authActions'

const OVERLAY_EXAMPLE_CLASS = "docs-overlay-example-transition";
class SignUp extends Component {

  classes = classNames(
    Classes.CARD,
    Classes.ELEVATION_4,
    OVERLAY_EXAMPLE_CLASS
  );

  handleClose = () => this.props.closeSignUpWindow();
  handleSubmit = () => {
    //console.log(this.props.signUpInfo)
    this.props.signUp(this.props.signUpInfo)
  };
  handleChange = (e) => {
    this.props.onChangeSignUpInfo(e)
  };

  render() {
    return (
      <Overlay {...this.props.signUpWindowsState} className="center" onClose={this.handleClose}>

        <div className={this.classes} style={{ width: "350px" }}>
          <h2>Welcome to vDanbooru</h2>
          <h5>Wow, you find me!</h5>
          <FormGroup
            helperText={this.props.authError}
            // label="Wow, you find me!"
            labelFor="signup"
            style={{ marginBottom: "15px" }}
          > <label>
              Nick Name
              <InputGroup id="signupNickname" style={{ marginBottom: "15px" }} placeholder="VINCE" onChange={this.handleChange} />
            </label>
            <label>
              Email Address
              <InputGroup id="signupEmail" style={{ marginBottom: "15px" }} placeholder="vvv@vvv.vvv" onChange={this.handleChange} />
            </label>
            <label>
              Password
              <InputGroup type="password" id="signupPassword" placeholder="" onChange={this.handleChange} />
            </label>
            <div
              className={Classes.DIALOG_FOOTER_ACTIONS}
              style={{ marginTop: "30px" }}
            >
              <Button
                intent={Intent.DANGER}
                onClick={this.handleClose}
                style={{ marginRight: "10px" }}
              >Cancel</Button>
              <Button onClick={this.deleteFav} style={{ margin: "" }} onClick={this.handleSubmit}>Sign Up</Button>
            </div>
          </FormGroup>
        </div>
      </Overlay>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    signUpWindowsState: state.auth.signUpWindowsState,
    signUpHelperMessage: state.auth.signUpHelperMessage,
    signUpInfo: state.auth.signUpInfo,
    authError: state.auth.signUpauthError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeSignUpWindow: () => {
      return dispatch({
        type: "CLOSE_SIGN_UP_WINDOW"
      });
    },
    onChangeSignUpInfo: (e) => {
      return dispatch({
        type: "CHANGE_IN_SIGN_UP",
        event: e
      });
    },
    signUp: (newUser) => dispatch(signUp(newUser))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)