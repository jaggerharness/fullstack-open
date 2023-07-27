import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const savedUserDetails = window.localStorage.getItem("loggedInUser");
    if (savedUserDetails) {
      const user = JSON.parse(savedUserDetails);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.attemptLogin({ username, password });
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      alert("An unexpected error occurred, please try again.");
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
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {
      console.log(exception);
      alert("An unexpected error occurred, please try again.");
    }
  };

  if (user === null) {
    return (
      <div>
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
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
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
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default App;
