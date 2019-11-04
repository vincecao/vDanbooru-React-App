import React from "react";
import { Card, Elevation, Tooltip, Button } from "@blueprintjs/core";

const MyFooter = ({ handleSwitch, isLightBoxOpen }) => {
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
      <span>
        <Button
          icon="refresh"
          onClick={() => { handleSwitch() }}
        >
          Switch a Image
        </Button>
      </span>
      <p style={{ margin: 'auto 0' }}>
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
