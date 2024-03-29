import React, { useState, ReactElement } from 'react';
import GalleryLightbox from './GalleryLightbox';

export interface Tag {
  value: string;
  title: string;
}

export interface Photo {
  src: string;
  tags: Tag[];
  caption: string;
  thumbnail: string;
  thumbnailHeight: number;
  thumbnailWidth: number;
}

interface GalleryProps {
  photos: Photo[];
}

export default function Gallery({ photos }: GalleryProps): ReactElement {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const prevDisabled = selectedIndex <= 0;
  const nextDisabled = selectedIndex >= photos.length - 1;
  const handleOnNext = () => !nextDisabled && setSelectedIndex((_index) => _index + 1);
  const handleOnPrev = () => !prevDisabled && setSelectedIndex((_index) => _index - 1);
  const handleOnClose = () => setSelectedIndex(-1);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 px-2">
        {photos
          && typeof photos === 'object'
          && photos.map((photo, index) => {
            const {
              caption, thumbnail, thumbnailHeight, thumbnailWidth,
            } = photo;
            return (
              <button
                key={caption}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`overflow-hidden ${thumbnailHeight < thumbnailWidth ? '' : 'row-span-2'}`}
              >
                <img src={thumbnail} alt={caption} className="min-h-full min-w-full max-h-56 rounded-xl object-cover" />
              </button>
            );
          })}
      </div>
      {selectedIndex > -1 && (
        <GalleryLightbox
          photo={photos[selectedIndex]}
          onNext={handleOnNext}
          onPrev={handleOnPrev}
          onClose={handleOnClose}
          prevDisabled={prevDisabled}
          nextDisabled={nextDisabled}
        />
      )}
    </>
  );
}
