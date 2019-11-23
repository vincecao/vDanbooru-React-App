import React from "react";
import SearchInput from "./SearchInput";
import { connect } from "react-redux";
import { updateBackgroundImageAction } from '../../actions/updateBackgroundImageAction'

const contentStyle = {
  flex: 1,
  position: "relative",
  width: "100%",
  overflow: "hidden"
};

const bg = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: "0",
  left: "0",
  backgroundPosition: "top",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  overflow: "hidden",
  filter: "blur(8px)"
};

const fg = {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  top: "0",
  left: "0"
};

const fgImage = {
  width: "auto",
  height: "100%"
};

const searchLayer = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  top: "0",
  left: "0"
};

const searchH1 = {
  fontFamily: '"Oswald", "sans-serif"',
  fontWeight: "bold",
  fontSize: "2.7em",
  color: "white",
  textAlign: "center",
  textShadow:
    "0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 6px 1px rgba(0, 0, 0, .6), 0 0 5px rgba(0, 0, 0, .6)"
};


class Search extends React.Component {


  constructor(props) {
    super(props)
    if (this.props.searchBackground === null) {
      this.updateBackground()
    }
    this.props.updateCurrentPage('search')

  }

  updateBackground() {
    return new Promise(resolve => {
      this.props.updateBackImageSrc()
      resolve(this.props.searchBackground)
    })
  }

  render() {

    const backgroundImage = { backgroundImage: "linear-gradient(to bottom, rgba(247, 247, 247, 0.52), rgba(62, 57, 61, 0.73)), url(" + this.props.searchBackground + ")" }

    return (
      <div style={contentStyle}>
        {/* <div style={[bg, { backgroundImage }]} /> */}
        <div style={{ ...bg, ...backgroundImage }} />
        <div style={fg}>
          <img src={this.props.searchBackground} style={fgImage} alt="" />
        </div>
        <div style={searchLayer}>
          <h1 style={searchH1}>vDanbooru Search</h1>
          <SearchInput />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    searchBackground: state.favorite.searchBackground,
    currentPage: state.favorite.currentPage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateBackImageSrc: () => {
      return dispatch(updateBackgroundImageAction());
    },
    updateCurrentPage: (currentPage) => {
      return dispatch({ type: 'UPDATE_CURRENT_PAGE', currentPage });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
