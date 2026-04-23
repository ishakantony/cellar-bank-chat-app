import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SuggestedPrompts } from "@/components/chat/suggested-prompts";

describe("SuggestedPrompts", () => {
  it("renders full-width buttons by default", () => {
    render(
      <SuggestedPrompts
        prompts={["Prompt 1", "Prompt 2"]}
        onSelect={() => {}}
      />
    );
    expect(screen.getByRole("button", { name: "Prompt 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Prompt 2" })).toBeInTheDocument();
  });

  it("renders pill buttons when variant is pill", () => {
    render(
      <SuggestedPrompts
        prompts={["Prompt 1", "Prompt 2"]}
        onSelect={() => {}}
        variant="pill"
      />
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });

  it("calls onSelect with the prompt text when clicked", () => {
    const handleSelect = vi.fn();
    render(
      <SuggestedPrompts
        prompts={["Click me"]}
        onSelect={handleSelect}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "Click me" }));
    expect(handleSelect).toHaveBeenCalledWith("Click me");
  });
});
