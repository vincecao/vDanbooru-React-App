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
    this.props.delFavs(this.props.favs[this.state.index]);
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
        {/* <div style={{flex: '1'}}></div> */}
      </Overlay>
    );
  };

  handleRenderFavs = () => {
    if (this.props.favs === null || this.props.favs.length === 0) {
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
        <H1 style={{ margin: "30px" }}>Favorites / 気に入り</H1>
        {this.handleRenderFavs()}
        {this.openOverLay()}
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    favs: state.favs
  };
};
const mapDispatchToProps = dispatch => {
  return {
    delFavs: imgObj => {
      dispatch({ type: "DELETE_FAVS", imgObj });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favs);
