import { useState, useEffect, useRef } from "react";
import "./index.css";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ message: "", type: "" });

  const blogFormRef = useRef();

  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    }
    fetchBlogs();
  }, []);

  useEffect(() => {
    const savedUserDetails = window.localStorage.getItem("loggedInUser");
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
      setMessage({ message: "", type: "" });
    }, 3000);
  };

  const handleUsernameChange = (username) => {
    setUsername(username);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
  };

  const handleCreateBlog = async (newBlog) => {
    try {
      const addedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(addedBlog));
      handleShowNotification({
        message: `New Blog: ${addedBlog.title} by ${addedBlog.author} added successfully`,
        type: "success",
      });
      blogFormRef.current.toggleVisibility();
    } catch (exception) {
      console.log(exception);
      handleShowNotification({
        message: "An unexpected error occurred. Please try again.",
        type: "error",
      });
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.attemptLogin({ username, password });
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      handleUserDetails(user);
    } catch (exception) {
      setMessage({
        message: `Username or password incorrect. Please try again.`,
        type: "error",
      });
      setTimeout(() => {
        setMessage({ message: "", type: "" });
      }, 3000);
    }

    setUsername("");
    setPassword("");
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  return (
    <div>
      <Notification message={message} />
      <h2>blogs</h2>
      {user === null ? (
        <Togglable buttonLabel="Login To Create New Blog">
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
          />
        </Togglable>
      ) : (
        <div>
          You are logged in as {user.name}
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      <div style={{ marginTop: 20 }}>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
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
