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

  it("shows suggested prompts and the account summary card", () => {
    render(<HomePage />);

    expect(screen.getByText(/everyday savings/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /what's my balance/i })).toBeInTheDocument();
  });
});
