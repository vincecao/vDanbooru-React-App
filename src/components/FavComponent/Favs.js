import React, { Component, Fragment } from "react";
import {
  H1,
  NonIdealState,
  Classes,
  Overlay,
  Button,
  Intent
} from "@blueprintjs/core";
import Gallery from "react-grid-gallery";
import { connect } from "react-redux";
import "./Favs.css";
import classNames from "classnames";
import { deleteSingleAction } from '../../actions/deleteSingleAction.js'
import { deleteAllAction } from '../../actions/deleteAllAction.js'
import { replaceAllAction } from '../../actions/replaceAllAction.js'
import firebase from '../../config/fbConfig';
import { auth } from "firebase";
import { isLoaded, isEmpty } from 'react-redux-firebase'

const OVERLAY_EXAMPLE_CLASS = "docs-overlay-example-transition";

class Favs extends Component {

  state = {
    isOpen: false,
    index: -1
  };
  classes = classNames(
    Classes.CARD,
    Classes.ELEVATION_4,
    OVERLAY_EXAMPLE_CLASS
  );
  handleOpen = (index, image) => this.setState({ isOpen: true, index });
  handleClose = () => this.setState({ isOpen: false, index: -1 });
  deleteFav = () => {
    //localStorage way
    //this.props.delFavs(this.props.favs[this.state.index]);

    //firebase profile way
    let img = this.props.favs[this.state.index]
    let favs = this.props.favs.filter(fav => img.src !== fav.src);
    this.props.replaceFavs(favs)
    firebase.updateProfile({ favs: favs })

    this.setState({ isOpen: false, index: -1 });
  };

  openOverLay = () => {
    return (
      <Overlay onClose={this.handleClose} className="center" {...this.state}>
        <div className={this.classes} style={{ width: "380px" }}>
          <p>Are you sure to delete / 削除してもよろしいですか</p>

          <div
            className={Classes.DIALOG_FOOTER_ACTIONS}
            style={{ marginTop: "30px" }}
          >
            <Button
              intent={Intent.DANGER}
              onClick={this.handleClose}
              style={{ marginRight: "10px" }}
            >
              Close
            </Button>
            <Button onClick={this.deleteFav} style={{ margin: "" }}>
              Comfirm
            </Button>
          </div>
        </div>
      </Overlay>
    );
  };

  handleRenderFavs = () => {
    if (isEmpty(auth) || this.props.favs === null || this.props.favs === undefined) {
      return <div style={{ height: "450px" }}>
        <NonIdealState
          style={{ display: "block" }}
          icon="log-in"
          title="Haven't Log in"
          description="Please signup & login for access the favorite!"
        />
      </div>
    }
    if (this.props.favs.length === 0) {
      return (
        <div style={{ height: "450px" }}>
          <NonIdealState
            style={{ display: "block" }}
            icon="star"
            title="No favorite"
            description="No record found, please add some!"
          />
        </div>
      );
    } else {
      return (
        <Gallery
          images={this.props.favs}
          backdropClosesModal={true}
          rowHeight={300}
          onSelectImage={this.handleOpen}
          showLightboxThumbnails={true}
        />
      );
    }
  };
  render() {
    return (
      <Fragment>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <H1 style={{ margin: "30px" }}>Favorites / 気に入り</H1>
          <Button

            onClick={() => {
              localStorage.setItem('vDanbooru-fav', "[]");
              //localStorage way
              //this.props.delAllFavs()

              //firebase profile way

              firebase.updateProfile({ favs: [] })
              this.props.replaceFavs([])
            }}

            style={{ margin: "", height: '30px', width: '50px', marginRight: '20px' }}> Reset </Button>
        </div>

        {this.handleRenderFavs()}
        {this.openOverLay()}

      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {
    favs: state.firebase.profile.favs,
    stateFavs: state.favs
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    replaceFavs: (favs) => dispatch(replaceAllAction(favs)),
    delFavs: (imgObj) => dispatch(deleteSingleAction(imgObj)),
    delAllFavs: () => dispatch(deleteAllAction())
  };
};
export default
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Favs);