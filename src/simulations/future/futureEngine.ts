import {
  SLICES,
  THREADS,
  type SliceId,
  type ThreadId,
} from "./futureData";

export interface FutureState {
  /** Act II — which threads have their "what it means for you" revealed. */
  revealed: Record<ThreadId, boolean>;
  /** Act III — the slice of life selected (or null until the reader picks one). */
  slice: SliceId | null;
  /** Act III — whether the selected slice's forecast step is shown. */
  trajectoryShown: boolean;
  /** the optional personal reflection: which thread the reader would "bet on". */
  reflection: ThreadId | null;
  seq: number;
  note: string;
}

export type FutureAction =
  | { type: "REVEAL_THREAD"; thread: ThreadId }
  | { type: "SELECT_SLICE"; slice: SliceId }
  | { type: "SHOW_TRAJECTORY" }
  | { type: "REFLECT"; thread: ThreadId }
  | { type: "RESET" };

function threadLabel(id: ThreadId): string {
  return THREADS.find((t) => t.id === id)?.label ?? id;
}

export function createFutureState(): FutureState {
  return {
    revealed: { agentic: false, ondevice: false, multimodal: false },
    slice: null,
    trajectoryShown: false,
    reflection: null,
    seq: 0,
    note: "Three threads are already moving. Open each one to see where it points.",
  };
}

export function futureEngine(
  state: FutureState,
  action: FutureAction,
): FutureState {
  switch (action.type) {
    case "REVEAL_THREAD": {
      if (!THREADS.some((t) => t.id === action.thread)) return state;
      if (state.revealed[action.thread]) return state; // idempotent
      return {
        ...state,
        revealed: { ...state.revealed, [action.thread]: true },
        seq: state.seq + 1,
        note: `Thread: ${threadLabel(action.thread)} — open.`,
      };
    }
    case "SELECT_SLICE": {
      if (!SLICES.some((s) => s.id === action.slice)) return state;
      if (action.slice === state.slice) return state;
      return {
        ...state,
        slice: action.slice,
        trajectoryShown: false,
        seq: state.seq + 1,
        note: "Slice chosen. Read how you do it today — then follow the threads.",
      };
    }
    case "SHOW_TRAJECTORY": {
      if (!state.slice || state.trajectoryShown) return state;
      return {
        ...state,
        trajectoryShown: true,
        seq: state.seq + 1,
        note: "Forecast shown — an extrapolation of the threads, not a prediction.",
      };
    }
    case "REFLECT": {
      if (!THREADS.some((t) => t.id === action.thread)) return state;
      if (state.reflection === action.thread) return state; // idempotent
      return {
        ...state,
        reflection: action.thread,
        seq: state.seq + 1,
        note: `Noted — you'd bet on ${threadLabel(action.thread)} (your read, not a fact).`,
      };
    }
    case "RESET":
      return createFutureState();
    default:
      return state;
  }
}