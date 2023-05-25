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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
