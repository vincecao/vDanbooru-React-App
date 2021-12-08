import React, { useContext, ReactElement } from 'react';
import {
  Card, Elevation, Tooltip, Button,
} from '@blueprintjs/core';
import { useLocation } from 'react-router-dom';
import { FeatureImageContext } from '../../../contexts/featureImageContext';

interface FooterButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
}

function FooterButton(props: FooterButtonProps): ReactElement {
  return (
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Button {...props} className="hidden md:inline-flex mr-2" />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Button {...props} large className="inline-flex md:hidden mr-2" text="" />
    </>
  );
}

function FooterBanner(): ReactElement {
  return (
    <p className="my-auto">
      {'vDanbooru @ '}
      <Tooltip className="bp3-minimal" content="Hei, I am Vince">
        <a href="//vince-amazing.com" target="_blank" rel="noopener noreferrer">
          VINCE
        </a>
      </Tooltip>
    </p>
  );
}

export default function Footer(): ReactElement {
  const { pathname } = useLocation();
  const { featureImage, switchImage } = useContext(FeatureImageContext);

  const handleDownload = () => featureImage && window.open(featureImage, '_blank');
  return (
    <Card elevation={Elevation.TWO} className="footer-card rounded-none flex justify-between p-2 z-10">
      <span>
        {pathname === '/' && (
          <>
            <FooterButton icon="refresh" text="Switch a Image" onClick={switchImage} />
            <FooterButton icon="download" text="Download Features" onClick={handleDownload} />
          </>
        )}
        {pathname !== '/' && <p className="bp3-minimal my-auto">{pathname.toUpperCase()}</p>}
      </span>
      <FooterBanner />
    </Card>
  );
}
