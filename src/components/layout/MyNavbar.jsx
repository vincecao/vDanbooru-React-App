import React from 'react';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import {
  Alignment,
  Button,
  Navbar,
  Popover,
  Position,
  PopoverInteractionKind,
  MenuItem,
  Menu,
} from '@blueprintjs/core';
import SignoutLinks from './SignoutLinks';
import SigninLinks from './SigninLinks';
import ShareMenu from './ShareMenu';

const NavButtonLink = (props) => (
  <Link to={props.linkTo}>
    <NavButton {...props} />
  </Link>
);

const NavButton = (props) => (
  <>
    <Button {...props} minimal className="hidden md:inline-flex mr-2" />
    <Button {...props} minimal large className="inline-flex md:hidden mr-2" text="" />
  </>
);

const MyNavbar = ({ searchBackground, isLightBoxOpen }) => {
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
      <MenuItem text="Me!!" icon="mugshot" href="//vince-amazing.com" target="_blank" rel="noopener noreferrer" />
    </Menu>
  );

  const UserCenterAction = () => (
    <>
      {isLoaded(auth) && !isEmpty(auth.uid) && <SigninLinks />}
      {isLoaded(auth) && isEmpty(auth.uid) && <SignoutLinks />}
    </>
  );

  const LeftNav = () => (
    <Navbar.Group align={Alignment.LEFT}>
      <NavButtonLink linkTo="/Search" icon="home" text="vDanbooru" />
      <Navbar.Divider />
      <NavButtonLink linkTo="/Hots" icon="heatmap" text="Hots" />
      <NavButtonLink linkTo="/Favs" icon="star" text="Favs" />
      <Popover content={<AboutMenu />} interactionKind={PopoverInteractionKind.HOVER} position={Position.BOTTOM}>
        <NavButton icon="inbox" rightIcon="caret-down" text="About" />
      </Popover>
    </Navbar.Group>
  );

  const RightNav = () => (
    <Navbar.Group align={Alignment.RIGHT}>
      <Popover
        content={<ShareMenu imgSrc={searchBackground} />}
        interactionKind={PopoverInteractionKind.HOVER}
        position={Position.BOTTOM}
      >
        <NavButton icon="social-media" rightIcon="caret-down" text="Share" />
      </Popover>
      <Navbar.Divider />
      <UserCenterAction />
    </Navbar.Group>
  );

  return (
    <Navbar
      style={{
        filter: isLightBoxOpen ? 'blur(0.5rem) saturate(200%)' : 'none',
      }}
    >
      <LeftNav />
      <RightNav />
    </Navbar>
  );
};

export default MyNavbar;
