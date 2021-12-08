import axios from 'axios';
import { Photo } from '../components/gallery/Gallery';

const BOORU_SERVER = `${process.env.REACT_APP_BASE_URL_DEV}/api`;

export const getPhotos = (tag: string, itemCount = 25) : Promise<Photo[]> => axios.get(`${BOORU_SERVER}/safe/Normal/tag/${tag}/num/${itemCount}`).then((response) => response.data);
export const getRandomPhotos = (tag: string): Promise<string> => axios.get(`${BOORU_SERVER}/safe/Random/tag/${tag}/num/1`).then((response) => response.data);
