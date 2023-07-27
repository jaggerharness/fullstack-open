import { useState, useEffect } from "react";
import "./index.css";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const BlogForm = ({
  handleCreateBlog,
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
}) => {
  return (
    <>
      <h2>Create New Blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          Title
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => handleTitleChange(target.value)}
          ></input>
        </div>
        <div>
          Author
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => handleAuthorChange(target.value)}
          ></input>
        </div>
        <div>
          URL
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => handleUrlChange(target.value)}
          ></input>
        </div>
        <button style={{ marginTop: 10 }} type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ message: "", type: "" });

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

  const handleTitleChange = (title) => {
    setTitle(title);
  };

  const handleAuthorChange = (author) => {
    setAuthor(author);
  };

  const handleUrlChange = (url) => {
    setUrl(url);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.attemptLogin({ username, password });
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      handleUserDetails(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage({
        message: `Username or password incorrect. Please try again.`,
        type: "error",
      });
      setTimeout(() => {
        setMessage({ message: "", type: "" });
      }, 3000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const handleCreateBlog = async (event) => {
    event.preventDefault();

    try {
      const newBlog = { title, author, url };
      const addedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(addedBlog));
      // handle notification
      setMessage({
        message: `New Blog: ${title} by ${author} added successfully`,
        type: "success",
      });
      setTimeout(() => {
        setMessage({ message: "", type: "" });
      }, 3000);
      // reset form fields
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {
      setMessage({
        message: "An unexpected error occurred. Please try again.",
        type: "error",
      });
      setTimeout(() => {
        setMessage({ message: "", type: "" });
      }, 3000);
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification message={message} />
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username:
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              name="Username"
            ></input>
          </div>
          <div>
            Password:
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              name="Password"
            ></input>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <Notification message={message} />
      <h2>blogs</h2>
      <div>
        You are logged in as {user.name}
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div style={{ marginTop: 20 }}>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
      <BlogForm
        onSubmit={handleCreateBlog}
        title={title}
        author={author}
        url={url}
      />
    </div>
  );
};

export default App;
