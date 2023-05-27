var _ = require("lodash");

const dummy = (blogs) => {
  console.log(blogs);
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce(
    (accumulator, currentValue) => accumulator + currentValue.likes,
    0
  );
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return blogs;
  }
  return blogs.reduce((accumulator, currentValue) =>
    accumulator.likes > currentValue.likes ? accumulator : currentValue
  );
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return blogs;
  }

  const authorCounts = _.countBy(blogs, "author");
  const authorWithMostBlogs = _.maxBy(
    _.keys(authorCounts),
    (author) => authorCounts[author]
  );

  const numberOfBlogs = authorCounts[authorWithMostBlogs];

  return {
    author: authorWithMostBlogs,
    blogs: numberOfBlogs,
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return blogs;
  }

  const likesByAuthor = _.groupBy(blogs, 'author');
  const authorLikes = _.mapValues(likesByAuthor, (blogs) => _.sumBy(blogs, 'likes'));
  const authorWithMostLikes = _.maxBy(_.keys(authorLikes), (author) => authorLikes[author]);
  const numberOfLikes = authorLikes[authorWithMostLikes];

  return {
    author: authorWithMostLikes,
    likes: numberOfLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
