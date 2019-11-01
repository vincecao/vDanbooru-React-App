import React from "react";
import { Card, Elevation, Tooltip } from "@blueprintjs/core";
const MyFooter = () => {
  return (
    <Card
      elevation={Elevation.TWO}
      className="footer-card"
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: 5,
        opacity: 0.7
      }}
    >
      vDanbooru @{" "}
      <Tooltip
        className="bp3-minimal"
        content="Hei, I am Vince"
        position="top">
        <a href="//vince-amazing.com" target="_blank" rel="noopener noreferrer">
          Vince
      </a>
      </Tooltip>
    </Card>
  );
};

export default MyFooter;
