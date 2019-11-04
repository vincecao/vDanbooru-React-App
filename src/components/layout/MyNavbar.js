import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Alignment,
  Button,
  Navbar,
  Popover,
  Position,
  PopoverInteractionKind,
  MenuItem,
  Menu
} from "@blueprintjs/core";

import { DOMAIN } from "../res/env";
import SignoutLinks from "./SignoutLinks.js";
import SigninLinks from "./SigninLinks.js";
import "./MyNavbar.css";
import { useSelector } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { shareMenu } from '../layout/shareMenu'

const MyNavbar = props => {

  const shareMenuUrl = "http:" + DOMAIN + "/vdanbooru-react"
  const auth = useSelector(state => state.firebase.auth)

  const aboutMenu = () => {
    return (
      <Menu className="bp3-minimal">
        <MenuItem text="Github" icon="paragraph" href="//github.com/vincecao/vdanbooru-react-app" target="_blank" rel="noopener noreferrer"/>
        <MenuItem text="Me!!" icon="mugshot" href="//vince-amazing.com" target="_blank" rel="noopener noreferrer"/>
      </Menu>
    );
  };

  const links = () => {

    if (!isLoaded(auth)) {
      return
    } else {
      if (!isEmpty(auth.uid)) {
        return <SigninLinks />
      } else {
        return <SignoutLinks />
      }
    }

  }

  const navsLeft = () => {
    return <Fragment>
      <Navbar.Group align={Alignment.LEFT}>
        <Link to="/Search">
          <Button className="bp3-minimal" icon="home">
            <p className="desktop-navbar-txt">vDanbooru</p>
          </Button>
        </Link>
        <Navbar.Divider />
        <Link to="/Hots">
          <Button className="bp3-minimal" icon="heatmap">
            <p className="desktop-navbar-txt">Hots</p>
          </Button>
        </Link>
        <Link to="/Favs">
          <Button className="bp3-minimal" icon="star">
            <p className="desktop-navbar-txt">Favs</p>
          </Button>
        </Link>
        <Popover
          content={aboutMenu()}
          interactionKind={PopoverInteractionKind.HOVER}
          position={Position.BOTTOM}
        >
          <Button
            className="bp3-minimal"
            rightIcon="caret-down"
            icon="inbox">
            <p className="desktop-navbar-txt">About</p>
          </Button>
        </Popover>
      </Navbar.Group>
    </Fragment>
  }

  const navsRight = () => {
    return <Fragment>
      <Navbar.Group align={Alignment.RIGHT}>
        <Popover
          content={shareMenu(shareMenuUrl, props.searchBackground)}
          interactionKind={PopoverInteractionKind.HOVER}
          position={Position.BOTTOM}
        >
          <Button
            className="bp3-minimal"
            rightIcon="caret-down"
            icon="social-media"
          >
            <p className="desktop-navbar-txt">Share</p>
          </Button>
        </Popover>
        <Navbar.Divider />


        {links()}

      </Navbar.Group>
    </Fragment>
  }

  return (
    <Navbar style={{ opacity: 0.8, filter: (props.isLightBoxOpen)? 'blur(0.5rem) saturate(200%)': 'none' }}>
      {navsLeft()}
      {navsRight()}
    </Navbar>
  );
};


export default MyNavbar;
