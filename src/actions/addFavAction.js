export const addFavAction = (imgObj) => {
  return (dispatch, getState, firebase) => {
    let uid = firebase.auth().uid
    const firestore = firebase.firestore()
    firestore.collection('vd-favPhotos')
      .doc(uid)
      .set({
        favs: []
      })
      .then(() => {
        dispatch({ type: "DELETE_ALL_FAVS" });
      }).catch(err => {
        //dispath({ type: 'SIGNUP_ERROR', err })
      })
  }
}