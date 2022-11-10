const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const bcrpyt = require("bcrypt");
const User = require("../models/user");

describe("correctly validates new users", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrpyt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("rejects duplicate username", async () => {
    const newUser = { username: "root", name: "new name", password: "mypw" };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("rejects password with less than 3 chars", async () => {
    const newUser = { username: "newuser", name: "new name", password: "pw" };
    const res = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(res.body.error).toBe("password must be atleast 3 characters");
  });
});
