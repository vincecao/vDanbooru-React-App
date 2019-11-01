
export const deleteAllAction = () => {
  return (dispatch, getState, firebase) => {
    dispatch({ type: "DELETE_ALL_FAVS" });
  }
}