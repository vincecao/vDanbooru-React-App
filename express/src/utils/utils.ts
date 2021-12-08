export const getCorsOptions = () => {
  const corsWhitelist = ['https://vince-amazing.com', 'https://localhost:3000'];
  return {
    origin: process.env.NODE_ENV !== 'production' || function (origin: string, callback: Function) {
      if (corsWhitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  };
};

export const getFormatSafebooruImageList = (posts: SafebooruIncomingPostType[]): PopulatedPostType[] => posts.map((post) => {
  const { tags, data, sampleHeight, sampleWidth, height, width, id } = post;
  const randomTags = tags
    .sort(() => 0.5 - Math.random())
    .slice(0, 25)
    .map((tag: string) => ({ value: tag, title: tag.replace(/_/i, ' ') }));
  const src = `//safebooru.org//images/${data.directory}/${data.image}?${data.id}`;
  const thumbnail = data.sample
    ? `//safebooru.org//samples/${data.directory}/sample_${data.image
      .replace(/.png/i, '.jpg')
      .replace(/.jpeg/i, '.jpg')}?${data.id}`
    : src;
  return {
    src,
    thumbnail,
    thumbnailHeight: sampleHeight || height,
    thumbnailWidth: sampleWidth || width,
    caption: id,
    tags: randomTags
  };
});

export const getFormatImageList = (posts: IncomingPostType[]): PopulatedPostType[] => posts.map((post) => {
  const { tags, sampleHeight, sampleWidth, height, width, id, previewUrl, sampleUrl, fileUrl } = post;
  const randomTags = tags
    .sort(() => 0.5 - Math.random())
    .slice(0, 25)
    .map((tag: string) => ({ value: tag, title: tag.replace(/_/i, ' ') }));
  const src = fileUrl;
  const thumbnail = previewUrl || sampleUrl || fileUrl;

  return {
    src,
    thumbnail,
    thumbnailHeight: sampleHeight || height,
    thumbnailWidth: sampleWidth || width,
    caption: id,
    tags: randomTags
  };
});
