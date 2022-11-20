import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../reducers/blogReducer";

const NewBlogForm = ({ user }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const createBlog = (event) => {
    event.preventDefault();
    const newBlog = { author, title, url };
    dispatch(addBlog(newBlog, user));
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={createBlog}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          id="blogTitle"
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          id="blogAuthor"
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          id="blogUrl"
        />
      </div>
      <button type="submit" id="submitNewBlog">
        submit
      </button>
    </form>
  );
};
export default NewBlogForm;
