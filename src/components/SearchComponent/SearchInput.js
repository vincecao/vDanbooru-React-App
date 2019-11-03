import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import Hots from "../HotsComponent/Hots";
import { DEFAULTLST } from "../res/defaultRes";

const searchStyle = {
  maxWidth: "1000px",
  width: "65%",
  margin: "0 auto"
};

export default class SearchInput extends Component {
  state = {
    value: ""
  };
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
          required
        />
        <Link
          className="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right"
          to={
            "/tags/" +
            (this.state.value.toString() === ""
              ? DEFAULTLST[Math.floor(Math.random() * DEFAULTLST.length)]
              : this.state.value.toString())
          }
        />
        <Route path="/tags/:key" component={Hots} />
      </div>
    );
  }
}
