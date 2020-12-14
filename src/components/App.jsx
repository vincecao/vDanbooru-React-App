import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { updateBackgroundImageAction } from '../actions/updateBackgroundImageAction';
import Nav from './layout/nav/Nav';
import Footer from './layout/footer/Footer';
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

  handleSwitch = () => this.props.updateBackImageSrc();

  render() {
    const { focusingImgObject = {}, searchBackground = '', isLightBoxOpen = false, currentPage = '' } =
      this.props || {};
    return (
      <div className="flex flex-col min-h-screen">
        <BrowserRouter basename={ROUTER_BASENAME}>
          <Nav searchBackground={searchBackground} isLightBoxOpen={isLightBoxOpen} />
          <Route path="/Search" component={Search} />
          <div className={`${isLightBoxOpen ? 'filter-blur' : 'filter-none'}`}>
            <Route path="/Hots" component={Hots} />
            <Route path="/Favs" component={Favs} />
            <Route path="/tags/:key" component={Hots} />
            <Redirect to="/Search" />
          </div>
          <Footer
            currentPage={currentPage}
            handleSwitch={this.handleSwitch}
            isLightBoxOpen={isLightBoxOpen}
            searchBackground={searchBackground}
          />
        </BrowserRouter>
        <SignIn />
        <SignUp />
        {isLightBoxOpen && (
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
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  searchBackground: state.favorite.searchBackground,
  blurEffect: state.favorite.blurEffect,
  focusingImgObject: state.favorite.focusingImgObject,
  isLightBoxOpen: state.favorite.isLightBoxOpen,
  onSearchInHot: state.favorite.onSearchInHot,
  currentPage: state.favorite.currentPage,
});

const mapDispatchToProps = (dispatch) => ({
  updateBackImageSrc: () => dispatch(updateBackgroundImageAction()),
  closeLightBox: () => dispatch({ type: 'CLOSE_LIGHT_BOX' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
