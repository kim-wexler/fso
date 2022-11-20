import { useSelector } from "react-redux";
import NewBlog from "./NewBlog";

const Blogs = ({ user }) => {
  const blogs = useSelector((state) =>
    [...state.blogs].sort((a, b) => b.likes - a.likes)
  );
  return (
    <div>
      {blogs.map((blog) => {
        if (blog.user.username === user.username) {
          return <NewBlog key={blog.id} blog={blog} user={user} />;
        }
      })}
    </div>
  );
};

export default Blogs;
