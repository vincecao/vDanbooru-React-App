import React, { useContext, ReactElement } from 'react';
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

interface NavButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
}

export function NavButton(props: NavButtonProps): ReactElement {
  return (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Button {...props} minimal className="hidden md:inline-flex mr-2" />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Button {...props} minimal large className="inline-flex md:hidden mr-2" text="" />
    </>
  );
}

interface NavButtonLinkProps {
  linkTo: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
}

export function NavButtonLink(props: NavButtonLinkProps): ReactElement {
  const { linkTo } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Link {...props} to={linkTo}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <NavButton {...props} />
    </Link>
  );
}

function AboutMenu(): ReactElement {
  return (
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
}

function UserCenterAction() {
  return <SignoutLinks />;
}

function LeftNav({ pathname }: { pathname: string }) {
  return (
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
}

function RightNav({ featureImage }: { featureImage: string }) {
  return (
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
}

export default function Nav(): ReactElement {
  const { pathname } = useLocation();
  const { isLightBoxMode } = useContext(LightBoxContext);
  const { featureImage } = useContext(FeatureImageContext);

  return (
    <Navbar className={`${isLightBoxMode ? 'filter-blur' : 'filter-none'}`}>
      <LeftNav pathname={pathname} />
      <RightNav featureImage={featureImage} />
    </Navbar>
  );
}
