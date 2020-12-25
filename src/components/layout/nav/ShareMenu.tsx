import React, { FC } from 'react';
import { MenuItem, Menu } from '@blueprintjs/core';
import {
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  PinterestIcon,
  RedditIcon,
  TumblrIcon,
  LineIcon,
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  PinterestShareButton,
  RedditShareButton,
  TumblrShareButton,
  LineShareButton,
} from 'react-share';

const ROUTER_BASENAME = process.env.REACT_APP_ROUTER_BASENAME || '/';

interface ShareMenuProps {
  imgSrc: string;
}

const ShareMenu: FC<ShareMenuProps> = ({ imgSrc }) => {
  const url = `${window.location.protocol}//${window.location.hostname}${ROUTER_BASENAME}`;

  return (
    <Menu className="bp3-minimal flex flex-col">
      <TwitterShareButton
        url={url}
        children={<MenuItem className="text-left" text="Twitter" icon={<TwitterIcon size={24} round />} />}
      />
      <FacebookShareButton
        url={url}
        children={<MenuItem className="text-left" text="Facebook" icon={<FacebookIcon size={24} round />} />}
      />
      <PinterestShareButton
        media={imgSrc === null ? '' : imgSrc}
        url={url}
        children={<MenuItem className="text-left" text="Pinterest" icon={<PinterestIcon size={24} round />} />}
      />
      <TumblrShareButton
        url={url}
        children={<MenuItem className="text-left" text="Tumblr" icon={<TumblrIcon size={24} round />} />}
      />
      <RedditShareButton
        url={url}
        children={<MenuItem className="text-left" text="Reddit" icon={<RedditIcon size={24} round />} />}
      />
      <LineShareButton
        url={url}
        children={<MenuItem className="text-left" text="Line" icon={<LineIcon size={24} round />} />}
      />
      <TelegramShareButton
        url={url}
        children={<MenuItem className="text-left" text="Telegram" icon={<TelegramIcon size={24} round />} />}
      />
    </Menu>
  );
};

export default ShareMenu;
