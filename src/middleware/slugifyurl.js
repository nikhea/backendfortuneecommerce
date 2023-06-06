import slugify from "slugify";

export const slugifyURL = (url) => {
  const slug = slugify(url, {
    lower: true,
  });
  return slug;
};
