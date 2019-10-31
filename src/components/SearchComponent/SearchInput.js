import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Link } from 'react-router-dom'
import Hots from '../HotsComponent/Hots'
import { defultLst } from '../res/randomDefaultLst'


const searchStyle = {
  maxWidth: '1000px',
  width: '65%',
  margin: '0 auto'
}

export default class SearchInput extends Component {
  state = {
    value: ''
  }
  render() {
    return <div className="bp3-input-group bp3-large" style={searchStyle}>
      <span className="bp3-icon bp3-icon-search"></span>
      <input type="text" className="bp3-input" placeholder="Search" onChange={(e) => { this.setState({ value: e.currentTarget.value }) }} required />
      <Link className="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right" to={'/tags/' + (this.state.value.toString() === '' ? defultLst[Math.floor(Math.random() * defultLst.length)] : this.state.value.toString())}></Link>
      <Route path="/tags/:key" component={Hots} />
    </div >
  }
}
