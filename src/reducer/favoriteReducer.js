const initState = {
  searchBackground: null,
  photos: [],
  favs: [], //firebase.profile.favs,
  isLoad: false,
  blurEffect: 'none', //blur(0.5rem) saturate(200%),
  isLightBoxOpen: false,
  focusingImgObject: {
    src: '',
    caption: '',
    tags: [],
  },
  onSearchInHot: null,
  currentPage: 'search',
};

const favoriteReducer = (state = initState, action) => {
  if (action.type === 'UPDATE_PHOTOS_LOAD') {
    return {
      ...state,
      isLoad: true,
    };
  }
  if (action.type === 'UPDATE_PHOTOS_SUCCESS' || action.type === 'UPDATE_PHOTOS_FAILURE') {
    return {
      ...state,
      photos: action.photos,
      isLoad: false,
    };
  }
  if (action.type === 'UPDATE_SEARCH_BACKGROUND') {
    return {
      ...state,
      searchBackground: action.searchBackground,
    };
  }
  if (action.type === 'UPDATE_SEARCH_BACKGROUND_IMAGE_SRC') {
  }
  if (action.type === 'ADD_FAVS') {
    let favs = [...state.favs, action.imgObj];
    localStorage.setItem('vDanbooru-fav', JSON.stringify(favs));
    return {
      ...state,
      favs: [...state.favs, action.imgObj],
    };
  }
  if (action.type === 'DELETE_FAVS') {
    let favs = state.favs.filter((fav) => action.imgObj.src !== fav.src);
    localStorage.setItem('vDanbooru-fav', JSON.stringify(favs));
    return {
      ...state,
      favs,
    };
  }
  if (action.type === 'DELETE_ALL_FAVS') {
    let favs = [];
    localStorage.setItem('vDanbooru-fav', '[]');
    return {
      ...state,
      favs,
    };
  }
  if (action.type === 'REPLACE_ALL_FAVS') {
    let favs = action.favs;
    return {
      ...state,
      favs,
    };
  }
  if (action.type === 'SET_BLUR') {
    return {
      ...state,
      blurEffect: 'blur(0.5rem) saturate(200%)',
    };
  }
  if (action.type === 'CANCEL_BLUR') {
    return {
      ...state,
      blurEffect: 'none',
    };
  }
  if (action.type === 'CLOSE_LIGHT_BOX') {
    return {
      ...state,
      isLightBoxOpen: false,
    };
  }
  if (action.type === 'OPEN_LIGHT_BOX') {
    return {
      ...state,
      isLightBoxOpen: true,
    };
  }
  if (action.type === 'UPDATE_FOCUS_IMG') {
    return {
      ...state,
      focusingImgObject: action.focusingImgObject,
    };
  }
  if (action.type === 'MOUNT_ON_SEARCH') {
    return {
      ...state,
      onSearchInHot: action.onSearchInHot,
    };
  }
  if (action.type === 'UPDATE_CURRENT_PAGE') {
    return {
      ...state,
      currentPage: action.currentPage,
    };
  }
  return state;
};
export default favoriteReducer;
