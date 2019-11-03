import React, { Component } from "react";

import "./App.css";
import Search from "./SearchComponent/Search";
import Hots from "./HotsComponent/Hots";
import Favs from "./FavComponent/Favs";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import MyNavbar from "./layout/MyNavbar";
import MyFooter from "./layout/MyFooter";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import {updateBackgroundImageAction} from "../actions/updateBackgroundImageAction"

class App extends Component {
  divStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh"
  };

  constructor(props) {
    super(props);
    this.state = { link: "", isOpen: true };
  }

  handleSignInWindow = () => {
    return <SignIn />
  }

  handleSignUpWindow = () => {
    return <SignUp />
  }

  handleSwitch = () => {
    this.props.updateBackImageSrc()
  }

  render() {
    return (
      <div style={this.divStyle}>
        <BrowserRouter basename={"/vdanbooru-react"}>
          <MyNavbar searchBackground={this.props.searchBackground} />

          <Redirect from="/" to="/Search" />
          <Route path="/Search" component={Search} />
          <Route path="/Hots" component={Hots} />
          <Route path="/Favs" component={Favs} />
          <Route path="/tags/:key" component={Hots} />
          <Redirect to="/Search"/>

          <MyFooter handleSwitch={this.handleSwitch}/>
        </BrowserRouter>
        {this.handleSignInWindow()}
        {this.handleSignUpWindow()}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    searchBackground: state.favorite.searchBackground
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateBackImageSrc: () => {
      return dispatch(updateBackgroundImageAction());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
