import axios from "axios";
import { DOMAIN } from "../components/res/defaultRes";

export const updatePhotoAction = (keyword) => {
  return (dispatch, getState, firebase) => {
    dispatch({ type: "UPDATE_PHOTOS_LOAD" });
    let url = DOMAIN + "/api/mode/Normal/tag/" + keyword + "/num/15";
    axios
      .get(url)
      .then(res => {
        const photos = res.data;
        if (!getState().firebase.profile.isEmpty) {
          photos.forEach(photo => {
            let favs = getState().firebase.profile.favs
            if (favs !== null) {
              for (let i = 0; i < favs.length; i++) {
                if (favs[i].src === photo.src) {
                  photo.isSelected = true;
                  break;
                }
              }
            }
          });
        }
        dispatch({ type: "UPDATE_PHOTOS_SUCCESS", photos });
      })
      .catch(err => {
        dispatch({ type: "UPDATE_PHOTOS_SUCCESS", photos: [] });
      });
  }
}