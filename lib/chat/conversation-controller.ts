import { EMPTY_CONVERSATION_STATE } from "@/lib/chat/constants";
import type { ChatMessage, ConversationState, PendingAction } from "@/lib/types/chat";

export function createConversationController(initialState: ConversationState = EMPTY_CONVERSATION_STATE) {
  let state: ConversationState = initialState;

  return {
    getState() {
      return state;
    },
    addUserMessage(message: ChatMessage) {
      state = { ...state, messages: [...state.messages, message] };
    },
    addAssistantMessage(message: ChatMessage) {
      state = { ...state, messages: [...state.messages, message] };
    },
    addAssistantPreview(action: PendingAction) {
      state = {
        ...state,
        pendingAction: action,
      };
    },
    clearPendingAction() {
      state = {
        ...state,
        pendingAction: null,
      };
    },
    setLoading(isLoading: boolean) {
      state = {
        ...state,
        isLoading,
      };
    },
  };
}
