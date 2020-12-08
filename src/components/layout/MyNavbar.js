import React from "react";
import { Link } from "react-router-dom";
import {
  Alignment,
  Button,
  Navbar,
  Popover,
  Position,
  PopoverInteractionKind,
  MenuItem,
  Menu,
} from "@blueprintjs/core";
import { DOMAIN } from "../res/env";
import SignoutLinks from "./SignoutLinks.js";
import SigninLinks from "./SigninLinks.js";
import ShareMenu from "./ShareMenu";
import "./MyNavbar.css";
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";

const MyNavbar = (props) => {
  const shareMenuUrl = `http:${DOMAIN}/`;
  const auth = useSelector((state) => state.firebase.auth);

  const AboutMenu = () => (
    <Menu className="bp3-minimal">
      <MenuItem
        text="Github"
        icon="paragraph"
        href="//github.com/vincecao/vdanbooru-react-app"
        target="_blank"
        rel="noopener noreferrer"
      />
      <MenuItem
        text="Me!!"
        icon="mugshot"
        href="//vince-amazing.com"
        target="_blank"
        rel="noopener noreferrer"
      />
    </Menu>
  );

  const Links = () => (
    <>
      {isLoaded(auth) && !isEmpty(auth.uid) && <SigninLinks />}
      {isLoaded(auth) && isEmpty(auth.uid) && <SignoutLinks />}
    </>
  );

  const Left = () => (
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
        content={<AboutMenu />}
        interactionKind={PopoverInteractionKind.HOVER}
        position={Position.BOTTOM}
      >
        <Button className="bp3-minimal" rightIcon="caret-down" icon="inbox">
          <p className="desktop-navbar-txt">About</p>
        </Button>
      </Popover>
    </Navbar.Group>
  );

  const Right = () => (
    <Navbar.Group align={Alignment.RIGHT}>
      <Popover
        content={
          <ShareMenu url={shareMenuUrl} imgSrc={props.searchBackground} />
        }
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
      <Links />
    </Navbar.Group>
  );

  return (
    <Navbar
      style={{
        opacity: 0.8,
        filter: props.isLightBoxOpen ? "blur(0.5rem) saturate(200%)" : "none",
      }}
    >
      <Left />
      <Right />
    </Navbar>
  );
};

export default MyNavbar;
