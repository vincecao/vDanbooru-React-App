import React from 'react';
import SearchInput from './SearchInput';
import { connect } from 'react-redux';
import { updateBackgroundImageAction } from '../../actions/updateBackgroundImageAction';

class Search extends React.Component {
  constructor(props) {
    super(props);
    if (!this.props.searchBackground) this.updateBackground();
    this.props.updateCurrentPage('search');
  }

  updateBackground = this.props.updateBackImageSrc;

  render() {
    const { searchBackground } = this.props;
    const backgroundImage = `linear-gradient(to bottom, rgba(247, 247, 247, 0.52), rgba(62, 57, 61, 0.73)), url(${searchBackground})`;
    return (
      <div className="flex-1 flex flex-col justify-center bg-cover bg-center" style={{ backgroundImage }}>
        <h1 className="font-semibold text-white text-center font-display text-shadow-display">vDanbooru Search</h1>
        <SearchInput />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  searchBackground: state.favorite.searchBackground,
  currentPage: state.favorite.currentPage,
});

const mapDispatchToProps = (dispatch) => ({
  updateBackImageSrc: () => {
    return dispatch(updateBackgroundImageAction());
  },
  updateCurrentPage: (currentPage) => {
    return dispatch({ type: 'UPDATE_CURRENT_PAGE', currentPage });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
