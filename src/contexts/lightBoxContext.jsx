import React, { createContext, useState } from 'react';

export const LightBoxContext = createContext();

const LightBoxProvider = ({ children }) => {
  const [isLightBoxMode, setIsLightBoxMode] = useState(false);
  return <LightBoxContext.Provider value={{ isLightBoxMode, setIsLightBoxMode }}>{children}</LightBoxContext.Provider>;
};
export default LightBoxProvider;
