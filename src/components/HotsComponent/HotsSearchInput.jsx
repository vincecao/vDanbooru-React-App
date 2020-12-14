import React, { useEffect, useState, useRef } from 'react';
import { EditableText, H1, Tooltip } from '@blueprintjs/core';
import { useDispatch } from 'react-redux';
import { updatePhotoAction } from '../../actions/updatePhotoAction';
import { useParams } from 'react-router-dom';
import { DEFAULTLST } from '../../const/data';

const HotsSearchInput = () => {
  const { key = '' } = useParams();
  const intervalID = useRef(null);

  const [placeholder, setPlaceholder] = useState('');
  const [keywords, setKeywords] = useState(key || DEFAULTLST[Math.floor(Math.random() * DEFAULTLST.length)]);
  const [showIndicate, setShowIndicate] = useState(true);

  const dispatch = useDispatch();
  const updatePhotos = (keyword) => dispatch(updatePhotoAction(keyword));
  const mountOnSearch = (onSearchInHot) => dispatch({ type: 'MOUNT_ON_SEARCH', onSearchInHot });

  useEffect(() => {
    try {
      updateSearch(keywords);
      intervalID.current = setInterval(() => setShowIndicate((_showIndicate) => !_showIndicate), 1000);
      mountOnSearch(updateSearch);
    } catch {}
    return () => clearInterval(intervalID.current);
  }, []);

  const Indicator = ({ showIndicate }) => {
    if (showIndicate === true) {
      return <span className="opacity-100">:</span>;
    } else {
      return <span className="opacity-0">:</span>;
    }
  };

  const updateSearch = (keywords) => {
    if (keywords) {
      updatePhotos(keywords);
      setPlaceholder(keywords.charAt(0).toUpperCase() + keywords.slice(1));
    } else {
      updatePhotos(-1);
      setPlaceholder('');
    }
    setKeywords('');
  };

  const handleOnConfirm = () => updateSearch(keywords);
  const handleOnChange = setKeywords;

  return (
    <Tooltip className="bp3-minimal" content="vDanbooru search is here !" position="right">
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

HotsSearchInput.propTypes = {};

export default HotsSearchInput;
