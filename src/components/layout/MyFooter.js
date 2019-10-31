import React from "react";
import { Card, Elevation } from "@blueprintjs/core";
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
      <a href="//vince-amazing.com" target="_blank" rel="noopener noreferrer">
        Vince
      </a>
    </Card>
  );
};

export default MyFooter;
