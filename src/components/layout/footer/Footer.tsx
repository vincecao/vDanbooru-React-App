import React, { useContext, FC } from 'react';
import { Card, Elevation, Tooltip, Button } from '@blueprintjs/core';
import { useLocation } from 'react-router-dom';
import { FeatureImageContext } from '../../../contexts/featureImageContext';

interface FooterButtonProps {
  [propName: string]: any;
}

const FooterButton: FC<FooterButtonProps> = (props) => (
  <>
    <Button {...props} className="hidden md:inline-flex mr-2" />
    <Button {...props} large className="inline-flex md:hidden mr-2" text="" />
  </>
);

const FooterBanner = () => (
  <p className="my-auto">
    {'vDanbooru @ '}
    <Tooltip className="bp3-minimal" content="Hei, I am Vince">
      <a href="//vince-amazing.com" target="_blank" rel="noopener noreferrer">
        {'VINCE'}
      </a>
    </Tooltip>
  </p>
);

const Footer = () => {
  const { pathname } = useLocation();
  const { featureImage, switchImage } = useContext(FeatureImageContext);

  const handleDownload = () => featureImage && window.open(featureImage, '_blank');
  return (
    <Card elevation={Elevation.TWO} className={`footer-card flex justify-between p-2 z-10`}>
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
};

export default Footer;
