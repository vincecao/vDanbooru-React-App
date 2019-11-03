
import { DOMAIN, DEFAULT_BACKGROUND } from "../components/res/defaultRes";
import axios from "axios";

export const updateBackgroundImageAction = (imgObj) => {
    return (dispatch, getState, firebase) => {
        //let url = 'http://localhost:8080/api/mode/Random/tag/scenery/num/1'
        let url = DOMAIN + "/api/mode/Random/tag/scenery/num/1";
        axios.get(url).then(res => {
            dispatch({ type: "UPDATE_SEARCH_BACKGROUND", searchBackground: res.data });
        }).catch(err => {
            dispatch({ type: "UPDATE_SEARCH_BACKGROUND", searchBackground: DEFAULT_BACKGROUND });
        });
    }
}