import React from 'react';
import { Popover, Position, PopoverInteractionKind, Menu, MenuItem } from '@blueprintjs/core';
import ShareMenu from './nav/ShareMenu';
import { NavButton } from './nav/Nav';

const TagPanel = ({ isInHots, shareMenuUrl, shareMenuItem, parentProps = {} }) => {
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
      <Popover content={<TagPanelMenu />} interactionKind={PopoverInteractionKind.HOVER} position={Position.BOTTOM}>
        <NavButton className="bp3-minimal border bg-white mr-3" icon="tag" text="Tags" />
      </Popover>
    ) : (
      <></>
    );

  const ShareButton = () => (
    <Popover
      content={<ShareMenu url={shareMenuUrl} imgSrc={shareMenuItem.img} />}
      interactionKind={PopoverInteractionKind.HOVER}
      position={Position.BOTTOM}
    >
      <NavButton className="bp3-minimal border bg-white mr-3" icon="share" rightIcon="caret-down" text="Share" />
    </Popover>
  );

  const DownloadButton = () => (
    <a
      className="bp3-button bp3-minimal border bg-white mr-3"
      icon="download"
      href={shareMenuItem.img}
      target="_blank"
      rel="noopener noreferrer"
      download={
        shareMenuItem.caption +
        shareMenuItem.img.substring(shareMenuItem.img.lastIndexOf('.'), shareMenuItem.img.length)
      }
    >
      <span icon="star" className="bp3-icon bp3-icon-download" />
      <p className="desktop-navbar-txt">Download</p>
    </a>
  );

  return (
    <div className="fixed left-3 top-3 z-20">
      <TagButton />
      <ShareButton />
      <DownloadButton />
    </div>
  );
};

export default TagPanel;
