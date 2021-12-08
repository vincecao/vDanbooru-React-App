import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRandomKey } from '../../utilis';

const IndexInput = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const searchTerm = getRandomKey();

  const handleKeyDown = (nativeEvent: any, searchValue: string) =>
    nativeEvent.keyCode === 13 && navigate(`/tags/${searchValue}`);
  const handleInputOnChange = ({ nativeEvent }: { nativeEvent: any }) => setSearchValue(nativeEvent.target.value);

  return (
    <div className="bp3-input-group bp3-large w-4/5 md:w-3/5 mx-auto max-w-xl">
      <span className="bp3-icon bp3-icon-search" />
      <input
        type="text"
        className="bp3-input backdrop-blur-light dark:backdrop-blur-dark"
        placeholder={searchTerm}
        onChange={handleInputOnChange}
        value={searchValue}
        onKeyDown={({ nativeEvent }) => handleKeyDown(nativeEvent, searchValue)}
      />
      <Link className="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right" to={`/tags/${searchValue}`} />
    </div>
  );
};

export default IndexInput;
