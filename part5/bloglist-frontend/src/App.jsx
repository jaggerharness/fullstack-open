import { useState, useEffect } from "react";
import "./index.css";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const Notification = ({ message }) => {
  if (message.message === "") {
    return null;
  } else {
    if (message.type === "success") {
      return <div className="success">{message.message}</div>;
    }
    return <div className="error">{message.message}</div>;
  }
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState({ message: "", type: "" });

  const handleUserDetails = (user) => {
    blogService.setToken(user.token);
    setUser(user);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const savedUserDetails = window.localStorage.getItem("loggedInUser");
    if (savedUserDetails) {
      const user = JSON.parse(savedUserDetails);
      handleUserDetails(user);
    }
  }, []);

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
      <h2>Create New Blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          Title
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div>
          Author
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div>
          URL
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
        <button style={{ marginTop: 10 }} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
