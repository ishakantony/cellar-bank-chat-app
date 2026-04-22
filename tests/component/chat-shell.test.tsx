// tests/component/chat-shell.test.tsx
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders the AI banking assistant heading", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: /ai banking assistant/i }),
    ).toBeInTheDocument();
  });
});
