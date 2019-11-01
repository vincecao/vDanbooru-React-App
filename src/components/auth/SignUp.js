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

const OVERLAY_EXAMPLE_CLASS = "docs-overlay-example-transition";
class SignUp extends Component {

  classes = classNames(
    Classes.CARD,
    Classes.ELEVATION_4,
    OVERLAY_EXAMPLE_CLASS
  );

  handleClose = () => this.props.closeSignUpWindow();
  handleSubmit = () => {
    console.log(this.props.signUpInfo)
  };
  handleChange = (e) => {
    this.props.onChangeSignUpInfo(e)
  };

  signUpHelperMessage = this.props.signUpHelperMessage;

  render() {
    return (
      <Overlay {...this.props.signUpWindowsState} className="center" onClose={this.handleClose}>

        <div className={this.classes} style={{ width: "350px" }}>
          <h2>Welcome to vDanbooru</h2>
          <h5>Wow, you find me!</h5>
          <FormGroup
            helperText={this.signUpHelperMessage}
            // label="Wow, you find me!"
            labelFor="signup"
            style={{ marginBottom: "15px" }}
          > <label>
              Nick Name
              <InputGroup id="signup-nickname" style={{ marginBottom: "15px" }} placeholder="VINCE" onChange={this.handleChange} />
            </label>
            <label>
              Email Address
              <InputGroup id="signup-email" style={{ marginBottom: "15px" }} placeholder="vvv@vvv.vvv" onChange={this.handleChange} />
            </label>
            <label>
              Password
              <InputGroup type="password" id="signup-password" placeholder="" onChange={this.handleChange} />
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
    signUpWindowsState: state.signUpWindowsState,
    signUpHelperMessage: state.signUpHelperMessage,
    signUpInfo: state.signUpInfo
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)