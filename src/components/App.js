import React, { Component } from 'react'
import { Alignment, Button, Navbar, Card, Elevation, Menu, MenuItem, Popover, PopoverInteractionKind } from "@blueprintjs/core"
import './App.css'
import Search from './SearchComponent/Search'
import Hots from './HotsComponent/Hots'
import { BrowserRouter, Route, Redirect, Link } from 'react-router-dom'
import { FacebookIcon, TwitterIcon, TelegramIcon, PinterestIcon, RedditIcon, TumblrIcon, LineIcon } from 'react-share';
import { FacebookShareButton, TwitterShareButton, TelegramShareButton, PinterestShareButton, RedditShareButton, TumblrShareButton, LineShareButton } from 'react-share';
import { connect } from 'react-redux'

class App extends Component {

  divStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  }

  constructor(props) {
    super(props);
    this.state = { link: '' };
  }

  shareMenu = () => {
    return <Menu className="bp3-minimal">
      <TwitterShareButton url="http://vince-amazing.us-west-1.elasticbeanstalk.com/vdanbooru-react" children={<MenuItem text="Twitter" icon={<TwitterIcon size={24} round={false} />} />} />
      <FacebookShareButton url="http://vince-amazing.us-west-1.elasticbeanstalk.com/vdanbooru-react" children={<MenuItem text="Facebook" icon={<FacebookIcon size={24} round={false} />} />} />
      <PinterestShareButton media={this.props.searchBackground} url="http://vince-amazing.us-west-1.elasticbeanstalk.com/vdanbooru-react" children={<MenuItem text="Pinterest" icon={<PinterestIcon size={24} round={false} />} />} />
      <TumblrShareButton url="http://vince-amazing.us-west-1.elasticbeanstalk.com/vdanbooru-react" children={<MenuItem text="Tumblr" icon={<TumblrIcon size={24} round={false} />} />} />
      <RedditShareButton url="http://vince-amazing.us-west-1.elasticbeanstalk.com/vdanbooru-react" children={<MenuItem text="Reddit" icon={<RedditIcon size={24} round={false} />} />} />
      <LineShareButton url="http://vince-amazing.us-west-1.elasticbeanstalk.com/vdanbooru-react" children={<MenuItem text="Line" icon={<LineIcon size={24} round={false} />} />} />
      <TelegramShareButton url="http://vince-amazing.us-west-1.elasticbeanstalk.com/vdanbooru-react" children={<MenuItem text="Telegram" icon={<TelegramIcon size={24} round={false} />} />} />
      {/* <MenuDivider /> */}
    </Menu>
  }

  aboutMenu = () => {
    return <Menu className="bp3-minimal">
      <a href="//github.com/vincecao/vdanbooru-react-app" target="_blank" rel="noopener noreferrer"><MenuItem text="Github" icon="paragraph" /></a>
      <a href="//vince-amazing.com" target="_blank" rel="noopener noreferrer"><MenuItem text="Me!!" icon="mugshot" /></a>
    </Menu>
  }

  underDevText = 'Vince is still developing very hard!!'

  render() {
    return (
      <div style={this.divStyle}>
        <BrowserRouter basename={'/vdanbooru-react'}>
          <Navbar style={{ opacity: 0.8 }}>
            <Navbar.Group align={Alignment.LEFT}>

              <Link to="/Search">
                <Button className="bp3-minimal" icon="home" text="vDanbooru" />
              </Link>
              <Navbar.Divider />
              <Link to="/Hots">
                <Button className="bp3-minimal" icon="heatmap"><a className="desktop-navbar-txt">Hots</a></Button>

              </Link>

              <Button className="bp3-minimal" icon="star" disabled><a className="desktop-navbar-txt">Favs</a></Button>
              <Popover content={this.aboutMenu()} interactionKind={PopoverInteractionKind.HOVER}>
                <Button className="bp3-minimal" icon="inbox"><a className="desktop-navbar-txt">About</a></Button>
              </Popover>
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
              <Popover content={this.shareMenu()} interactionKind={PopoverInteractionKind.HOVER}>
                <Button className="bp3-minimal" rightIcon="caret-down" icon="share"><a className="desktop-navbar-txt">Share</a></Button>
              </Popover>
              <Navbar.Divider />
              <Button className="bp3-minimal" icon="user" disabled />
              <Button className="bp3-minimal" icon="notifications" disabled />
              <Button className="bp3-minimal" icon="cog" disabled />
            </Navbar.Group>
          </Navbar>

          <Redirect from="/" to="/Search" />
          <Route path="/Search" component={Search} />
          <Route path="/Hots" component={Hots} />
          <Route path="/tags/:key" component={Hots} />

          <Card elevation={Elevation.TWO} className="footer-card" style={{ display: 'flex', justifyContent: 'flex-end', padding: 5, opacity: 0.7 }}>
            vDanbooru @ <a href="//vince-amazing.com" target="_blank" rel="noopener noreferrer">Vince</a>
          </Card>
        </BrowserRouter>
      </div>
    )
  }

}
const mapStateToProps = (state, ownProps) => {
  return {
    searchBackground: state.searchBackground
  }
}

export default connect(mapStateToProps)(App)