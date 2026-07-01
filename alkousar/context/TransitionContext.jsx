"use client";

import { createContext, useContext, useRef } from "react";

const TransitionContext = createContext();

export function TransitionProvider({ children }) {
  const overlayRef = useRef(null);

  return (
    <TransitionContext.Provider value={{ overlayRef }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  return useContext(TransitionContext);
}