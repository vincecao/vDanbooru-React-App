import React, { Component } from "react";
import { withRouter, Route, Link } from "react-router-dom";
import Hots from "../HotsComponent/Hots";
import { DEFAULTLST } from "../res/env";

const searchStyle = {
  maxWidth: "1000px",
  width: "65%",
  margin: "0 auto"
};

class SearchInput extends Component {
  state = {
    value: ""
  };

  handleComfirm = () => {
    return '/tags/' +
      (this.state.value.toString() === ""
        ? DEFAULTLST[Math.floor(Math.random() * DEFAULTLST.length)]
        : this.state.value.toString())
  }
  render() {
    return (
      <div className="bp3-input-group bp3-large" style={searchStyle}>
        <span className="bp3-icon bp3-icon-search" />
        <input
          type="text"
          className="bp3-input"
          placeholder="Search"
          onChange={e => {
            this.setState({ value: e.currentTarget.value });
          }}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              return this.props.history.push(this.handleComfirm())
            }
          }}
        />
        <Link
          className="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right"
          to={this.handleComfirm()}
        />
        <Route path="/tags/:key" component={Hots} />
      </div>
    );
  }
}

export default withRouter(SearchInput)