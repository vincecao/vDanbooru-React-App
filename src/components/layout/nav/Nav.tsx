import React, { useContext, FC } from 'react';
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
import ShareMenu from './ShareMenu';
import { getRandomKey } from '../../../utilis';
import { LightBoxContext } from '../../../contexts/lightBoxContext';
import { FeatureImageContext } from '../../../contexts/featureImageContext';
import { ToggleThemeButton } from '../../button/buttons';

interface NavButtonLinkProps {
  linkTo: string;
  [propName: string]: any;
}

export const NavButtonLink: FC<NavButtonLinkProps> = (props) => (
  <Link {...props} to={props.linkTo}>
    <NavButton {...props} />
  </Link>
);

interface NavButtonProps {
  [propName: string]: any;
}

export const NavButton: FC<NavButtonProps> = (props) => (
  <>
    <Button {...props} minimal className="hidden md:inline-flex mr-2" />
    <Button {...props} minimal large className="inline-flex md:hidden mr-2" text="" />
  </>
);

const Nav = () => {
  const { pathname } = useLocation();
  const { isLightBoxMode } = useContext(LightBoxContext);
  const { featureImage } = useContext(FeatureImageContext);

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

  const UserCenterAction = () => <SignoutLinks />;

  const LeftNav = () => (
    <Navbar.Group align={Alignment.LEFT}>
      <NavButtonLink linkTo="/" icon="home" text="vDanbooru" className="font-display" />
      <Navbar.Divider />
      <NavButtonLink
        linkTo={`/tags/${getRandomKey()}`}
        icon="heatmap"
        text="Hots"
        active={pathname.indexOf('/hots') > -1}
      />
      <Popover content={<AboutMenu />} interactionKind={PopoverInteractionKind.HOVER} position={Position.BOTTOM}>
        <NavButton icon="inbox" rightIcon="caret-down" text="About" />
      </Popover>
    </Navbar.Group>
  );

  const RightNav = () => (
    <Navbar.Group align={Alignment.RIGHT}>
      <Popover
        content={<ShareMenu imgSrc={featureImage} />}
        interactionKind={PopoverInteractionKind.HOVER}
        position={Position.BOTTOM}
      >
        <NavButton icon="social-media" rightIcon="caret-down" text="Share" />
      </Popover>
      <Navbar.Divider />
      <ToggleThemeButton />
      <UserCenterAction />
    </Navbar.Group>
  );

  return (
    <Navbar className={`${isLightBoxMode ? 'filter-blur' : 'filter-none'}`}>
      <LeftNav />
      <RightNav />
    </Navbar>
  );
};

export default Nav;
