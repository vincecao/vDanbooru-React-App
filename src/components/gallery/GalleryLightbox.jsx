import React, { useState } from 'react';
import UniversalButton from '../button/UniversalButton';

export const ThumbnailWithLoading = (props) => {
  const [loaded, setLoaded] = useState(false);
  const { src, alt, className, thumbnail } = props;
  const onLoad = () => setLoaded(true);
  return <img {...props} onLoad={onLoad} src={!loaded ? thumbnail : src} alt={alt} className={className} />;
};

const TagButton = ({ text }) => <UniversalButton color="black" className="mr-2" text={text} />;

const TagGroup = ({ tags }) => (
  <div>
    <h3>Tags</h3>
    {tags.map((tag) => (
      <TagButton text={tag.value} />
    ))}
  </div>
);

const DownloadButton = () => <UniversalButton color="indigo" className="mr-2" text="Download" />;
const ButtonGroup = () => (
  <div>
    <h3>Download</h3>
    <DownloadButton />
  </div>
);

const GalleryLightbox = ({ photo, onClose }) => {
  const { src, caption, tags, thumbnail, thumbnailHeight, thumbnailWidth } = photo;
  return (
    <>
      <div className="backdrop-blur fixed top-0 right-0 left-0 bottom-0 z-30" />
      <div className="fixed top-28 bottom-28 left-28 right-28 bg-white shadow-lg z-40 rounded-lg">
        <UniversalButton color="red" className="absolute top-10 right-10 text-lg" text="close" onClick={onClose} />
        <div className="mx-auto p-10 h-full w-full flex">
          <div className="m-3 override-auto">
            <ThumbnailWithLoading
              src={src}
              thumbnail={thumbnail}
              alt={caption}
              className="rounded-lg shadow-lg h-full"
            />
          </div>
          <div className="m-2 p-2 max-w-xs overflow-auto">
            <TagGroup tags={tags} />
            <ButtonGroup tags={tags} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryLightbox;
