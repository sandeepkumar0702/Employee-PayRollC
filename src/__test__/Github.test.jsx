import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GitHub from "../Component/Login/Github";
import { FaGithub } from "react-icons/fa";

delete window.location;
window.location = { href: "" };

describe("GitHub Component", () => {
  test("renders GitHub login button", () => {
    render(<GitHub onSuccess={jest.fn()} onError={jest.fn()} />);
    expect(screen.getByText(/Login with GitHub/i)).toBeInTheDocument();
  });

  test("redirects to GitHub OAuth on button click", () => {
    render(<GitHub onSuccess={jest.fn()} onError={jest.fn()} />);
    const button = screen.getByRole("button", { name: /Login with GitHub/i });
    fireEvent.click(button);
    expect(window.location.href).toContain("https://github.com/login/oauth/authorize");
  });
});
