import * as util from '../utils/utils';

require('dotenv').config();
const Booru = require('booru');

export const getBooruImage = (
  site: string,
  type: string,
  tag: string,
  number: number
): Promise<any[] | string | Error> => {
  const typeEnum = ['Random', 'Full', 'Normal'];
  if (!typeEnum.includes(type)) return Promise.reject(new Error('Invalid type'));
  return Booru.search(site, [tag], {
    limit: number,
    random: true
    // random: (type === 'Random') ? true : false
  })
    .then((posts: any[]) => {
      switch (site) {
        case 'safe':
          return util.getFormatSafebooruImageList(posts);
        default:
          return util.getFormatImageList(posts);
      }
    })
    .then((posts: PopulatedPostType[]) => {
      if (type === 'Random') return (posts[0] || {}).src || '';
      if (type === 'Normal') return posts;
    });
};

export const getBooruSiteList = () =>
  // axios.get('//raw.githubusercontent.com/AtlasTheBot/booru/master/src/sites.json').then((response) => response.data);
  Promise.resolve(require('../consts/sites.json'));
