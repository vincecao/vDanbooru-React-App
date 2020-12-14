import React from 'react';
import { NonIdealState, Position, Intent, Toaster } from '@blueprintjs/core';
// import Gallery from 'react-grid-gallery';
import { connect } from 'react-redux';

import firebase from '../../const/fbConfig';
import 'firebase/auth';
import 'firebase/firestore';
import HotsSearchInput from './HotsSearchInput';
import Gallery from '../gallery/Gallery';

const tagStyle = {
  display: 'inline',
  padding: '0 3px',
  fontSize: '90%',
  lineHeight: '1.15',
  color: 'white',
  background: 'rgba(0, 0, 0, 0.65)',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  verticalAlign: 'baseline',
  borderRadius: '0.4em',
  fontFamily: 'Staatliches, cursive',
};

class Hots extends React.Component {
  constructor(props) {
    super(props);
    this.onSelectImage = this.onSelectImage.bind(this);
    this.props.updateCurrentPage('hots');
  }

  handleLightboxWillOpen = (event) => {
    this.props.openLightBox();
  };

  handleLightboxWillClose = () => {
    this.props.closeLightBox();
  };

  handleCurrentImageWillChange = (index, image) => {
    this.props.updateFocusImg(this.props.photos[index]);
  };

  onSelectImage(index, image) {
    let photos = this.props.photos.slice();
    let img = photos[index];

    if (!img.isSelected) {
      //localStorage way
      //this.props.addFavs(img);

      //firebased profile way
      try {
        firebase.updateProfile({ favs: [...this.props.favs, img] });
        // this.props.replaceFavs([...this.props.favs, img])
        photos[index].isSelected = !photos[index].isSelected;
      } catch {
        this.addToast('please signin to save favorite');
      }
    } else {
      //localstrorage way
      //this.props.delFavs(img);

      //firebase way
      try {
        let favs = this.props.favs.filter((fav) => img.src !== fav.src);
        // this.props.replaceFavs(favs)
        firebase.updateProfile({ favs: favs });
        photos[index].isSelected = !photos[index].isSelected;
      } catch {
        this.addToast('please signin to save favorite');
      }
    }
  }

  refHandlers = {
    toaster: (ref) => (this.toaster = ref),
  };

  addToast = (msg) => {
    this.toaster.show({ intent: Intent.DANGER, message: msg });
  };

  render() {
    const { isLoad, photos } = this.props;
    return (
      <div className="flex-1">
        <HotsSearchInput />
        <div className="w-full flex justify-center items-center py-10">
          {isLoad ? (
            <div className="bp3-progress-bar bp3-intent-primary w-3/4">
              <div className="bp3-progress-meter w-1/2" />
            </div>
          ) : !photos || photos.length === 0 ? (
            <NonIdealState
              className="m-auto"
              icon="search"
              title="No search results"
              description="No result found, please try again!"
            />
          ) : (
            <div className="min-h-64">
              <Gallery photos={photos} />
              {/* <Gallery
                images={}
                backdropClosesModal={true}
                rowHeight={300}
                onSelectImage={this.onSelectImage}
                showLightboxThumbnails={true}
                tagStyle={tagStyle}
                lightboxWillOpen={this.handleLightboxWillOpen}
                lightboxWillClose={this.handleLightboxWillClose}
                currentImageWillChange={this.handleCurrentImageWillChange}
                enableKeyboardInput={true}
              /> */}
            </div>
          )}
          <Toaster position={Position.TOP_RIGHT} ref={this.refHandlers.toaster} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    photos: state.favorite.photos,
    isLoad: state.favorite.isLoad,
    currentPage: state.favorite.currentPage,

    //favs: state.favorite.favs,
    focusingImgObject: state.favorite.focusingImgObject,

    favs: state.firebase.profile ? state.firebase.profile.favs : [],
    //firebase: state.firebase
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // updatePhotos: (keyword) => dispatch(updatePhotoAction(keyword)),
    // replaceFavs: (favs) => dispatch(replaceAllAction(favs)),
    // addFavs: (imgObj) => dispatch(addFavAction(imgObj)),
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
    // mountOnSearch: (onSearchInHot) => {
    //   return dispatch({ type: 'MOUNT_ON_SEARCH', onSearchInHot });
    // },
    updateCurrentPage: (currentPage) => {
      return dispatch({ type: 'UPDATE_CURRENT_PAGE', currentPage });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hots);
