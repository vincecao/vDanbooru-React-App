const initState = {
  searchBackground: '',
  photos: [],
  isLoad: false,
}

const rootReducer = (state = initState, action) => {
  if (action.type === 'UPDATE_PHOTOS') {
    return {
      ...state,
      isLoad: true
    }
  }
  if (action.type === 'UPDATE_PHOTOS_SUCCESS' || action.type === 'UPDATE_PHOTOS_FAILURE') {
    return {
      ...state,
      photos: action.photos,
      isLoad: false
    }
  }
  if (action.type === 'UPDATE_SEARCH_BACKGROUND') {
    return {
      ...state,
      searchBackground: action.searchBackground
    }
  }
  return state;
}

export default rootReducer