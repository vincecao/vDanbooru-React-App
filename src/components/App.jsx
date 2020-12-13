import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { updateBackgroundImageAction } from '../actions/updateBackgroundImageAction';
import MyNavbar from './layout/MyNavbar';
import MyFooter from './layout/MyFooter';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Search from './SearchComponent/Search';
import Hots from './HotsComponent/Hots';
import Favs from './FavComponent/Favs';
import TagPanel from './layout/TagPanel';

const ROUTER_BASENAME = process.env.REACT_APP_ROUTER_BASENAME || '/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { link: '', isOpen: true };
  }

  handleSignInWindow = () => {
    return <SignIn />;
  };

  handleSignUpWindow = () => {
    return <SignUp />;
  };

  handleSwitch = () => this.props.updateBackImageSrc();

  render() {
    const { focusingImgObject = {}, searchBackground = '', isLightBoxOpen = false, currentPage = '' } =
      this.props || {};
    return (
      <div className="flex flex-col h-screen">
        <BrowserRouter basename={ROUTER_BASENAME}>
          <MyNavbar searchBackground={searchBackground} isLightBoxOpen={isLightBoxOpen} />

          <Route path="/Search" component={Search} />

          <TagPanel
            isTagPanelOpen={isLightBoxOpen}
            isInHots={currentPage === 'hots'}
            shareMenuUrl={window.location.href}
            shareMenuItem={{
              img: focusingImgObject.src || '',
              caption: focusingImgObject.caption || '',
            }}
            parentProps={this.props}
          />

          <div
            style={{
              filter: isLightBoxOpen ? 'blur(0.5rem) saturate(200%)' : 'none',
            }}
          >
            <Route path="/Hots" component={Hots} />
            <Route path="/Favs" component={Favs} />
            <Route path="/tags/:key" component={Hots} />
            <Redirect to="/Search" />
          </div>
          <MyFooter
            currentPage={currentPage}
            handleSwitch={this.handleSwitch}
            isLightBoxOpen={isLightBoxOpen}
            searchBackground={searchBackground}
          />
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
    onSearchInHot: state.favorite.onSearchInHot,
    currentPage: state.favorite.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateBackImageSrc: () => dispatch(updateBackgroundImageAction()),
    closeLightBox: () => dispatch({ type: 'CLOSE_LIGHT_BOX' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
