import { render, screen } from "@testing-library/react";
import { MarkdownText } from "@/components/chat/markdown-text";

describe("MarkdownText", () => {
  it("renders plain text inside a paragraph", () => {
    render(<MarkdownText content="Hello world" />);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("renders bold text as strong", () => {
    render(<MarkdownText content="**bold text**" />);
    const strong = screen.getByText("bold text");
    expect(strong.tagName).toBe("STRONG");
  });

  it("renders italic text as em", () => {
    render(<MarkdownText content="*italic text*" />);
    const em = screen.getByText("italic text");
    expect(em.tagName).toBe("EM");
  });

  it("renders unordered lists", () => {
    render(<MarkdownText content={"- first\n- second"} />);
    expect(screen.getByText("first")).toBeInTheDocument();
    expect(screen.getByText("second")).toBeInTheDocument();
  });

  it("renders ordered lists", () => {
    render(<MarkdownText content={"1. first\n2. second"} />);
    expect(screen.getByText("first")).toBeInTheDocument();
    expect(screen.getByText("second")).toBeInTheDocument();
  });

  it("does not render headings as h1", () => {
    render(<MarkdownText content="# heading" />);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.getByText("heading")).toBeInTheDocument();
  });

  it("does not render code blocks", () => {
    render(<MarkdownText content={"```\ncode\n```"} />);
    expect(screen.queryByRole("code")).not.toBeInTheDocument();
  });

  it("handles multiple paragraphs", () => {
    render(<MarkdownText content={"Paragraph one\n\nParagraph two"} />);
    expect(screen.getByText("Paragraph one")).toBeInTheDocument();
    expect(screen.getByText("Paragraph two")).toBeInTheDocument();
  });
});
