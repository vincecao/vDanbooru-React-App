import React from 'react';
import { Card, Elevation, Tooltip, Button, Icon } from '@blueprintjs/core';

const FooterButton = (props) => (
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

const Footer = ({ currentPage, handleSwitch, isLightBoxOpen, searchBackground }) => {
  const handleDownload = () => searchBackground && window.open(searchBackground, '_blank');
  return (
    <Card
      elevation={Elevation.TWO}
      className={`footer-card flex justify-between p-2 ${isLightBoxOpen ? 'filter-blur' : 'filter-none'}`}
    >
      <span>
        {currentPage === 'search' && (
          <>
            <FooterButton icon="refresh" text="Switch a Image" onClick={handleSwitch} />
            <FooterButton icon="download" text="Download Features" onClick={handleDownload} />
          </>
        )}
        {currentPage !== 'search' && <p className="bp3-minimal my-auto">{currentPage.toUpperCase()}</p>}
      </span>
      <FooterBanner />
    </Card>
  );
};

export default Footer;
