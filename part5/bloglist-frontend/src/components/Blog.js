import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false);

  const handleLikeButton = (blog) => {
    // console.log(blog)
    const updatedBlog = {
      author: blog.author,
      title: blog.title,
      likes: blog.likes + 1,
      url: blog.url,
    };
    // await blogService.update(blog.id, updatedBlog);
    updateBlog(blog.id, updatedBlog);
  };

  const handleRemove = (blog) => {
    if (window.confirm(`Remove ${blog.title}?`)) removeBlog(blog.id);
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
        <button onClick={() => setVisible(!visible)} id="showButton">show</button>
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
            <button onClick={() => handleLikeButton(blog)} id="likeButton">like</button>
          </li>
          <li>{blog.url}</li>
        </ul>
        <button onClick={() => handleRemove(blog)}>remove</button>
      </div>
    );
  }
};

export default Blog;
