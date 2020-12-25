import React, { useContext, FC } from 'react';
import { Icon } from '@blueprintjs/core';
import { ThemeContext } from '../../contexts/themeContext';
import UniversalButton from './UniversalButton';

interface photoProps {
  src: string,
  [propName: string]: any;
}

interface DownloadButtonProps {
  photo: photoProps;
}


export const DownloadButton: FC<DownloadButtonProps> = ({ photo }) => {
  return (
    <UniversalButton
      tagName="anchor"
      color="indigo"
      className="mr-2"
      text="Download"
      href={photo.src}
      download={photo.src}
    />
  )
};

interface PaginationButtonProps {
  role: string;
  [propName: string]: any;
}

export const PaginationButton: FC<PaginationButtonProps> = (props) => {
  const { role = 'next' } = props;
  return (
    <UniversalButton {...props} className="mr-2">
      <Icon className="px-1" icon={role === 'next' ? 'arrow-right' : 'arrow-left'} />
    </UniversalButton>
  );
};

interface ToggleThemeButtonProps {
 
}

export const ToggleThemeButton: FC<ToggleThemeButtonProps> = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <UniversalButton color={theme === 'dark' ? 'yellow' : 'gray'} className="mr-2" onClick={toggleTheme}>
      <Icon className="px-1" icon={theme === 'dark' ? 'flash' : 'moon'} />
    </UniversalButton>
  );
};
