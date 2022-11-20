import {
  setUsername,
  setPassword,
  loginFromDetails,
} from "../reducers/loginReducer";
import { useDispatch, useSelector } from "react-redux";

const LoginForm = ({ handleLogin }) => {
  const username = useSelector((state) => state.login.username);
  const password = useSelector((state) => state.login.password);
  const dispatch = useDispatch();
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => dispatch(setUsername(target.value))}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => dispatch(setPassword(target.value))}
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
