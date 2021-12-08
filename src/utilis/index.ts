import { DEFAULTLST } from '../const/data';

export function getRandomKey(): string {
  return DEFAULTLST[Math.floor(Math.random() * DEFAULTLST.length)];
}

export function emptyFunc(): undefined {
  return undefined;
}
