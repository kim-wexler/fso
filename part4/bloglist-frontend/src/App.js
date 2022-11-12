import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/newBlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const notify = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    // console.log("logging in with", username, password);

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      notify("Wrong credentials");
    }
  };

  const handleNewBlog = async (event) => {
    event.preventDefault();
    const newBlog = { author, title, url };
    await blogService
      .create(newBlog, user.token)
      .then((retObj) => {
        setBlogs(blogs.concat(retObj.data));
      })
      .catch((error) => {
        notify(error.message, "error");
      });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    );
  } else {
    return (
      <div style={{display: ""}}>
        <h1>blogs</h1>
        <Notification notification={notification} />
        <div>
          {user.username} is logged in{" "}
          <button
            onClick={() => {
              window.localStorage.removeItem("loggedBlogUser");
              setUser(null);
            }}
          >
            logout
          </button>
        </div>
        <h2>create new</h2>
        <NewBlogForm
          handleNewBlog={handleNewBlog}
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
        />
        <br></br>
        {blogs.map((blog) => {
          if (blog.user.username === user.username) {
            return <Blog key={blog.id} blog={blog} />;
          }
        })}
      </div>
    );
  }
};

export default App;
