import React from "react";
import {
  Popover,
  Button,
  Position,
  PopoverInteractionKind,
  Menu,
  MenuItem,
} from "@blueprintjs/core";
import ShareMenu from "./ShareMenu";

const TagPanel = ({
  isTagPanelOpen,
  isInHots,
  shareMenuUrl,
  shareMenuItem,
  parentProps = {},
}) => {
  const { focusingImgObject, closeLightBox, onSearchInHot } = parentProps;
  const TagPanelMenu = () => (
    <Menu className="bp3-minimal">
      <TagPanelMenuItem />
    </Menu>
  );

  const TagPanelMenuItem = () =>
    focusingImgObject.tags.map((tag, index) => {
      return (
        <MenuItem
          key={index}
          text={tag.value}
          onClick={() => {
            closeLightBox();
            onSearchInHot(tag.value);
          }}
        />
      );
    });

  const TagButton = () =>
    isInHots ? (
      <Popover
        content={<TagPanelMenu />}
        interactionKind={PopoverInteractionKind.HOVER}
        position={Position.BOTTOM}
      >
        <Button
          className="bp3-minimal"
          style={{
            border: "1px black solid",
            background: "white",
            marginRight: 10,
          }}
          icon="tag"
        >
          <p className="desktop-navbar-txt">Tags</p>
        </Button>
      </Popover>
    ) : (
      <></>
    );

  return isTagPanelOpen ? (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 13,
        marginTop: 10,
        marginLeft: 20,
      }}
    >
      <TagButton />
      <Popover
        content={<ShareMenu url={shareMenuUrl} imgSrc={shareMenuItem.img} />}
        interactionKind={PopoverInteractionKind.HOVER}
        position={Position.BOTTOM}
      >
        <Button
          className="bp3-minimal"
          style={{
            border: "1px black solid",
            background: "white",
            marginRight: 10,
          }}
          icon="share"
          rightIcon="caret-down"
        >
          <p className="desktop-navbar-txt">Share</p>
        </Button>
      </Popover>

      <a
        className="bp3-button bp3-minimal"
        style={{
          border: "1px black solid",
          background: "white",
          marginRight: 10,
        }}
        icon="download"
        href={shareMenuItem.img}
        target="_blank"
        rel="noopener noreferrer"
        download={
          shareMenuItem.caption +
          shareMenuItem.img.substring(
            shareMenuItem.img.lastIndexOf("."),
            shareMenuItem.img.length
          )
        }
      >
        <span icon="star" className="bp3-icon bp3-icon-download" />
        <p className="desktop-navbar-txt">Download</p>
      </a>
    </div>
  ) : (
    <></>
  );
};

export default TagPanel;
