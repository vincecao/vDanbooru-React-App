import React, { createContext, useState, useEffect } from 'react';
import { getRandomPhotos } from '../services/safebooruServices';

export const FeatureImageContext = createContext();

const FeatureImageProvider = ({ children }) => {
  const [featureImage, setFeatureImage] = useState('');
  useEffect(() => {
    switchImage();
  }, []);

  const switchImage = () => getRandomPhotos('scenery').then(setFeatureImage);

  return (
    <FeatureImageContext.Provider value={{ featureImage, setFeatureImage, switchImage }}>
      {children}
    </FeatureImageContext.Provider>
  );
};
export default FeatureImageProvider;
