"use client";

import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";

interface MarkdownTextProps {
  content: string;
}

export function MarkdownText({ content }: MarkdownTextProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [content]);

  if (hasError) {
    return <p className="whitespace-pre-wrap">{content}</p>;
  }

  return (
    <div className="markdown-text">
      <ReactMarkdown
        components={{
          p: ({ children }) => (
            <p className="mb-2 last:mb-0">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-white">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-neutral-300">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="mb-2 list-disc pl-4 last:mb-0">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-2 list-decimal pl-4 last:mb-0">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="mb-0.5">{children}</li>
          ),
        }}
        allowedElements={["p", "strong", "em", "ul", "ol", "li", "br"]}
        unwrapDisallowed={true}
        onError={() => setHasError(true)}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
