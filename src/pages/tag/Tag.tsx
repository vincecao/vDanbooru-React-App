import React, { useState, useEffect, ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { NonIdealState } from '@blueprintjs/core';
import { getPhotos } from '../../services/booruServices';
import TagSearchInput from '../../components/TagComponent/TagSearchInput';
import Gallery, { Photo } from '../../components/gallery/Gallery';

function TagInfo({ message = '', isError = false }: { message: string; isError: boolean }) {
  return <p className={`p-5 pt-0 font-mono ${isError ? 'text-red-500' : ''}`}>{message}</p>;
}

export default function Tag(): ReactElement {
  const { key } = useParams();
  const [isLoad, setIsLoad] = useState(true);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isError, setIsError] = useState(false);
  const [searchInfo, setSearchInfo] = useState('');

  useEffect(() => {
    if (key) {
      setIsLoad(true);
      getPhotos(key, 50)
        .then((myPhotos: Photo[]) => {
          setPhotos(myPhotos);
          setSearchInfo(`${myPhotos.length} results show`);
        })
        .catch((error) => {
          setIsError(true);
          setSearchInfo(error.message);
        })
        .finally(() => setIsLoad(false));
    }
  }, [key]);

  return (
    <div className="flex-1 bg-gray-200 dark:bg-gray-600 py-8">
      <TagSearchInput key={`tags-input-${key}`} />
      <TagInfo isError={isError} message={isLoad ? 'Loading...' : searchInfo} />
      {!isLoad && (!photos || photos.length) === 0 ? (
        <div className="mx-auto mt-32">
          <NonIdealState icon="search" title="No result" description={`No record found with ${key}`} />
        </div>
      ) : (
        <Gallery photos={photos} key={`tags-gallery-${key}`} />
      )}
    </div>
  );
}
