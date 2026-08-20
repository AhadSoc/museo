"use client";

import { createContext, useContext, useState } from "react";

interface AppReadyValue {
  isReady: boolean;
  markReady: () => void;
}

const AppReadyContext = createContext<AppReadyValue | null>(null);

export function AppReadyProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  return (
    <AppReadyContext.Provider value={{ isReady, markReady: () => setIsReady(true) }}>
      {children}
    </AppReadyContext.Provider>
  );
}

export function useAppReady() {
  const ctx = useContext(AppReadyContext);
  if (!ctx) throw new Error("useAppReady must be used within AppReadyProvider");
  return ctx;
}
