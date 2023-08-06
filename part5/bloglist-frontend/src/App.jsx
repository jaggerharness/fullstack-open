import { useState, useEffect, useRef } from 'react';
import './index.css';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ message: '', type: '' });

  const blogFormRef = useRef();

  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await blogService.getAll();
      console.log(blogs);
      setBlogs(blogs);
    }
    fetchBlogs();
  }, []);

  useEffect(() => {
    const savedUserDetails = window.localStorage.getItem('loggedInUser');
    if (savedUserDetails) {
      const user = JSON.parse(savedUserDetails);
      handleUserDetails(user);
    }
  }, []);

  const handleUserDetails = (user) => {
    blogService.setToken(user.token);
    setUser(user);
  };

  const handleShowNotification = ({ message, type }) => {
    setMessage({ message, type });

    setTimeout(() => {
      setMessage({ message: '', type: '' });
    }, 3000);
  };

  const handleCreateBlog = async (newBlog) => {
    try {
      const addedBlog = await blogService.create(newBlog);
      console.log(addedBlog);
      setBlogs(blogs.concat(addedBlog));
      handleShowNotification({
        message: `New Blog: ${addedBlog.title} by ${addedBlog.author} added successfully`,
        type: 'success',
      });
      blogFormRef.current.toggleVisibility();
    } catch (exception) {
      if (exception.response.status === 401) {
        handleLogout();
        handleShowNotification({
          message: 'Session expired. Please login to create new blog.',
          type: 'error',
        });
        return;
      }
      handleShowNotification({
        message: 'An unexpected error occurred. Please try again.',
        type: 'error',
      });
    }
  };

  const handleBlogLiked = async (likedBlog) => {
    try {
      await blogService.update(likedBlog);
      handleShowNotification({
        message: `Blog: ${likedBlog.title} liked`,
        type: 'success',
      });
    } catch (exception) {
      setMessage({
        message: 'An unexpected error occurred. Please try again.',
        type: 'error',
      });
      setTimeout(() => {
        setMessage({ message: '', type: '' });
      }, 3000);
    }
  };

  const handleRemoveBlog = async (blogToRemove) => {
    try {
      await blogService.remove(blogToRemove);
      handleShowNotification({
        message: `Blog: ${blogToRemove.title} deleted`,
        type: 'success',
      });
      setBlogs(blogs.filter((blog) => blog.id !== blogToRemove.id));
    } catch (exception) {
      if (exception.response.status === 401 && exception.response.data === '') {
        handleLogout();
        handleShowNotification({
          message: 'Session expired. Please login to create new blog.',
          type: 'error',
        });
        return;
      }
      setMessage({
        message: 'An unexpected error occurred. Please try again.',
        type: 'error',
      });
      setTimeout(() => {
        setMessage({ message: '', type: '' });
      }, 3000);
    }
  };

  const handleLogin = async (userDetails) => {
    try {
      const user = await loginService.attemptLogin(userDetails);
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      handleUserDetails(user);
    } catch (exception) {
      setMessage({
        message: 'Username or password incorrect. Please try again.',
        type: 'error',
      });
      setTimeout(() => {
        setMessage({ message: '', type: '' });
      }, 3000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  return (
    <div>
      <Notification message={message} />
      <h2>Blogs</h2>
      {user === null ? (
        <Togglable buttonLabel="Login To Create New Blog">
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
      ) : (
        <div>
          You are logged in as {user.name}
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      <div style={{ marginTop: 20 }}>
        {blogs
          .sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleBlogLiked={handleBlogLiked}
              handleRemoveBlog={handleRemoveBlog}
              user={user}
            />
          ))}
      </div>
      {user !== null && (
        <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
          <BlogForm handleCreateBlog={handleCreateBlog} />
        </Togglable>
      )}
    </div>
  );
};

export default App;
