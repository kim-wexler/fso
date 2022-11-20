import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/newBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log("from app: ", user.token);
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
      notify("Wrong credentials", "error");
    }
  };

  const addBlog_ = async (blog) => {
    await blogService
      .create(blog, user.token)
      .then((retObj) => {
        setBlogs(blogs.concat(retObj.data));
      })
      .catch((error) => {
        notify(error.message, "error");
      });
  };

  const removeBlog_ = async (id) => {
    const res = await blogService.remove(id, user.token);
    setBlogs(blogs.filter((blog) => blog.id !== id));
    return res;
  };

  const updateBlog = async (id, updatedBlog) => {
    const response = await blogService.update(id, updatedBlog);

    const blogToUpdate = response.data;
    setBlogs(
      blogs.map((blog) =>
        blog.id === blogToUpdate.id
          ? { ...blogToUpdate, user: blog.user }
          : blog
      )
    );
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
      <div style={{ display: "" }}>
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
        <Togglable buttonLabel="new blog">
          <NewBlogForm addBlog={addBlog_} />
        </Togglable>
        <br></br>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => {
            if (blog.user.username === user.username) {
              return (
                <div>
                  <Blog
                    key={blog.id}
                    blog={blog}
                    updateBlog={updateBlog}
                    removeBlog={removeBlog_}
                  />
                </div>
              );
            }
          })}
      </div>
    );
  }
};

export default App;
