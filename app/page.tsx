import { ChatErrorBoundary } from "@/components/chat/chat-error-boundary";
import { ChatShell } from "@/components/chat/chat-shell";

export default function HomePage() {
  return (
    <ChatErrorBoundary>
      <ChatShell />
    </ChatErrorBoundary>
  );
}
