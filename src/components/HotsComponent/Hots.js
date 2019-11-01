import React from "react";
import axios from "axios";
import { EditableText, H1, Tooltip, NonIdealState } from "@blueprintjs/core";
import Gallery from "react-grid-gallery";
import { DEFAULTLST, DOMAIN } from "../res/defaultLst";
import { connect } from "react-redux";
import { deleteSingleAction } from '../../actions/deleteSingleAction.js'
import { addFavAction } from '../../actions/addFavAction.js'
import { replaceAllAction } from '../../actions/replaceAllAction.js'

import firebase from '../../config/fbConfig';

class Hots extends React.Component {

  state = {
    keywords:
      !this.props.match.params.key || this.props.match.params.key === ""
        ? DEFAULTLST[Math.floor(Math.random() * DEFAULTLST.length)]
        : this.props.match.params.key,
    placeholder: "",
    confirmOnEnterKey: true,
    intent: "none",
    maxLength: 20,
    selectAllOnFocus: true
  };

  constructor(props) {
    super(props);
    this.onSelectImage = this.onSelectImage.bind(this);
  }

  componentDidMount() {
    this.updateSearch();
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
      if (this.props.photos.length === 0) {
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
          />
        );
      }
    }
  };

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
      let url = DOMAIN + "/api/mode/Normal/tag/" + key + "/num/25";
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