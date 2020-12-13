export const deleteSingleAction = (imgObj) => {
  return (dispatch, getState, firebase) => {
    dispatch({ type: 'DELETE_ALL_FAVS' });
  };
};
