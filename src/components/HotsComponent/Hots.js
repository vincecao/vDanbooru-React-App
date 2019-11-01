import React, { Fragment } from "react";
import { BrowserRouter, Route, Redirect, Link } from "react-router-dom";
import axios from "axios";
import { EditableText, H1, Tooltip, NonIdealState, PopoverInteractionKind, Popover, Menu, MenuItem, Position } from "@blueprintjs/core";
import Gallery from "react-grid-gallery";
import { DEFAULTLST, DOMAIN } from "../res/defaultLst";
import { connect } from "react-redux";
import { deleteSingleAction } from '../../actions/deleteSingleAction.js'
import { addFavAction } from '../../actions/addFavAction.js'
import { replaceAllAction } from '../../actions/replaceAllAction.js'

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
      isTagPanelOpen: false,
      focusingImgObject: {}
    };
  }

  componentDidMount() {
    try {
      this.updateSearch();
    } catch{ }

  }

  updateSearch = () => {
    this.props.updatePhotos(this.state.keywords);

    let tempPlaceholder = this.state.keywords;
    let placeholder =
      tempPlaceholder.charAt(0).toUpperCase() + tempPlaceholder.slice(1);
    this.setState({ keywords: "", placeholder });
  };

  handleReportChange = keywords => {
    this.setState({ keywords });
  };

  tagPanelMenu = () => {

    return <Menu className="bp3-minimal">
      {this.tagPanelMenuItem()}
    </Menu>
  }

  tagPanelMenuItem = () => {
    return (
      this.state.focusingImgObject.tags.map((tag, index) => {
        return <MenuItem key={index} text={tag.value} onClick={() => { this.setState({ keywords: tag.value, isTagPanelOpen: false }); this.props.updatePhotos(tag.value) }} />
      })
    )
  }

  tagPanel = () => {
    if (this.state.isTagPanelOpen) {
      return <div style={{ position: 'fixed', left: 100, top: 50, zIndex: 13 }}>
        <Popover
          content={this.tagPanelMenu()}
          interactionKind={PopoverInteractionKind.HOVER}
          position="bottom"
          style={{ position: 'fixed', left: 100, top: 100, zIndex: 13 }}
        >
          <div className="bp3-card bp3-interactive tagPoints-lg"></div>
        </Popover>
        {/* <Tooltip
          className="bp3-minimal"
          content="Favorite"
          position="right"
        >
          <div className="bp3-card bp3-interactive tagPoints-bookmark"></div>
        </Tooltip> */}

      </div>
    } else {
      return
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
          // customControls={[this.tagPanel()]}
          />
        );
      }
    }
  };

  // handleOnClickImage = (event) => {
  //   console.log('handleOnClickImage', event)
  // }

  handleLightboxWillOpen = (event) => {
    this.TagPanelPointsToogle(1)
    console.log('handleLightboxWillOpen', event)
  }

  handleLightboxWillClose = () => {
    this.TagPanelPointsToogle(0)
  }

  handleCurrentImageWillChange = (index, image) => {

    this.setState({
      focusingImgObject: this.props.photos[index]
    })
    console.log('focusingImgObject', this.state.focusingImgObject)
  }

  TagPanelPointsToogle = (index) => {
    if (index === 0) {
      this.setState({
        isTagPanelOpen: false
      })
    } else {
      this.setState({
        isTagPanelOpen: true
      })
    }
    // let temp = !this.state.isTagPanelOpen
    // this.setState({
    //   isTagPanelOpen: temp
    // })
  }

  updateTagPanel = (imgObject) => {

  }

  handleOnClick = (index, image) => {
    console.log('handleOnClick', index, image)
  };

  // myTileViewportStyleFn.call(this);
  onSelectImage(index, image) {
    let photos = this.props.photos.slice();
    let img = photos[index];

    if (!img.isSelected) {
      //localStorage way
      //this.props.addFavs(img);

      //firebased profile way
      firebase.updateProfile({ favs: [...this.props.favs, img] })
      this.props.replaceFavs([...this.props.favs, img])


    } else {
      //localstrorage way
      //this.props.delFavs(img);

      //firebase way
      let favs = this.props.favs.filter(fav => img.src !== fav.src);
      this.props.replaceFavs(favs)
      firebase.updateProfile({ favs: favs })

    }
    //console.log(this.props.favs)
    photos[index].isSelected = !photos[index].isSelected;
  }

  render() {
    return (
      <div>
        {this.tagPanel()}
        <Tooltip
          className="bp3-minimal"
          content="vDanbooru search is here !"
          position="right"
        >
          <H1 style={{ margin: "30px" }}>
            <EditableText
              intent={this.state.intent}
              maxLength={this.state.maxLength}
              placeholder={
                this.state.placeholder === ""
                  ? "Type something interested"
                  : this.state.placeholder
              }
              selectAllOnFocus={this.state.selectAllOnFocus}
              onChange={this.handleReportChange}
              value={this.state.keywords
                .trim()
                .toLowerCase()
                .replace(" ", "")}
              confirmOnEnterKey={this.state.confirmOnEnterKey}
              onConfirm={() => this.updateSearch()}
            />
          </H1>
        </Tooltip>
        {this.handleResult()}

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    photos: state.favorite.photos,
    isLoad: state.favorite.isLoad,
    //favs: state.favorite.favs,

    favs: state.firebase.profile.favs,
    //firebase: state.firebase
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePhotos: key => {
      dispatch({ type: "UPDATE_PHOTOS" });
      let url = DOMAIN + "/api/mode/Normal/tag/" + key + "/num/15";
      // console.log(url)
      axios
        .get(url)
        .then(res => {
          const photos = res.data;
          dispatch({ type: "UPDATE_PHOTOS_SUCCESS", key, photos });
        })
        .catch(err => {
          dispatch({ type: "UPDATE_PHOTOS_SUCCESS", key, photos: [] });
        });
    },
    replaceFavs: (favs) => dispatch(replaceAllAction(favs)),
    addFavs: (imgObj) => dispatch(addFavAction(imgObj)),
    delFavs: (imgObj) => dispatch(deleteSingleAction(imgObj))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hots);