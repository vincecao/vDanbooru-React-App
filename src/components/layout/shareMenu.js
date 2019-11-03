import React from "react";

import {
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  PinterestIcon,
  RedditIcon,
  TumblrIcon,
  LineIcon
} from "react-share";
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  PinterestShareButton,
  RedditShareButton,
  TumblrShareButton,
  LineShareButton
} from "react-share";
import {
  MenuItem,
  Menu
} from "@blueprintjs/core";

export const shareMenu = (url, imgsrc) => {
  return (
    <Menu className="bp3-minimal">
      <TwitterShareButton
        url={url}
        children={
          <MenuItem
            text="Twitter"
            icon={<TwitterIcon size={24} round={false} />}
          />
        }
      />
      <FacebookShareButton
        url={url}
        children={
          <MenuItem
            text="Facebook"
            icon={<FacebookIcon size={24} round={false} />}
          />
        }
      />
      <PinterestShareButton
        media={imgsrc === null ? "" : imgsrc}
        url={url}
        children={
          <MenuItem
            text="Pinterest"
            icon={<PinterestIcon size={24} round={false} />}
          />
        }
      />
      <TumblrShareButton
        url={url}
        children={
          <MenuItem
            text="Tumblr"
            icon={<TumblrIcon size={24} round={false} />}
          />
        }
      />
      <RedditShareButton
        url={url}
        children={
          <MenuItem
            text="Reddit"
            icon={<RedditIcon size={24} round={false} />}
          />
        }
      />
      <LineShareButton
        url={url}
        children={
          <MenuItem text="Line" icon={<LineIcon size={24} round={false} />} />
        }
      />
      <TelegramShareButton
        url={url}
        children={
          <MenuItem
            text="Telegram"
            icon={<TelegramIcon size={24} round={false} />}
          />
        }
      />
      {/* <MenuDivider /> */}
    </Menu>
  );
};

export default {
  shareMenu
};