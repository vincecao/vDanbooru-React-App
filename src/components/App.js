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
import { updateBackgroundImageAction } from "../actions/updateBackgroundImageAction"
import { tagPanel } from './layout/tagPanel'
import { DOMAIN } from "./res/env";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { link: "", isOpen: true };

  }

  shareMenuUrl = "http:" + DOMAIN + "/vdanbooru-react"

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
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }}>
        <BrowserRouter basename={"/vdanbooru-react"}>
          <MyNavbar searchBackground={this.props.searchBackground} isLightBoxOpen={this.props.isLightBoxOpen} />


          <Redirect from="/" to="/Search" />
          <Route path="/Search" component={Search} />

          {tagPanel(
            this.props.isLightBoxOpen,
            this.props.isInHotPage,
            this.shareMenuUrl,
            {
              img: this.props.focusingImgObject.src,
              caption: this.props.focusingImgObject.caption
            },
            this.props
          )}

          <div style={{ filter: (this.props.isLightBoxOpen) ? 'blur(0.5rem) saturate(200%)' : 'none' }}>
            <Route path="/Hots" component={Hots} />
            <Route path="/Favs" component={Favs} />
            <Route path="/tags/:key" component={Hots} />
            <Redirect to="/Search" />
          </div>
          <MyFooter handleSwitch={this.handleSwitch} isLightBoxOpen={this.props.isLightBoxOpen} />
        </BrowserRouter>
        {this.handleSignInWindow()}
        {this.handleSignUpWindow()}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    searchBackground: state.favorite.searchBackground,
    blurEffect: state.favorite.blurEffect,
    focusingImgObject: state.favorite.focusingImgObject,
    isLightBoxOpen: state.favorite.isLightBoxOpen,
    isInHotPage: state.favorite.isInHotPage,
    onSearchInHot: state.favorite.onSearchInHot
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateBackImageSrc: () => {
      return dispatch(updateBackgroundImageAction());
    },
    closeLightBox: () => {
      return dispatch({ type: 'CLOSE_LIGHT_BOX' });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
