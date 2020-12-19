import { Icon } from '@blueprintjs/core';
import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/themeContext';
import UniversalButton from './UniversalButton';

export const DownloadButton = ({ photo = {} }) => (
  <UniversalButton
    tagName="anchor"
    color="indigo"
    className="mr-2"
    text="Download"
    href={photo.src}
    download={photo.src}
  />
);

export const PaginationButton = (props) => {
  const { role = 'next' } = props;
  return (
    <UniversalButton {...props} className="mr-2">
      <Icon className="px-1" icon={role === 'next' ? 'arrow-right' : 'arrow-left'} />
    </UniversalButton>
  );
};

export const ToggleThemeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <UniversalButton color={theme === 'dark' ? 'yellow' : 'gray'} className="mr-2" onClick={toggleTheme}>
      <Icon className="px-1" icon={theme === 'dark' ? 'flash' : 'moon'} />
    </UniversalButton>
  );
};
