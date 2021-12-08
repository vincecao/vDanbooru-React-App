import React, { useContext, ReactElement } from 'react';
import { Icon } from '@blueprintjs/core';
import { ThemeContext } from '../../contexts/themeContext';
import UniversalButton from './UniversalButton';

interface photoProps {
  src: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
}

interface DownloadButtonProps {
  photo: photoProps;
}

export function DownloadButton({ photo }: DownloadButtonProps): ReactElement {
  return (
    <UniversalButton
      tagName="anchor"
      color="indigo"
      className="mr-2"
      text="Download"
      href={photo.src}
      download={photo.src}
    />
  );
}

interface PaginationButtonProps {
  myRole: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
}

export function PaginationButton(props: PaginationButtonProps): ReactElement {
  const { myRole: role = 'next' } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <UniversalButton {...props} className="rounded-full">
      <Icon className="px-1" icon={role === 'next' ? 'arrow-right' : 'arrow-left'} />
    </UniversalButton>
  );
}

export function ToggleThemeButton(): ReactElement {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <UniversalButton color={theme === 'dark' ? 'yellow' : 'gray'} className="mr-2" onClick={toggleTheme}>
      <Icon className="px-1" icon={theme === 'dark' ? 'flash' : 'moon'} />
    </UniversalButton>
  );
}
