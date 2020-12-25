import React, { FC, ReactNode } from 'react';

export interface UniversalButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
  color?: string;
  minimal?: boolean;
  loading?: boolean;
  disabled?: boolean;
  tagName?: string;
  href?: string;
  download?: string;
  testid?: string;
  text?: string;
}

export interface WrapperProps {
  [propName: string]: any;
}

const UniversalButton: FC<UniversalButtonProps> = ({
  children,
  onClick,
  className,
  color = 'default',
  minimal = false,
  loading = false,
  disabled,
  tagName = 'button',
  href = '',
  download = '',
  testid = '',
  text = '',
}) => {
  const Wrapper: FC<WrapperProps> = (props) =>
    tagName === 'button' ? (
      <button type="button" {...props} />
    ) : tagName === 'anchor' ? (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a {...props} href={href} target="_blank" rel="noopener noreferrer" download={download} />
    ) : tagName === 'div' ? (
      <div {...props} />
    ) : (
      <button type="button" {...props} />
    );

  // make compatible for PurgeCSS
  let minimalColor;
  let mainColor;
  let mainTextColor;

  switch (color) {
    case 'gray':
      minimalColor = 'hover:bg-gray-200';
      mainColor = 'bg-gray-400 hover:bg-gray-100';
      mainTextColor = 'text-gray-700 hover:text-gray-800';
      break;
    case 'red':
      minimalColor = 'hover:bg-red-200';
      mainColor = 'bg-red-300 hover:bg-red-100';
      mainTextColor = 'text-red-700 hover:text-red-800';
      break;
    case 'yellow':
      minimalColor = 'hover:bg-yellow-200';
      mainColor = 'bg-yellow-300 hover:bg-yellow-100';
      mainTextColor = 'text-yellow-700 hover:text-yellow-800';
      break;
    case 'green':
      minimalColor = 'hover:bg-green-200';
      mainColor = 'bg-green-300 hover:bg-green-100';
      mainTextColor = 'text-green-700 hover:text-green-800';
      break;
    case 'blue':
      minimalColor = 'hover:bg-blue-200';
      mainColor = 'bg-blue-300 hover:bg-blue-100';
      mainTextColor = 'text-blue-700 hover:text-blue-800';
      break;
    case 'indigo':
      minimalColor = 'hover:bg-indigo-200';
      mainColor = 'bg-indigo-300 hover:bg-indigo-100';
      mainTextColor = 'text-indigo-700 hover:text-indigo-800';
      break;
    case 'purple':
      minimalColor = 'hover:bg-purple-200';
      mainColor = 'bg-purple-300 hover:bg-purple-100';
      mainTextColor = 'text-purple-700 hover:text-purple-800';
      break;
    case 'pink':
      minimalColor = 'hover:bg-pink-200';
      mainColor = 'bg-pink-300 hover:bg-pink-100';
      mainTextColor = 'text-pink-700 hover:text-pink-800';
      break;
    case 'white':
      minimalColor = 'hover:text-gray-700';
      mainColor = 'bg-white hover:bg-gray-300';
      mainTextColor = 'text-black';
      break;
    case 'black':
      minimalColor = 'hover:text-gray-300';
      mainColor = 'bg-black hover:bg-gray-700';
      mainTextColor = 'text-white';
      break;
    default:
      minimalColor = 'hover:text-gray-200';
      mainColor = 'bg-gray-100 dark:bg-gray-600 hover:bg-gray-300';
      mainTextColor = 'text-white';
  }

  return (
    <Wrapper
      data-testid={testid}
      className={`mb-1 ${
        !minimal ? `${mainColor}` : minimalColor
      } ${mainTextColor} hover:no-underline disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1 font-bold rounded inline-flex items-center ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading && (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Loading</span>
        </>
      )}
      {!loading && children}
      {text && <p className="break-all text-left">{text}</p>}
    </Wrapper>
  );
};

export default UniversalButton;
