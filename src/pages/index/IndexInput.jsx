import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getRandomKey } from '../../utilis';

const IndexInput = () => {
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();
  const searchTerm = getRandomKey();

  const handleKeyDown = (nativeEvent, searchTerm) => nativeEvent.keyCode === 13 && history.push(`/tags/${searchTerm}`);
  const handleInputOnChange = ({ nativeEvent }) => setSearchValue(nativeEvent.target.value);

  return (
    <div className="bp3-input-group bp3-large w-4/5 md:w-3/5 mx-auto max-w-xl">
      <span className="bp3-icon bp3-icon-search" />
      <input
        type="text"
        className="bp3-input backdrop-blur-light dark:backdrop-blur-dark"
        placeholder={searchTerm}
        onChange={handleInputOnChange}
        value={searchValue}
        onKeyDown={({ nativeEvent }) => handleKeyDown(nativeEvent, searchTerm)}
      />
      <Link className="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right" to={`/tags/${searchTerm}`} />
    </div>
  );
};

export default IndexInput;
