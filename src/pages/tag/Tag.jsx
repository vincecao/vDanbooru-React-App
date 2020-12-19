import React, { useState, useEffect } from 'react';
import TagSearchInput from '../../components/TagComponent/TagSearchInput';
import { NonIdealState } from '@blueprintjs/core';
import Gallery from '../../components/gallery/Gallery';
import { getPhotos } from '../../services/safebooruServices';
import { useParams } from 'react-router-dom';
import UniversalButton from '../../components/button/UniversalButton';

const Tag = () => {
  const { key = '' } = useParams();
  const [isLoad, setIsLoad] = useState(true);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (key) {
      Promise.resolve()
        .then(() => setIsLoad(true))
        .then(() => getPhotos(key, 25))
        .then(setPhotos)
        .catch(console.error)
        .then(() => setIsLoad(false));
    }
  }, [key]);

  return (
    <div className="flex-1 bg-gray-200 dark:bg-gray-900">
      <TagSearchInput />
      {isLoad ? (
        <UniversalButton loading />
      ) : !photos || photos.length === 0 ? (
        <div className="mx-auto mt-32">
          <NonIdealState icon="search" title="No result" description={`No record found with ${key}`} />
        </div>
      ) : (
        <Gallery photos={photos} />
      )}
    </div>
  );
};

Tag.propTypes = {};

export default Tag;
