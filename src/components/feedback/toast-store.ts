import { useSyncExternalStore } from "react";

export type ToastVariant = "success" | "error" | "info";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

type Listener = () => void;

let toasts: Toast[] = [];
const listeners = new Set<Listener>();

function emit(): void {
  for (const listener of listeners) listener();
}

export const toastStore = {
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  getSnapshot(): Toast[] {
    return toasts;
  },

  push(toast: Omit<Toast, "id">): void {
    const id = crypto.randomUUID();
    toasts = [...toasts, { ...toast, id }];
    emit();

    setTimeout(() => {
      toasts = toasts.filter((item) => item.id !== id);
      emit();
    }, 4500);
  },

  dismiss(id: string): void {
    toasts = toasts.filter((item) => item.id !== id);
    emit();
  },
};

export const toast = {
  success: (title: string, description?: string) =>
    toastStore.push({ title, description, variant: "success" }),
  error: (title: string, description?: string) =>
    toastStore.push({ title, description, variant: "error" }),
  info: (title: string, description?: string) =>
    toastStore.push({ title, description, variant: "info" }),
};

export function useToasts(): Toast[] {
  return useSyncExternalStore(toastStore.subscribe, toastStore.getSnapshot, toastStore.getSnapshot);
}
