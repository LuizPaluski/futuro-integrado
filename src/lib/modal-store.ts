import { useSyncExternalStore } from "react";

type State = {
  open: boolean;
  initialCurso: string;
  exitOpen: boolean;
};

let listeners = new Set<() => void>();
let state: State = {
  open: false,
  initialCurso: "",
  exitOpen: false,
};

function notify() {
  listeners.forEach((l) => l());
}

export const modalStore = {
  getState: () => state,
  subscribe: (l: () => void) => {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
  openModal: (initialCurso = "") => {
    state = { ...state, open: true, initialCurso };
    notify();
  },
  closeModal: () => {
    state = { ...state, open: false };
    notify();
  },
  openExit: () => {
    state = { ...state, exitOpen: true };
    notify();
  },
  closeExit: () => {
    state = { ...state, exitOpen: false };
    notify();
  },
};

export function useModalStore() {
  return useSyncExternalStore(
    modalStore.subscribe,
    modalStore.getState,
    modalStore.getState,
  );
}
