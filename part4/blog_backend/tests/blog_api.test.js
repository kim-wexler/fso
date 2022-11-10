const { initial } = require("lodash");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];

const initialUser = {
  username: "admin",
  name: "bob",
};

let token = null;
beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();

  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("secret", 10);
  const userObject = new User({
    username: "admin",
    name: "bob",
    passwordHash,
  });
  userObject.save();
  const dummyToken = { username: userObject.username, id: userObject.id };
  token = jwt.sign(dummyToken, process.env.SECRET);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

test("the first book is React patterns", async () => {
  const response = await api.get("/api/blogs");
  const contents = response.body.map((r) => r.title);
  expect(contents).toContain("React patterns");
});

test("unique identifier is named id", async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body;
  expect(blogs[0].id).toBeDefined();
});

test("can add a new blog post", async () => {
  const newBlog = {
    title: "new title",
    author: "author",
    url: "url",
    likes: 3,
  };
  await api
    .post("/api/blogs")
    .set("authorization", `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const titles = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(titles).toContain("new title");
});

test("blog without url is not added", async () => {
  const newBlog = {
    title: "new title",
    author: "author",
    likes: 3,
  };

  await api
    .post("/api/blogs")
    .set("authorization", `bearer ${token}`)
    .send(newBlog)
    .expect(400);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
}, 10000);

test("blog without likes defaults to 0", async () => {
  const newBlog = {
    title: "new title",
    author: "author",
    url: "url",
  };

  const res = await api
    .post("/api/blogs")
    .set("authorization", `bearer ${token}`)
    .send(newBlog)
    .expect(201);
  expect(res.body.likes).toBe(0);
});

test("can delete a blog post", async () => {
  const response = await api.get("/api/blogs");
  console.log(response.body[2])
  const url = `/api/blogs/${response.body[2].id}`;
  await api.delete(url).set("authorization", `bearer ${token}`).expect(204);
  const responseAfterDelete = await api.get("/api/blogs");
  expect(responseAfterDelete.body).toHaveLength(2);
});

test("can update a blog post", async () => {
  const response = await api.get("/api/blogs");
  const oldBlog = response.body[0];
  const url = `/api/blogs/${oldBlog.id}`;
  const newBlog = {
    ...oldBlog,
    likes: 25,
  };
  const updatedBlog = await api.put(url).send(newBlog).expect(200);
  expect(updatedBlog.body.likes).toBe(25);
});
