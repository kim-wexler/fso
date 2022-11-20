import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateBlogs(state, action) {
      const response = action.payload;
      return state.map((element) =>
        element.id === response.id
          ? { ...response, user: element.user }
          : element
      );
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateRemovedBlogs(state, action) {
      return [...state].filter((blog) => blog.id !== action.payload.id);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { appendBlog, updateBlogs, updateRemovedBlogs, setBlogs } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const removeBlog = (content, user) => {
  return async (dispatch) => {
    const res = await blogService.remove(content.id, user.token);
    dispatch(updateRemovedBlogs(content));
  };
};

export const updateBlog = (content) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(content);
    dispatch(updateBlogs(updatedBlog.data));
  };
};

export const addBlog = (content, user) => {
  return async (dispatch) => {
    const blog = await blogService.create(content, user.token);
    dispatch(appendBlog(blog.data));
  };
};

export default blogSlice.reducer;
