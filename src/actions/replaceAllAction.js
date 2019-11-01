
export const replaceAllAction = (favs) => {
  return (dispatch, getState, firebase) => {
    dispatch({ type: "REPLACE_ALL_FAVS", favs });
  }
}