import React from 'react';
import { Card, Elevation, Tooltip, Button, Icon } from '@blueprintjs/core';

const FooterButton = (props) => (
  <>
    <Button {...props} className="hidden md:inline-flex mr-2" />
    <Button {...props} large className="inline-flex md:hidden mr-2" text="" />
  </>
);

const FootBanner = () => (
  <p style={{ margin: 'auto 0', marginRight: 5 }}>
    {'vDanbooru @ '}
    <Tooltip className="bp3-minimal" content="Hei, I am Vince">
      <a href="//vince-amazing.com" target="_blank" rel="noopener noreferrer">
        {'Vince'}
      </a>
    </Tooltip>
  </p>
);

const MyFooter = ({ currentPage, handleSwitch, isLightBoxOpen, searchBackground }) => {
  const handleDownload = () => searchBackground && window.open(searchBackground, '_blank');
  return (
    <Card
      elevation={Elevation.TWO}
      className="footer-card flex justify-between p-2"
      style={{
        filter: isLightBoxOpen ? 'blur(0.5rem) saturate(200%)' : 'none',
      }}
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
      <FootBanner />
    </Card>
  );
};

export default MyFooter;
