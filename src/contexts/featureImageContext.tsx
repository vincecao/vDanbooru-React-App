import React, {
  createContext, useState, useEffect, ReactNode, ReactElement, useMemo,
} from 'react';
import { getRandomPhotos } from '../services/booruServices';
import { emptyFunc } from '../utilis';

type IContextProps = {
  featureImage: string;
  setFeatureImage: (active: string) => void;
  switchImage: () => void;
};

export const FeatureImageContext = createContext({
  featureImage: '',
  setFeatureImage: emptyFunc,
  switchImage: emptyFunc,
} as IContextProps);

interface FeatureImageProviderProps {
  children: ReactNode;
}

export default function FeatureImageProvider({ children }: FeatureImageProviderProps): ReactElement {
  const [featureImage, setFeatureImage] = useState('');

  // eslint-disable-next-line no-console
  const switchImage = () => getRandomPhotos('scenery').then(setFeatureImage).catch(console.error);

  useEffect(() => {
    switchImage();
  }, []);

  const value = useMemo(() => ({ featureImage, setFeatureImage, switchImage }), [featureImage]);

  return <FeatureImageContext.Provider value={value}>{children}</FeatureImageContext.Provider>;
}
