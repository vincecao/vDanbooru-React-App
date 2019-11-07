import React, { Fragment } from "react";
import { EditableText, H1, Tooltip, NonIdealState, Position, Intent, Toaster } from "@blueprintjs/core";
import Gallery from "react-grid-gallery";
import { DEFAULTLST } from "../res/env";
import { connect } from "react-redux";
import { deleteSingleAction } from '../../actions/deleteSingleAction.js'
import { addFavAction } from '../../actions/addFavAction.js'
import { replaceAllAction } from '../../actions/replaceAllAction.js'
import { updatePhotoAction } from '../../actions/updatePhotoAction'

import firebase from '../../config/fbConfig';
import './Hots.css'

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
  fontFamily: 'Staatliches, cursive'
}
class Hots extends React.Component {

  constructor(props) {
    super(props);
    this.onSelectImage = this.onSelectImage.bind(this);
    this.state = {
      keywords:
        !this.props.match.params.key || this.props.match.params.key === ""
          ? DEFAULTLST[Math.floor(Math.random() * DEFAULTLST.length)]
          : this.props.match.params.key,
      placeholder: "",
      confirmOnEnterKey: true,
      intent: "none",
      maxLength: 20,
      selectAllOnFocus: true,
      showIndicate: true
    };
  }

  componentDidMount() {
    try {
      this.updateSearch(this.state.keywords);
      setInterval(() => {
        this.setState({
          showIndicate: !this.state.showIndicate
        })
      }, 1000)
      this.props.checkIsInHot()
      this.props.mountOnSearch(this.updateSearch)
    } catch{ }

  }

  updateSearch = (keywords) => {
    if (keywords) {
      this.props.updatePhotos(keywords);

      let tempPlaceholder = keywords;
      let placeholder =
        tempPlaceholder.charAt(0).toUpperCase() + tempPlaceholder.slice(1);
      this.setState({ keywords: "", placeholder });
    }else{
      this.props.updatePhotos(-1);
      this.setState({ keywords: "", placeholder: ''});
    }

  };

  handleReportChange = keywords => {
    this.setState({ keywords });
  };

  showIndicator = (flag) => {
    if (flag === true) {
      return <span style={{ opacity: 1 }}>:</span>
    } else {
      return <span style={{ opacity: 0 }}>:</span>
    }
  }

  handleResult = () => {
    if (this.props.isLoad === true) {
      return (
        <div
          style={{
            height: "450px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div
            className="bp3-progress-bar bp3-intent-primary"
            style={{ width: "75%" }}
          >
            <div className="bp3-progress-meter" style={{ width: "50%" }} />
          </div>
        </div>
      );
    } else {
      //console.log(this.props.photos)
      if (this.props.photos === null || this.props.photos === undefined || this.props.photos.length === 0) {
        return (
          <div style={{ height: "450px" }}>
            <NonIdealState
              style={{ display: "block" }}
              icon="search"
              title="No search results"
              description="No result found, please try again!"
            />
          </div>
        );
      } else {
        return (
          <Gallery
            images={this.props.photos}
            backdropClosesModal={true}
            rowHeight={300}
            onSelectImage={this.onSelectImage}
            showLightboxThumbnails={true}
            tagStyle={tagStyle}
            lightboxWillOpen={this.handleLightboxWillOpen}
            lightboxWillClose={this.handleLightboxWillClose}
            currentImageWillChange={this.handleCurrentImageWillChange}
            enableKeyboardInput={true}
          />
        );
      }
    }
  };

  handleLightboxWillOpen = (event) => {
    this.props.openLightBox()
  }

  handleLightboxWillClose = () => {
    this.props.closeLightBox()
  }

  handleCurrentImageWillChange = (index, image) => {
    this.props.updateFocusImg(this.props.photos[index])
  }

  onSelectImage(index, image) {
    let photos = this.props.photos.slice();
    let img = photos[index];

    if (!img.isSelected) {
      //localStorage way
      //this.props.addFavs(img);

      //firebased profile way
      try {
        firebase.updateProfile({ favs: [...this.props.favs, img] })
        // this.props.replaceFavs([...this.props.favs, img])
        photos[index].isSelected = !photos[index].isSelected;
      } catch{
        this.addToast('please signin to save favorite')
      }


    } else {
      //localstrorage way
      //this.props.delFavs(img);

      //firebase way
      try {
        let favs = this.props.favs.filter(fav => img.src !== fav.src);
        // this.props.replaceFavs(favs)
        firebase.updateProfile({ favs: favs })
        photos[index].isSelected = !photos[index].isSelected;
      } catch{
        this.addToast('please signin to save favorite')
      }
    }

  }

  refHandlers = {
    toaster: (ref) => this.toaster = ref,
  };

  addToast = (msg) => {
    this.toaster.show({ intent: Intent.DANGER, message: msg });
  }

  render() {
    return (
      <Fragment>
        <Tooltip
          className="bp3-minimal"
          content="vDanbooru search is here !"
          position="right"
        >
          <H1 style={{ margin: "30px" }}>
            {this.showIndicator(this.state.showIndicate)}
            <EditableText
              intent={this.state.intent}
              maxLength={this.state.maxLength}
              placeholder={
                this.state.placeholder === ""
                  ? "Type something..."
                  : this.state.placeholder
              }
              selectAllOnFocus={this.state.selectAllOnFocus}
              onChange={this.handleReportChange}
              value={this.state.keywords
                .trim()
                .toLowerCase()
                .replace(" ", "")}
              confirmOnEnterKey={this.state.confirmOnEnterKey}
              onConfirm={() => this.updateSearch(this.state.keywords)}
            />
          </H1>
        </Tooltip>
        {this.handleResult()}
        <Toaster position={Position.TOP_RIGHT} ref={this.refHandlers.toaster} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    photos: state.favorite.photos,
    isLoad: state.favorite.isLoad,
    //favs: state.favorite.favs,
    focusingImgObject: state.favorite.focusingImgObject,

    favs: state.firebase.profile ? state.firebase.profile.favs : [],

    //firebase: state.firebase
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePhotos: (keyword) => dispatch(updatePhotoAction(keyword)),
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
    mountOnSearch: (onSearchInHot) => {
      return dispatch({ type: 'MOUNT_ON_SEARCH', onSearchInHot });
    },
    checkIsInHot: () => {
      return dispatch({ type: 'CHECK_IS_IN_HOT', isInHot: true });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hots);
