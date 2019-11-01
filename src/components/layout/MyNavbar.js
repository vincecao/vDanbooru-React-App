import React from "react";
import { Link } from "react-router-dom";
import {
  Alignment,
  Button,
  Navbar,
  Popover,
  PopoverInteractionKind,
  MenuItem,
  Menu
} from "@blueprintjs/core";
import {
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  PinterestIcon,
  RedditIcon,
  TumblrIcon,
  LineIcon
} from "react-share";
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  PinterestShareButton,
  RedditShareButton,
  TumblrShareButton,
  LineShareButton
} from "react-share";
import { DOMAIN } from "../res/defaultLst";
import SignoutLinks from "./SignoutLinks.js";
import SigninLinks from "./SigninLinks.js";
import "./MyNavbar.css";

const MyNavbar = props => {
  const shareMenu = () => {
    return (
      <Menu className="bp3-minimal">
        <TwitterShareButton
          url={"http:" + DOMAIN + "/vdanbooru-react"}
          children={
            <MenuItem
              text="Twitter"
              icon={<TwitterIcon size={24} round={false} />}
            />
          }
        />
        <FacebookShareButton
          url={"http:" + DOMAIN + "/vdanbooru-react"}
          children={
            <MenuItem
              text="Facebook"
              icon={<FacebookIcon size={24} round={false} />}
            />
          }
        />
        <PinterestShareButton
          media={props.searchBackground}
          url={"http:" + DOMAIN + "/vdanbooru-react"}
          children={
            <MenuItem
              text="Pinterest"
              icon={<PinterestIcon size={24} round={false} />}
            />
          }
        />
        <TumblrShareButton
          url={"http:" + DOMAIN + "/vdanbooru-react"}
          children={
            <MenuItem
              text="Tumblr"
              icon={<TumblrIcon size={24} round={false} />}
            />
          }
        />
        <RedditShareButton
          url={"http:" + DOMAIN + "/vdanbooru-react"}
          children={
            <MenuItem
              text="Reddit"
              icon={<RedditIcon size={24} round={false} />}
            />
          }
        />
        <LineShareButton
          url={"http:" + DOMAIN + "/vdanbooru-react"}
          children={
            <MenuItem text="Line" icon={<LineIcon size={24} round={false} />} />
          }
        />
        <TelegramShareButton
          url={"http:" + DOMAIN + "/vdanbooru-react"}
          children={
            <MenuItem
              text="Telegram"
              icon={<TelegramIcon size={24} round={false} />}
            />
          }
        />
        {/* <MenuDivider /> */}
      </Menu>
    );
  };

  const aboutMenu = () => {
    return (
      <Menu className="bp3-minimal">
        <MenuItem text="Github" icon="paragraph" href="//github.com/vincecao/vdanbooru-react-app" target="_blank" />
        <MenuItem text="Me!!" icon="mugshot" href="//vince-amazing.com" target="_blank" />
      </Menu>
    );
  };

  return (
    <Navbar style={{ opacity: 0.8 }}>
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
        >
          <Button className="bp3-minimal" icon="inbox">
            <p className="desktop-navbar-txt">About</p>
          </Button>
        </Popover>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Popover
          content={shareMenu()}
          interactionKind={PopoverInteractionKind.HOVER}
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

        <SignoutLinks />
        {/* <SigninLinks /> */}
      </Navbar.Group>
    </Navbar>
  );
};

export default MyNavbar;
