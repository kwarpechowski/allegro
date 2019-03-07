const allowedKeys = ['subscriberCount', 'videoCount', 'viewCount'];
export default ({
  statistics,
  localized: { title },
  thumbnails,
  customUrl
}) => ({
  title,
  customUrl,
  thumbnails,
  statistics: allowedKeys.reduce(
    (p, c) => ({ ...p, [c]: Number(statistics[c]) }),
    {}
  )
});
