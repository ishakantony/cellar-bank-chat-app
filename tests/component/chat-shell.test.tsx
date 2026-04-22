import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

vi.mock("ai/react", () => ({
  useChat: () => ({
    messages: [],
    input: "",
    handleInputChange: () => {},
    handleSubmit: () => {},
    isLoading: false,
    append: () => {},
    setInput: () => {},
  }),
}));

describe("HomePage", () => {
  it("renders the Cellar Bank app header", () => {
    render(<HomePage />);
    expect(screen.getByText("Cellar Bank")).toBeInTheDocument();
  });

  it("shows suggested prompts and the account summary card", () => {
    render(<HomePage />);
    expect(screen.getByText(/everyday savings/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /what's my balance/i }),
    ).toBeInTheDocument();
  });
});
