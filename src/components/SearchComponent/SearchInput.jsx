import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { DEFAULTLST } from '../../const/data';

class SearchInput extends Component {
  state = {
    value: '',
  };

  handleKeyDown = ({ nativeEvent }, searchTerm) => {
    if (nativeEvent.keyCode === 13) this.props.history.push(`/tags/${searchTerm}`);
  };

  handleInputOnChange = ({ nativeEvent }) => this.setState({ value: nativeEvent.target.value });

  render() {
    const { value } = this.state;
    const searchTerm = value || DEFAULTLST[Math.floor(Math.random() * DEFAULTLST.length)];

    return (
      <div className="bp3-input-group bp3-large w-4/5 md:w-3/5 mx-auto max-w-xl">
        <span className="bp3-icon bp3-icon-search" />
        <input
          type="text"
          className="bp3-input"
          placeholder="Enter something to search..."
          onChange={this.handleInputOnChange}
          onKeyDown={(e) => this.handleKeyDown(e, searchTerm)}
        />
        <Link className="bp3-button bp3-minimal bp3-intent-primary bp3-icon-arrow-right" to={`/tags/${searchTerm}`} />
      </div>
    );
  }
}

export default withRouter(SearchInput);
