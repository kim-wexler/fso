import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/newBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Blogs from "./components/Blogs";
import { initializeBlogs } from "./reducers/blogReducer";
import {
  tryLoginFromStorage,
  setUser,
  loginFromDetails,
} from "./reducers/loginReducer";
import { setNotification } from "./reducers/notificationReducer";

const App = () => {
  const username = useSelector((state) => state.login.username);
  const password = useSelector((state) => state.login.password);
  const notification = useSelector((state) => state.notification);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(tryLoginFromStorage());
  }, []);

  const user = useSelector((state) => state.login.user);

  const handleLogin = (event) => {
    event.preventDefault();
    // console.log("logging in with", username, password);
    dispatch(loginFromDetails(username, password));
  };

  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  } else {
    return (
      <div style={{ display: "" }}>
        <h1>blogs</h1>
        <Notification notification={notification} />
        <div>
          {user.username} is logged in{" "}
          <button
            onClick={() => {
              window.localStorage.removeItem("loggedBlogUser");
              dispatch(setUser(null));
              dispatch(setNotification("Good bye!"));
            }}
          >
            logout
          </button>
        </div>
        <h2>create new</h2>
        <Togglable buttonLabel="new blog">
          <NewBlogForm user={user} />
        </Togglable>
        <br></br>
        <Blogs user={user} />
      </div>
    );
  }
};

export default App;
