import React, { useState, FC, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { DownloadButton, PaginationButton } from '../button/buttons';
import UniversalButton from '../button/UniversalButton';
import { Photo, Tag } from './Gallery';

interface ThumbnailWithLoadingProps {
  src: string;
  alt: string;
  className: string;
  thumbnail: string;
}

export const ThumbnailWithLoading: FC<ThumbnailWithLoadingProps> = (props) => {
  const [loaded, setLoaded] = useState(false);
  const { src, alt, className, thumbnail } = props;
  const onLoad = () => setLoaded(true);
  return (
    <div className="relative">
      {!loaded && (
        <span className="absolute top-4 left-4 inline-flex space-x-4 text-black bg-black rounded-lg px-2 py-1 items-center backdrop-blur-light">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="inline-flex">Loading</span>
        </span>
      )}
      <div>
        <img {...props} onLoad={onLoad} src={src} alt={alt} className={`${className} ${loaded ? 'block' : 'hidden'}`} />
        <img {...props} src={thumbnail} alt={alt} className={`${className} ${!loaded ? 'block' : 'hidden'}`} />
      </div>
    </div>
  );
};

interface CloseButtonProps {
  onClose: () => void;
}

const CloseButton: FC<CloseButtonProps> = ({ onClose }) => (
  <UniversalButton color="red" className="text-lg z-50 rounded-full" onClick={onClose}>
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  </UniversalButton>
);

interface TagButtonProps {
  text: string;
  value: string;
}

const TagButton: FC<TagButtonProps> = ({ text, value }) => {
  const navigate = useNavigate();
  const handleTagOnClick = () => navigate(`/tags/${value}`);
  return <UniversalButton color="white" className="mr-2 mb-2 backdrop-light" text={text} onClick={handleTagOnClick} />;
};

interface TagGroupProps {
  tags: Tag[];
}

const TagGroup: FC<TagGroupProps> = ({ tags }) => (
  <div className="text-white">
    <h3>Tags</h3>
    {tags.map((tag) => (
      <TagButton key={tag.value} text={tag.title} value={tag.value} />
    ))}
  </div>
);

interface ButtonGroupProps {
  photo: Photo;
}

const ButtonGroup: FC<ButtonGroupProps> = ({ photo }) => (
  <div className="text-white mb-10">
    <h3>Download</h3>
    <DownloadButton photo={photo} />
  </div>
);

interface GalleryLightboxProps {
  photo: Photo;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
}

const GalleryLightbox: FC<GalleryLightboxProps> = ({
  photo,
  onClose,
  onNext,
  onPrev,
  prevDisabled = false,
  nextDisabled = false,
}) => {
  const { src, caption, tags, thumbnail } = photo;
  return (
    <>
      <div className="backdrop-blur-light dark:backdrop-blur-dark fixed top-0 left-0 right-0 bottom-0 z-40 flex items-center justify-center py-2 lg:py-0 lg:px-32 px-2">
        <div className="relative backdrop-dark shadow-lg rounded-xl m-auto px-2 py-2 lg:p-0 h-full lg:h-auto overflow-auto">
          <div className="grid lg:grid-cols-5 lg:gap-5">
            <div className="relative lg:col-span-4 flex items-center">
              <div
                className="absolute top-0 left-0 bottom-0 right-0 filter-blur bg-cover bg-center -z-10"
                style={{ background: `url(${thumbnail})` }}
              />
              <div className="overflow-auto max-h-85vh w-full z-10">
                <ThumbnailWithLoading
                  key={src}
                  src={src}
                  thumbnail={thumbnail}
                  alt={caption}
                  className="rounded-xl lg:rounded-r-none shadow-lg object-contain w-full"
                />
                <div className="absolute right-5 bottom-5 space-x-4">
                  <PaginationButton role="prev" color="white" onClick={onPrev} disabled={prevDisabled} />
                  <PaginationButton role="next" color="white" onClick={onNext} disabled={nextDisabled} />
                </div>
              </div>
            </div>
            <div className="px-3 pb-3 lg:pb-0 lg:px-0">
              <div className="overflow-auto lg:pr-5 max-h-85vh">
                <TagGroup tags={tags} />
                <ButtonGroup photo={photo} />
              </div>
            </div>
          </div>
          <div className="absolute top-4 right-4 z-10">
            <CloseButton onClose={onClose} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryLightbox;
