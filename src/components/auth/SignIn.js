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
class SignIn extends Component {

  classes = classNames(
    Classes.CARD,
    Classes.ELEVATION_4,
    OVERLAY_EXAMPLE_CLASS
  );

  handleClose = () => this.props.closeSignInWindow();
  handleSubmit = () => {
    // this.props.onChangeSignInInfo(e)
    console.log(this.props.signInInfo)
  };
  handleChange = (e) => {
    this.props.onChangeSignInInfo(e)
  };

  signInHelperMessage = this.props.signInHelperMessage;

  render() {
    return (
      <Overlay {...this.props.signInWindowsState} className="center" onClose={this.handleClose}>

        <div className={this.classes} style={{ width: "350px" }}>
          <h2>Welcome to vDanbooru</h2>
          <h5>Please login in</h5>
          <FormGroup
            helperText={this.signInHelperMessage}
            // label="Please login in"
            labelFor="signin"
          ><label>
              Email Address
            <InputGroup id="signin-email" style={{ marginBottom: "15px" }} placeholder="vvv@vvv.vvv" onChange={this.handleChange} />
            </label>
            <label>
              Password
            <InputGroup type="password" id="signin-password" placeholder="" onChange={this.handleChange} />
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
              <Button onClick={this.deleteFav} style={{ margin: "" }} onClick={this.handleSubmit}>Log in</Button>
            </div>
          </FormGroup>
        </div>
      </Overlay>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    signInWindowsState: state.signInWindowsState,
    signInHelperMessage: state.signInHelperMessage,
    signInInfo: state.signInInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeSignInWindow: () => {
      return dispatch({
        type: "CLOSE_SIGN_IN_WINDOW"
      });
    },
    onChangeSignInInfo: (e) => {
      return dispatch({
        type: "CHANGE_IN_SIGN_IN",
        event: e
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)