import React from "react";
import {
  Popover,
  Button,
  Position,
  PopoverInteractionKind
} from "@blueprintjs/core";
import { shareMenu } from './shareMenu'


export const tagPanel = (isTagPanelOpen, isInHots, tagPanelMenu, shareMenuUrl, shareMenuItem) => {

  const TagButton = () => {
    if (isInHots) {
      return <Popover
        content={tagPanelMenu()}
        interactionKind={PopoverInteractionKind.HOVER}
        position={Position.bottom}
      >
        <Button className="bp3-minimal" style={{ border: '1px black solid', background: 'white', marginRight: 10 }} icon="tag">
          <p className="desktop-navbar-txt">Tags</p>
        </Button>
      </Popover>
    }
    else {
      return
    }
  }

  if (isTagPanelOpen) {
    return <div style={{ position: 'fixed', left: 20, top: 20, zIndex: 13, display: 'flex' }}>
      {TagButton()}
      {/* <Button className="bp3-minimal" style={{ border: '1px black solid', background: 'white', marginRight: 10 }} icon="star" disabled>
        <p className="desktop-navbar-txt">Add Favs</p>
      </Button> */}
      <Popover
        content={shareMenu(shareMenuUrl, shareMenuItem.img)}
        interactionKind={PopoverInteractionKind.HOVER}
      >
        <Button className="bp3-minimal" style={{ border: '1px black solid', background: 'white', marginRight: 10 }} icon="share" rightIcon="caret-down">
          <p className="desktop-navbar-txt">Share</p>
        </Button>
      </Popover>

      <a className="bp3-button bp3-minimal"
        // role="button"
        style={{ border: '1px black solid', background: 'white', marginRight: 10 }}
        icon="download"
        href={shareMenuItem.img}
        target="_blank"
        rel="noopener noreferrer"
        download={shareMenuItem.caption + shareMenuItem.img.substring(shareMenuItem.img.lastIndexOf('.'), shareMenuItem.img.length)}>
        <span icon="star" className="bp3-icon bp3-icon-download"></span><p className="desktop-navbar-txt">Download</p>
      </a>
    </div>
  } else {
    return
  }
}

export default {
  tagPanel
};