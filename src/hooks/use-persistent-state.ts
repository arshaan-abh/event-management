import { useEffect, useState } from "react";

export const usePersistentState = <T>(key: string, initialData: T) => {
  const [value, setValue] = useState<T>(initialData);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // TODO this probably causes the production error
    if (typeof window === "undefined") return; // skip on server

    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        setValue(JSON.parse(stored) as T);
      } catch (error) {
        console.warn(`Failed to parse localStorage key "${key}":`, error);
      }
    }
    setHasMounted(true);
  }, [key]);

  useEffect(() => {
    if (!hasMounted) return; // only write after initial read
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(
        `Failed to store value in localStorage for key "${key}":`,
        error,
      );
    }
  }, [key, value, hasMounted]);

  return [value, setValue] as const;
};
