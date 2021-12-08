import React, { useEffect, useState, useRef, FC } from 'react';
import { EditableText, H1, Tooltip } from '@blueprintjs/core';
import { useNavigate, useParams } from 'react-router-dom';

const TagSearchInput = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const intervalID = useRef(-1 as number);

  const [placeholder, setPlaceholder] = useState('');
  const [keywords, setKeywords] = useState('');
  const [showIndicate, setShowIndicate] = useState(true);

  useEffect(() => {
    intervalID.current = window.setInterval(() => setShowIndicate((_showIndicate) => !_showIndicate), 1000);
    return () => window.clearInterval(intervalID.current);
  }, []);

  useEffect(() => {
    key && setPlaceholder(key);
  }, [key]);

  interface IndicatorProps {
    showIndicate: boolean;
  }

  const Indicator: FC<IndicatorProps> = ({ showIndicate }) => (
    <span className={`${showIndicate === true ? 'opacity-100' : 'opacity-0'} mr-2`}>:</span>
  );

  const handleOnConfirm = () => keywords && navigate(`/tags/${keywords}`);
  const handleOnChange = setKeywords;

  return (
    <Tooltip className="bp3-minimal" content="vDanbooru search is here!" position="right">
      <H1 className="m-10">
        <Indicator showIndicate={showIndicate} />
        <EditableText
          maxLength={20}
          placeholder={placeholder || 'Type something...'}
          selectAllOnFocus
          onChange={handleOnChange}
          value={keywords.trim().toLowerCase().replace(' ', '')}
          confirmOnEnterKey
          onConfirm={handleOnConfirm}
        />
      </H1>
    </Tooltip>
  );
};

TagSearchInput.propTypes = {};

export default TagSearchInput;
