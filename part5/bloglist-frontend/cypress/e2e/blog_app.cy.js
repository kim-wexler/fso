describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
  });

  it("front page can be opened", function () {
    cy.visit("http://localhost:3000");
    cy.contains("username");
  });

  describe("login", function () {
    beforeEach(function () {
      const user = {
        name: "Test User",
        username: "Testing",
        password: "test",
      };
      cy.request("POST", "http://localhost:3001/api/users/", user);
      cy.visit("http://localhost:3000");
    });

    it("succeeds with correct credentials", function () {
      cy.get("#username").type("Testing");
      cy.get("#password").type("test");
      cy.get("#login-button").click();

      cy.contains("is logged in");
    });

    // it("fails with wrong credentials", function () {
    //   cy.get("#username").type("wrong");
    //   cy.get("#password").type("wrong");
    //   cy.get("#login-button").click();

    //   cy.contains("Wrong credentials");
    // });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      const user = {
        name: "Test User",
        username: "Testing",
        password: "test",
      };

      cy.request("POST", "http://localhost:3001/api/users/", user);
      cy.visit("http://localhost:3000");
      cy.get("#username").type("Testing");
      cy.get("#password").type("test");
      cy.get("#login-button").click();
    });

    it.only("A blog can be created", function () {
      cy.get("#toggleShowChildren").click();
      cy.get("#blogTitle").type("My test blog");
      cy.get("#blogAuthor").type("Test Author");
      cy.get("#blogUrl").type("www.testingblogs.com");
      cy.get("#submitNewBlog").click();

      cy.contains("test blog");

      cy.get("#showButton").click();
      cy.get("#likeButton").click();
      cy.contains("1");
    });
  });
});
