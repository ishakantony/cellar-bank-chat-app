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

  it("shows the personalized empty state and starter prompts", () => {
    render(<HomePage />);
    expect(screen.getByText(/good (morning|afternoon|evening), ishak/i)).toBeInTheDocument();
    expect(screen.queryByText(/everyday savings/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /what's my balance/i }),
    ).toBeInTheDocument();
  });
});
