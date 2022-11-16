const testingRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

testingRouter.get("/", async (request, response) => {
  response.send("<h1>Hello world</h1>");
});

testingRouter.post("/reset", async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

module.exports = testingRouter;
