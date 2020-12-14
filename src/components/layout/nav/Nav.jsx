import React from 'react';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { Link, useLocation } from 'react-router-dom';
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
import SignInLinks from './SigninLinks';
import ShareMenu from './ShareMenu';

export const NavButtonLink = (props) => (
  <Link to={props.linkTo}>
    <NavButton {...props} />
  </Link>
);

export const NavButton = (props) => (
  <>
    <Button {...props} minimal className="hidden md:inline-flex mr-2" />
    <Button {...props} minimal large className="inline-flex md:hidden mr-2" text="" />
  </>
);

const Nav = ({ searchBackground, isLightBoxOpen }) => {
  const { pathname } = useLocation();
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
      {isLoaded(auth) && !isEmpty(auth.uid) && <SignInLinks />}
      {isLoaded(auth) && isEmpty(auth.uid) && <SignoutLinks />}
    </>
  );

  const LeftNav = () => (
    <Navbar.Group align={Alignment.LEFT}>
      <NavButtonLink linkTo="/Search" icon="home" text="vDanbooru" active={pathname.indexOf('/Search') > -1} />
      <Navbar.Divider />
      <NavButtonLink linkTo="/Hots" icon="heatmap" text="Hots" active={pathname.indexOf('/Hots') > -1} />
      <NavButtonLink linkTo="/Favs" icon="star" text="Favs" active={pathname.indexOf('/Favs') > -1} />
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
    <Navbar className={`${isLightBoxOpen ? 'filter-blur' : 'filter-none'}`}>
      <LeftNav />
      <RightNav />
    </Navbar>
  );
};

export default Nav;
