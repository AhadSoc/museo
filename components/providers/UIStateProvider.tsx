"use client";

import { createContext, useContext, useState } from "react";

interface UIStateValue {
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}

const UIStateContext = createContext<UIStateValue | null>(null);

export function UIStateProvider({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <UIStateContext.Provider value={{ searchOpen, setSearchOpen, menuOpen, setMenuOpen }}>
      {children}
    </UIStateContext.Provider>
  );
}

export function useUIState() {
  const ctx = useContext(UIStateContext);
  if (!ctx) throw new Error("useUIState must be used within UIStateProvider");
  return ctx;
}
