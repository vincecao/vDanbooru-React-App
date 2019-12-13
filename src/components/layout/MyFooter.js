import React from "react";
import { Card, Elevation, Tooltip, Button } from "@blueprintjs/core";

const MyFooter = ({ currentPage, handleSwitch, isLightBoxOpen, searchBackground }) => {

  const handleDownload = () => {
    if (searchBackground) {
      window.open(
        searchBackground,
        '_blank'
      );
    }
  }

  const handleButtonShow = () => {
    if (currentPage === 'search') {
      return <span>
        <Button
          icon="refresh"
          onClick={() => { handleSwitch() }}
          style={{ marginRight: 5 }}
        >
          <p className="desktop-navbar-txt">Switch a Image</p>
        </Button>
        <Button
          // className="bp3-minimal"
          icon="download"
          onClick={() => { handleDownload() }}
        >
          <p className="desktop-navbar-txt">Download Features</p>
        </Button>
      </span>
    } else {
      return <span><p style={{ margin: 'auto 0', marginRight: 5 }} className="bp3-minimal">{currentPage.toString().toUpperCase()}</p></span>
    }
  }

  return (
    <Card
      elevation={Elevation.TWO}
      className="footer-card"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 5,
        opacity: 0.7,
        filter: (isLightBoxOpen) ? 'blur(0.5rem) saturate(200%)' : 'none'
      }}
    >
      {handleButtonShow()}

      <p style={{ margin: 'auto 0', marginRight: 5 }}>
        vDanbooru @{" "}
        <Tooltip
          className="bp3-minimal"
          content="Hei, I am Vince"
          position="top">
          <a href="//vince-amazing.com" target="_blank" rel="noopener noreferrer">
            Vince
          </a>
        </Tooltip>
      </p>

    </Card>
  );
};

export default MyFooter;
