import React, {
  createContext, useState, ReactNode, ReactElement, useMemo,
} from 'react';
import { emptyFunc } from '../utilis';

type IContextProps = {
  isLightBoxMode: boolean;
  setIsLightBoxMode: (active: boolean) => void;
}

export const LightBoxContext = createContext({
  isLightBoxMode: false,
  setIsLightBoxMode: emptyFunc,
} as IContextProps);

interface LightBoxProviderProps {
  children: ReactNode;
}

export default function LightBoxProvider({ children }: LightBoxProviderProps): ReactElement {
  const [isLightBoxMode, setIsLightBoxMode] = useState(false);
  const value = useMemo(() => ({ isLightBoxMode, setIsLightBoxMode }), [isLightBoxMode]);
  return <LightBoxContext.Provider value={value}>{children}</LightBoxContext.Provider>;
}
