require('dotenv').config();
const Booru = require('booru');

const getFormatImageList = (posts: any[]): any =>
  posts.map((post) => {
    const { tags, data = {}, sampleHeight, sampleWidth, height, width, id } = post;
    const randomTags = tags
      .sort(() => 0.5 - Math.random())
      .slice(0, 25)
      .map((tag: string) => ({ value: tag, title: tag }));
    const src = '//safebooru.org//images/' + data.directory + '/' + data.image + '?' + data.id;
    let thumbnail = src;
    if (data.sample === true) {
      thumbnail = `//safebooru.org//samples/${data.directory}/sample_${data.image
        .replace('.png', '.jpg')
        .replace('.jpeg', '.jpg')}?${data.id}`;
    }
    return {
      src,
      thumbnail,
      thumbnailHeight: sampleHeight ? sampleHeight : height,
      thumbnailWidth: sampleWidth ? sampleWidth : width,
      caption: id,
      tags: randomTags,
    };
  });

export const getBooruImage = (type: string, tag: string, number: number): Promise<any[] | string | Error> => {
  const typeEnum = ['Random', 'Full', 'Normal'];
  if (!typeEnum.includes(type)) return Promise.reject(new Error('Invalid type'));

  return Booru.search('safebooru', [tag /*, 'score:>=1'*/], {
    limit: number,
    random: true,
    //random: (type === 'Random') ? true : false
  }).then((posts: any[]) => {
    if (type === 'Full') return [...posts];

    const populatedList = getFormatImageList(posts);

    if (type === 'Random') return populatedList[0].src;

    if (type === 'Normal') return populatedList;
  });
};
