import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, handleBlogLiked, handleRemoveBlog, user }) => {
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleDetailClick = () => {
    setDetailsExpanded(!detailsExpanded);
  };

  const blogLiked = async () => {
    const newLikeCount = likes + 1;
    setLikes(newLikeCount);
    handleBlogLiked({ ...blog, likes: newLikeCount });
  };

  const removeBlog = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      handleRemoveBlog(blog);
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <button className='toggleDetailsBtn' onClick={handleDetailClick}>
        {detailsExpanded ? 'Hide' : 'Show'} Details
      </button>
      <div className='blogDetail' style={{ display: detailsExpanded ? '' : 'none' }}>
        <div>{blog.url}</div>
        <div>
          Likes: {likes}
          <button onClick={blogLiked}>Like</button>
        </div>
        <div>
          <button
            style={{
              display:
                user && user.id === blog.user.id ? '' : 'none',
            }}
            onClick={removeBlog}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleBlogLiked: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default Blog;
