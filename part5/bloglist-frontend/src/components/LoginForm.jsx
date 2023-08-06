import { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = (event) => {
    event.preventDefault();
    handleLogin({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={login}>
      <h2>Login</h2>
      <div>
        Username:
        <input
          id="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          name="Username"
        ></input>
      </div>
      <div>
        Password:
        <input
          id="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          name="Password"
        ></input>
      </div>
      <button id="loginBtn" type="submit">
        Login
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
