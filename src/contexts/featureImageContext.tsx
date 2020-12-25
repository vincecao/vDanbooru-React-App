import React, { FC, createContext, useState, useEffect, ReactNode } from 'react';
import { getRandomPhotos } from '../services/safebooruServices';

type IContextProps = {
  featureImage: string;
  setFeatureImage: (active: string) => void;
  switchImage: () => void;
};

export const FeatureImageContext = createContext({
  featureImage: '',
  setFeatureImage: () => {},
  switchImage: () => {},
} as IContextProps);


interface FeatureImageProviderProps {
  children: ReactNode;
};

const FeatureImageProvider: FC<FeatureImageProviderProps> = ({ children }) => {
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
