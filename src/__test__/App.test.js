import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Header Section", () => {
  it("should render title in heading level 1", () => {
    render(<App />);
    const h1Element = screen.getByRole("heading");
    expect(h1Element).toBeInTheDocument();
  });

  it("should render title as described", () => {
    render(<App />);
    const h1Element = screen.getByRole("heading");
    expect(h1Element.textContent).toBe("Sensors Management");
  });
});
