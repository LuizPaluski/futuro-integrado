import { create } from "zustand";

type ModalState = {
  open: boolean;
  initialCurso: string;
  exitOpen: boolean;
  openModal: (initialCurso?: string) => void;
  closeModal: () => void;
  openExit: () => void;
  closeExit: () => void;
};

// Simples store global sem dependência externa
let listeners = new Set<() => void>();
let state = {
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
    return () => listeners.delete(l);
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

import { useSyncExternalStore } from "react";

export function useModalStore() {
  return useSyncExternalStore(
    modalStore.subscribe,
    modalStore.getState,
    modalStore.getState,
  );
}

// Helper export tipo (não usado, evita warning sobre create)
export type { ModalState };
// suppress unused
void create;
