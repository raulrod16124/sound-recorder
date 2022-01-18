import { render, screen } from "@testing-library/react";

import QR from ".";

describe("testing the QR component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = render(<QR />);
  });

  test("should render the QR component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should find the img role", () => {
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
