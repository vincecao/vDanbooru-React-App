import React, { Component, Fragment } from 'react';
import { H1, NonIdealState, Classes, Overlay, Button, Intent, Position, Toaster } from '@blueprintjs/core';
import Gallery from 'react-grid-gallery';
import { connect } from 'react-redux';
import classNames from 'classnames';
import firebase from '../../const/fbConfig';
import 'firebase/auth';
import 'firebase/firestore';

import { isEmpty } from 'react-redux-firebase';

const OVERLAY_EXAMPLE_CLASS = 'docs-overlay-example-transition';
const auth = firebase.auth();

class Favs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOneOverLayOpen: false,
      isAllOverLayOpen: false,
      index: -100,
    };
    this.props.updateCurrentPage('favs');
  }

  classes = classNames(Classes.CARD, Classes.ELEVATION_4, OVERLAY_EXAMPLE_CLASS);

  handleOneOpen = (index, image) => this.setState({ isOneOverLayOpen: true, index });
  handleOneClose = () => this.setState({ isOneOverLayOpen: false, index: -100 });
  handleAllOpen = (index, image) => this.setState({ isAllOverLayOpen: true });
  handleAllClose = () => this.setState({ isAllOverLayOpen: false, index: -100 });
  deleteOneFav = () => {
    //localStorage way
    //this.props.delFavs(this.props.favs[this.state.index]);

    //firebase profile way
    let img = this.props.favs[this.state.index];
    let favs = this.props.favs.filter((fav) => img.src !== fav.src);
    firebase.updateProfile({ favs: favs });
    this.setState({ isOneOverLayOpen: false, index: -100 });
    this.addToast(Intent.default, 'Remove one successfully');
  };

  deleteAllFav = () => {
    //localStorage way
    //this.props.delFavs(this.props.favs[this.state.index]);

    //firebase profile way
    firebase.updateProfile({ favs: [] });
    this.setState({ isAllOverLayOpen: false, index: -100 });
    this.addToast(Intent.default, 'Remove All Favorite');
  };

  OpenDeleteOneOverLay = () => (
    <Overlay key={2} onClose={this.handleOneClose} className="center" isOpen={this.state.isOneOverLayOpen}>
      <div className={this.classes} style={{ width: '380px' }}>
        <p>{'Delete this one? / これを削除しますか？'}</p>
        <div className={Classes.DIALOG_FOOTER_ACTIONS} style={{ marginTop: 30 }}>
          <Button intent={Intent.DANGER} onClick={this.handleOneClose} style={{ marginRight: 10 }}>
            Close
          </Button>
          <Button onClick={this.deleteOneFav} text="Confirm" />
        </div>
      </div>
    </Overlay>
  );

  OpenDeleteAllOverLay = () => (
    <Overlay key={1} onClose={this.handleAllClose} className="center" isOpen={this.state.isAllOverLayOpen}>
      <div className={this.classes} style={{ width: '380px' }}>
        <p>Are you sure to delete all? / すべて削除してもよろしいですか？</p>
        <div className={Classes.DIALOG_FOOTER_ACTIONS} style={{ marginTop: 30 }}>
          <Button intent={Intent.DANGER} onClick={this.handleAllClose} style={{ marginRight: 10 }} text="Close" />

          <Button onClick={this.deleteAllFav} text="Confirm" />
        </div>
      </div>
    </Overlay>
  );

  Favs = () =>
    isEmpty(auth) || this.props.favs === null || this.props.favs === undefined ? (
      <div style={{ height: '450px' }}>
        <NonIdealState
          style={{ display: 'block' }}
          icon="log-in"
          title="Haven't Log in"
          description="Please signup & login for access the favorite!"
        />
      </div>
    ) : this.props.favs.length === 0 ? (
      <div style={{ height: '450px' }}>
        <NonIdealState
          style={{ display: 'block' }}
          icon="star"
          title="No favorite"
          description="No record found, please add some!"
        />
      </div>
    ) : (
      <Gallery
        images={this.props.favs}
        backdropClosesModal={true}
        rowHeight={400}
        onSelectImage={this.handleOneOpen}
        showLightboxThumbnails={true}
        tagStyle={{ display: 'none' }}
        lightboxWillOpen={this.handleLightboxWillOpen}
        lightboxWillClose={this.handleLightboxWillClose}
        currentImageWillChange={this.handleCurrentImageWillChange}
        enableKeyboardInput={true}
      />
    );

  ResetBtn = () =>
    !isEmpty(auth) && this.props.favs !== null && this.props.favs !== undefined && this.props.favs.length > 0 ? (
      <Button
        onClick={this.handleAllOpen}
        style={{
          margin: '',
          height: '30px',
          width: '50px',
          marginRight: '20px',
        }}
        text="Reset"
      />
    ) : (
      <></>
    );

  refHandlers = {
    toaster: (ref) => (this.toaster = ref),
  };

  addToast = (intent, message) => {
    this.toaster.show({ intent, message });
  };

  //tag panel
  handleLightboxWillOpen = (event) => {
    this.props.openLightBox();
  };

  handleLightboxWillClose = () => {
    this.props.closeLightBox();
  };

  handleCurrentImageWillChange = (index, image) => {
    this.props.updateFocusImg(this.props.favs[index]);
  };

  render() {
    return (
      <Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <H1 style={{ margin: '30px' }}>{'Favorites / 気に入り'}</H1>
          <this.ResetBtn />
        </div>

        <this.Favs />
        <this.OpenDeleteOneOverLay />
        <this.OpenDeleteAllOverLay />
        <Toaster position={Position.TOP_RIGHT} ref={this.refHandlers.toaster} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentPage: state.favorite.currentPage,
    favs: state.firebase.profile.favs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // replaceFavs: (favs) => dispatch(replaceAllAction(favs)),
    // delFavs: (imgObj) => dispatch(deleteSingleAction(imgObj)),
    closeLightBox: () => {
      return dispatch({ type: 'CLOSE_LIGHT_BOX' });
    },
    openLightBox: () => {
      return dispatch({ type: 'OPEN_LIGHT_BOX' });
    },
    updateFocusImg: (focusingImgObject) => {
      return dispatch({ type: 'UPDATE_FOCUS_IMG', focusingImgObject });
    },
    updateCurrentPage: (currentPage) => {
      return dispatch({ type: 'UPDATE_CURRENT_PAGE', currentPage });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favs);
