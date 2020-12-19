import Axios from 'axios';

const SAFEBOORU_SERVER = process.env.REACT_APP_BASE_URL_DEV;

export const getPhotos = (tag, itemCount = 25) =>
  Axios.get(`${SAFEBOORU_SERVER}/api/mode/Normal/tag/${tag}/num/${itemCount}`).then((response) => response.data);

export const getRandomPhotos = (tag) =>
  Axios.get(`${SAFEBOORU_SERVER}/api/mode/Random/tag/${tag}/num/1`).then((response) => response.data);
