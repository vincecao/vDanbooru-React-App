import { DEFAULTLST } from '../const/data';

export const getRandomKey = () => DEFAULTLST[Math.floor(Math.random() * DEFAULTLST.length)];
