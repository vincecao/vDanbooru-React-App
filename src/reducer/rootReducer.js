const initState = {
  searchBackground: "",
  photos: [],
  favs: JSON.parse(localStorage.getItem("vDanbooru-fav") === "undefined" ? "[]" : localStorage.getItem("vDanbooru-fav")),
  isLoad: false,
  isSignInOpen: false,
  signInWindowsState: {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    isOpen: false,
    usePortal: true,
  },
  signInHelperMessage: '',
  signInInfo: {
    'signin-email': '',
    'signin-password': ''
  },
  isSignUpOpen: false,
  signUpWindowsState: {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    isOpen: false,
    usePortal: true,
  },
  signUpHelperMessage: '',
  signUpInfo: {
    'signup-nickname': '',
    'signup-email': '',
    'signup-password': ''
  }
};

const rootReducer = (state = initState, action) => {
  if (action.type === "UPDATE_PHOTOS") {
    return {
      ...state,
      isLoad: true
    };
  }
  if (
    action.type === "UPDATE_PHOTOS_SUCCESS" ||
    action.type === "UPDATE_PHOTOS_FAILURE"
  ) {
    //let tempPhoto = [...action.photos];
    action.photos.forEach(photo => {
      if (state.favs != null) {
        for (let i = 0; i < state.favs.length; i++) {
          const fav = state.favs[i];
          if (fav.src === photo.src) {
            photo.isSelected = true;
            break;
          }
        }
      }
    });
    return {
      ...state,
      photos: action.photos,
      isLoad: false
    };
  }
  if (action.type === "UPDATE_SEARCH_BACKGROUND") {
    return {
      ...state,
      searchBackground: action.searchBackground
    };
  }
  if (action.type === "ADD_FAVS") {
    let favs = [...state.favs, action.imgObj];
    localStorage.setItem("vDanbooru-fav", JSON.stringify(favs));
    return {
      ...state,
      favs: [...state.favs, action.imgObj]
    };
  }
  if (action.type === "DELETE_FAVS") {
    let favs = state.favs.filter(fav => action.imgObj.src !== fav.src);
    localStorage.setItem("vDanbooru-fav", JSON.stringify(favs));
    return {
      ...state,
      favs
    };
  }
  if (action.type === "DELETE_ALL_FAVS") {
    let favs = [];
    localStorage.setItem("vDanbooru-fav", "[]");
    return {
      ...state,
      favs
    };
  }
  if (action.type === 'SHOW_SIGN_IN_WINDOW') {
    return {
      ...state,
      signInWindowsState: {
        ...state.signInWindowsState,
        isOpen: true
      }
    }
  }
  if (action.type === 'CLOSE_SIGN_IN_WINDOW') {
    return {
      ...state,
      signInWindowsState: {
        ...state.signInWindowsState,
        isOpen: false
      }
    }
  }
  if (action.type === 'CHANGE_IN_SIGN_IN') {
    return {
      ...state,
      signInInfo: {
        ...state.signInInfo,
        [action.event.target.id]: action.event.target.value
      }
    }
  }
  if (action.type === 'SHOW_SIGN_UP_WINDOW') {
    return {
      ...state,
      signUpWindowsState: {
        ...state.signUpWindowsState,
        isOpen: true
      }
    }
  }
  if (action.type === 'CLOSE_SIGN_UP_WINDOW') {
    return {
      ...state,
      signUpWindowsState: {
        ...state.signUpWindowsState,
        isOpen: false
      }
    }
  }
  if (action.type === 'CHANGE_IN_SIGN_UP') {
    return {
      ...state,
      signUpInfo: {
        ...state.signUpInfo,
        [action.event.target.id]: action.event.target.value
      }
    }
  }
  return state;
};

export default rootReducer;
