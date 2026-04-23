import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SuggestedPrompts } from "@/components/chat/suggested-prompts";

describe("SuggestedPrompts", () => {
  const prompts = ["What's my balance?", "Show recent transactions", "Transfer money"];
  const onSelect = vi.fn();

  it("renders full-width buttons by default", () => {
    render(<SuggestedPrompts prompts={prompts} onSelect={onSelect} />);
    
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toHaveTextContent("What's my balance?");
    
    // Default variant should use flex-col container
    const container = buttons[0].parentElement;
    expect(container).toHaveClass("flex-col");
  });

  it("renders pill buttons when variant is pill", () => {
    render(<SuggestedPrompts prompts={prompts} onSelect={onSelect} variant="pill" />);
    
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
    
    // Pill variant should use flex-wrap container
    const container = buttons[0].parentElement;
    expect(container).toHaveClass("flex-wrap");
    
    // Pill buttons should have rounded-full class
    expect(buttons[0]).toHaveClass("rounded-full");
  });

  it("calls onSelect with the prompt text when clicked", async () => {
    const user = userEvent.setup();
    render(<SuggestedPrompts prompts={prompts} onSelect={onSelect} />);
    
    const button = screen.getByRole("button", { name: /what's my balance/i });
    await user.click(button);
    
    expect(onSelect).toHaveBeenCalledWith("What's my balance?");
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
