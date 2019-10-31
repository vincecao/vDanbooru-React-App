const initState = {
  searchBackground: "",
  photos: [],
  favs: JSON.parse(localStorage.getItem("vDanbooru-fav") === "undefined" ? [{}] : localStorage.getItem("vDanbooru-fav")),
  isLoad: false
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
      if (state.favs != null){
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
  return state;
};

export default rootReducer;
