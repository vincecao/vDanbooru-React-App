export const getCorsOptions = () => {
  const corsWhitelist = ['https://vince-amazing.com', 'https://localhost:3000'];
  return {
    origin: function (origin: string, callback: Function) {
      if (corsWhitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };
};
