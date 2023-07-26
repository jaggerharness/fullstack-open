import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.attemptLogin({ username, password });
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      alert("Exception");
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
    </div>
  );
};

export default App;
