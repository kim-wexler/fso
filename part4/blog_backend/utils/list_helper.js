const _ = require("lodash");
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (acc, val) => {
    return acc + val.likes;
  };
  return blogs.reduce(reducer, 0);
};

const favouriteBlog = (blogs) => {
  const reducer = (acc, val) => {
    return acc.likes > val.likes ? acc : val;
  };
  return blogs.reduce(reducer, {});
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const sorted = _.countBy(blogs, (blog) => blog.author);
  const result = Object.entries(sorted).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0];
  return { author: result, blogs: sorted[result] };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const reducer = (acc, val) => {
    const likes = acc[val.author];
    acc[val.author] = likes ? likes + Number(val.likes) : Number(val.likes);
    return acc;
  };
  const sorted = blogs.reduce(reducer, {});
  const result = Object.entries(sorted).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[0];
  return { author: result, likes: sorted[result] };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
