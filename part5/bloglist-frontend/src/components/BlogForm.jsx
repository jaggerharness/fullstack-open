import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const createBlog = (event) => {
    event.preventDefault();
    handleCreateBlog({
      title,
      author,
      url,
    });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <h2>Create New Blog</h2>
      <form onSubmit={createBlog}>
        <div>
          Title
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder='Input Title'
          ></input>
        </div>
        <div>
          Author
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='Input Author'
          ></input>
        </div>
        <div>
          URL
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder='Input URL'
          ></input>
        </div>
        <button style={{ marginTop: 3 }} type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired
}

export default BlogForm;
