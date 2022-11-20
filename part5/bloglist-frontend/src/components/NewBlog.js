import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBlog, removeBlog } from "../reducers/blogReducer";

const NewBlog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const handleLikeButton = (blog) => {
    // console.log(blog)
    const updatedBlog = {
      author: blog.author,
      title: blog.title,
      likes: blog.likes + 1,
      url: blog.url,
      id: blog.id,
    };
    // await blogService.update(blog.id, updatedBlog);
    // updateBlog(blog.id, updatedBlog);
    dispatch(updateBlog(updatedBlog));
  };

  const handleRemove = (blog) => {
    if (window.confirm(`Remove ${blog.title}?`)) dispatch(removeBlog(blog, user));
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!visible) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)} id="showButton">
          show
        </button>
      </div>
    );
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>hide</button>
        <ul>
          <li>
            {blog.likes}{" "}
            <button onClick={() => handleLikeButton(blog)} id="likeButton">
              like
            </button>
          </li>
          <li>{blog.url}</li>
        </ul>
        <button onClick={() => handleRemove(blog)}>remove</button>
      </div>
    );
  }
};

export default NewBlog;
