"use client";

import { forwardRef } from "react";

const TransitionOverlay = forwardRef(function TransitionOverlay(_, ref) {
  return (
    <div
      ref={ref}
      className="fixed inset-0 z-9999 hidden pointer-events-none"
    >
      <div className="flex h-screen">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="stair flex-1 bg-black"
          />
        ))}
      </div>
    </div>
  );
});

export default TransitionOverlay;