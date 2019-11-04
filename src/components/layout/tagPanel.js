import React from "react";
import {
  Popover,
  Button,
  Position,
  PopoverInteractionKind,
  Menu,
  MenuItem
} from "@blueprintjs/core";
import { shareMenu } from './shareMenu'

export const tagPanel = (isTagPanelOpen, isInHots, shareMenuUrl, shareMenuItem, props) => {

  const tagPanelMenu = () => {
    return <Menu className="bp3-minimal">
      {tagPanelMenuItem()}
    </Menu>
  }

  const tagPanelMenuItem = () => {
    return (
      props.focusingImgObject.tags.map((tag, index) => {
        return <MenuItem key={index} text={tag.value}
          onClick={() => {
            props.closeLightBox()
            props.onSearchInHot(tag.value)
          }
          } />
      })
    )
  }

  const TagButton = () => {
    if (isInHots) {
      return <Popover
        content={tagPanelMenu()}
        interactionKind={PopoverInteractionKind.HOVER}
        position={Position.BOTTOM}
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
    return <div style={{ position: 'fixed', left: 0, top: 0, zIndex: 13, marginTop: 10, marginLeft: 20 }}>
      {TagButton()}
      {/* <Button className="bp3-minimal" style={{ border: '1px black solid', background: 'white', marginRight: 10 }} icon="star" disabled>
        <p className="desktop-navbar-txt">Add Favs</p>
      </Button> */}
      <Popover
        content={shareMenu(shareMenuUrl, shareMenuItem.img)}
        interactionKind={PopoverInteractionKind.HOVER}
        position={Position.BOTTOM}
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

export default { tagPanel };