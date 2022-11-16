import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

// test("renders content", async () => {
//   const testBlog = {
//     author: "bob loblaw",
//     title: "best book",
//     url: "bobloblaw.com",
//     likes: 10,
//   };
//   render(<Blog blog={testBlog} />);
//   screen.debug();
//   const element = screen.getByText("best book");
//   expect(element).toBeDefined();
// });

test("does not render url by default", () => {
  const blog = {
    author: "bob loblaw",
    title: "best book",
    url: "bobloblaw.com",
    likes: 10,
  };

  render(<Blog blog={blog} />);

  const element = screen.queryByText("bobloblaw.com");
  expect(element).toBeNull();
});

test("clicking the button calls event handler once", async () => {
  const testBlog = {
    author: "bob loblaw",
    title: "best book",
    url: "bobloblaw.com",
    likes: 10,
  };

  const mockHandler = jest.fn();

  render(<Blog blog={testBlog} setVisible={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("show");
  await user.click(button);
  const element = screen.getByText("bobloblaw.com");
  expect(element).toBeDefined();
});

// test("clicking the button twice calls even handler twice", async () => {
//   const blog = {
//     author: "bob loblaw",
//     title: "best book",
//     url: "bobloblaw.com",
//     likes: 10,
//   };

//   const mockHandler = jest.fn();

//   render(
//     <Blog
//       blog={blog}
//       // setVisible={mockHandler}
//       handleLikeButton={mockHandler}
//     />
//   );

//   const viewButton = screen.getByText("show");
//   fireEvent.click(viewButton);
//   screen.debug();

//   const likeButton = screen.getByText("like");
//   fireEvent.click(likeButton);
//   fireEvent.click(likeButton);

//   expect(mockHandler.mock.calls).toHaveLength(2);
// });
