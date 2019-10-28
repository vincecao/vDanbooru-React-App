import React, { Component } from 'react'
import {
  Alignment,
  Button,
  Navbar,
  Card,
  Elevation
} from "@blueprintjs/core"
import './App.css'
import Search from './SearchComponent/Search'
import Hots from './HotsComponent/Hots'
import { BrowserRouter, Route, Redirect, Link } from 'react-router-dom'

export default class extends Component {
  state = {
    link: ''
  }
  divStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  }

  updateBackImageSrc = (src) => {
    this.setState({ link: src })
  }



  render() {
    return (
      <div style={this.divStyle}>
        <BrowserRouter basename={'/vdanbooru-react'}>
          <Navbar>
            <Navbar.Group align={Alignment.LEFT}>

              <Link to="/Search">
                <Button className="bp3-minimal" icon="home" text="vDanbooru" />
              </Link>
              <Navbar.Divider />
              <Link to="/Hots">
                <Button className="bp3-minimal" icon="document" text="Hots" />
              </Link>
              <Button className="bp3-minimal" icon="star" text="Favs" />
              <Button className="bp3-minimal" icon="inbox" text="About" />
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
              <Button className="bp3-minimal" icon="share" text="Share" />
              <Navbar.Divider />
              <Button className="bp3-minimal" icon="user" />
              <Button className="bp3-minimal" icon="notifications" />
              <Button className="bp3-minimal" icon="cog" />
            </Navbar.Group>
          </Navbar>

          {/* <Search />
          <Hots /> */}
          <Redirect from="/" to="/Search" />
          <Route path="/Search" component={Search} />
          <Route path="/Hots" component={Hots} />
          <Route path="/tags/:key" component={Hots} />

          <Card elevation={Elevation.TWO}>
            <p>vDanbooru @ Vince</p>
          </Card>
        </BrowserRouter>
      </div>
    )
  }

}
