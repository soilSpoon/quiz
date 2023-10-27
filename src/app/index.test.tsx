import { render, screen } from "@testing-library/react";
import Home from "./page";
import RootLayout from "./layout";

describe("Home", () => {
  it("renders a heading", () => {
    const { container } = render(
      <RootLayout>
        <Home />
      </RootLayout>
    );

    // expect(container).toMatchSnapshot();
  });
});
