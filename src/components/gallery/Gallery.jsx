import React, { useState } from 'react';
import GalleryLightbox from './GalleryLightbox';

const Gallery = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 px-2">
        {photos &&
          typeof photos === 'object' &&
          photos.map((photo) => {
            const { src, caption, thumbnail, thumbnailHeight, thumbnailWidth } = photo;
            return (
              <button
                type="button"
                onClick={() => setSelectedPhoto(photo)}
                className={`overflow-hidden ${thumbnailHeight < thumbnailWidth ? '' : 'row-span-2'}`}
              >
                <img src={thumbnail} alt={caption} className="min-h-full min-w-full rounded-lg object-cover" />
              </button>
            );
          })}
      </div>
      {selectedPhoto && <GalleryLightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />}
    </>
  );
};

Gallery.propTypes = {};

export default Gallery;
