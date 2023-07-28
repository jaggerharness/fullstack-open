const LoginForm = ({
    username,
    password,
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
  }) => {
    return (
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
          Username:
          <input
            type="text"
            value={username}
            onChange={({ target }) => handleUsernameChange(target.value)}
            name="Username"
          ></input>
        </div>
        <div>
          Password:
          <input
            type="password"
            value={password}
            onChange={({ target }) => handlePasswordChange(target.value)}
            name="Password"
          ></input>
        </div>
        <button type="submit">Login</button>
      </form>
    );
  };

  export default LoginForm;