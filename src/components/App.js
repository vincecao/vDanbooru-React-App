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

export default class extends Component {
  state = {
    link: 'https://safebooru.org/images/2814/a7086f8e1beccf6a9a77a5d92abd132e1dcf90ce.jpg'
  }
  divStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  }
  
  render() {
    return (
      <div style={this.divStyle}>

        <Navbar>
          <Navbar.Group align={Alignment.LEFT}>
            <Button className="bp3-minimal" icon="home" text="vDanbooru" />
            <Navbar.Divider />
            <Button className="bp3-minimal" icon="document" text="Hots" />
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

        <Search background={this.state.link} style={this.searchStyle} />
        
        <Card elevation={Elevation.TWO}>
          <p>vDanbooru @ Vince</p>
        </Card>

      </div>
    )
  }

}
