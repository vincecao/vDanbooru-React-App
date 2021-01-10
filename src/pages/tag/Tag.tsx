import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NonIdealState } from '@blueprintjs/core';
import { getPhotos } from '../../services/booruServices';
import TagSearchInput from '../../components/TagComponent/TagSearchInput';
import Gallery from '../../components/gallery/Gallery';

interface ParamTypes {
  key: string;
}

const TagInfo = ({ message = '', isError = false }: { message: string; isError: boolean }) => {
  return <p className={`p-5 pt-0 font-mono ${isError ? 'text-red-500' : ''}`}>{message}</p>;
};

const Tag = () => {
  const { key = '' } = useParams<ParamTypes>();
  const [isLoad, setIsLoad] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [isError, setIsError] = useState(false);
  const [searchInfo, setSearchInfo] = useState('');

  useEffect(() => {
    if (key) {
      Promise.resolve()
        .then(() => setIsLoad(true))
        .then(() => getPhotos(key, 50))
        .then((photos) => {
          setPhotos(photos);
          setSearchInfo(`${photos.length} results show`);
        })
        .catch((error) => {
          setIsError(true);
          setSearchInfo(error.message);
        })
        .then(() => setIsLoad(false));
    }
  }, [key]);

  return (
    <div className="flex-1 bg-gray-200 dark:bg-gray-600 py-8">
      <TagSearchInput key={`tags-input-${key}`} />
      <TagInfo isError={isError} message={isLoad ? 'Loading...' : searchInfo} />
      {!photos || photos.length === 0 ? (
        <div className="mx-auto mt-32">
          <NonIdealState icon="search" title="No result" description={`No record found with ${key}`} />
        </div>
      ) : (
        <Gallery photos={photos} key={`tags-gallery-${key}`} />
      )}
    </div>
  );
};

Tag.propTypes = {};

export default Tag;
