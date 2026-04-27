"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { error: Error | null };

export class ChatErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV !== "production") {
      console.error("ChatShell crashed:", error, info.componentStack);
    }
  }

  private handleRetry = () => {
    this.setState({ error: null });
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <main
        role="alert"
        className="fixed inset-0 z-10 mx-auto flex w-full max-w-[500px] flex-col items-center justify-center gap-4 bg-chat-base/95 px-6 text-center text-white"
      >
        <h2 className="text-xl font-semibold">Something went wrong.</h2>
        <p className="max-w-sm text-sm text-white/60">
          The chat hit an unexpected error and stopped. Try again — your session
          will reset.
        </p>
        <button
          type="button"
          onClick={this.handleRetry}
          className="rounded-full bg-chat-accent px-5 py-2 text-sm font-semibold text-chat-base shadow-[0_10px_28px_rgba(32,203,168,0.18)] transition-transform active:scale-95"
        >
          Try again
        </button>
      </main>
    );
  }
}
