import { useCallback, useSyncExternalStore } from "react";

const listeners = new Map<string, Set<() => void>>();

function subscribe(key: string, callback: () => void) {
  const subscriptions = listeners.get(key) ?? new Set<() => void>();
  subscriptions.add(callback);
  listeners.set(key, subscriptions);
  const onStorage = (event: StorageEvent) => { if (event.key === key) callback(); };
  window.addEventListener("storage", onStorage);
  return () => { subscriptions.delete(callback); window.removeEventListener("storage", onStorage); };
}

function read(key: string, activeValue: string) {
  return typeof window !== "undefined" && window.localStorage.getItem(key) === activeValue;
}

export function usePersistentBoolean(key: string, activeValue: string, inactiveValue: string): [boolean, (value: boolean) => void] {
  const subscribeToKey = useCallback((callback: () => void) => subscribe(key, callback), [key]);
  const getSnapshot = useCallback(() => read(key, activeValue), [key, activeValue]);
  const value = useSyncExternalStore(subscribeToKey, getSnapshot, () => false);
  const setValue = useCallback((next: boolean) => {
    window.localStorage.setItem(key, next ? activeValue : inactiveValue);
    listeners.get(key)?.forEach((callback) => callback());
  }, [key, activeValue, inactiveValue]);
  return [value, setValue];
}
