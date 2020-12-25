import React, { FC, createContext, useState, ReactNode } from 'react';

type IContextProps = {
  isLightBoxMode: boolean;
  setIsLightBoxMode: (active: boolean) => void;
}

export const LightBoxContext = createContext({
  isLightBoxMode: false,
  setIsLightBoxMode: () => {}
} as IContextProps);

interface LightBoxProviderProps {
  children: ReactNode;
};

const LightBoxProvider: FC<LightBoxProviderProps> = ({ children }) => {
  const [isLightBoxMode, setIsLightBoxMode] = useState(false);
  return <LightBoxContext.Provider value={{ isLightBoxMode, setIsLightBoxMode }}>{children}</LightBoxContext.Provider>;
};
export default LightBoxProvider;
