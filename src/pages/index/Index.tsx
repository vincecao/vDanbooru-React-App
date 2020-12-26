import React, { useContext } from 'react';
import { FeatureImageContext } from '../../contexts/featureImageContext';
import IndexInput from './IndexInput';

const Index = () => {
  const { featureImage } = useContext(FeatureImageContext);

  const backgroundImage = `url(${featureImage})`;
  const gradientBackgroundImage = `linear-gradient(to bottom, rgba(247, 247, 247, 0.52), rgba(62, 57, 61, 0.73)), ${backgroundImage}`;

  return (
    <>
      <div
        className="fixed h-full w-full filter-blur bg-cover bg-center -z-10"
        style={{ backgroundImage: gradientBackgroundImage }}
      />
      <div
        className="flex-1 flex flex-col justify-center z-0 bg-cover md:bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage }}
      >
        <h1 className="font-semibold text-white dark:text-gray-200 text-center font-display text-shadow-display">
          vDanbooru
        </h1>
        <IndexInput />
      </div>
    </>
  );
};

export default Index;
