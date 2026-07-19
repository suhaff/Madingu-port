import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

/* ========================================
   CURSOR GLOW COMPONENT
======================================== */

const CursorGlow = () => {
  useEffect(() => {
    // Don't create the custom cursor on touch devices
    const supportsFinePointer = window.matchMedia(
      "(pointer: fine)"
    ).matches;

    if (!supportsFinePointer) {
      return;
    }

    // Create cursor element
    const cursor = document.createElement("div");
    cursor.className = "cursor";

    document.body.appendChild(cursor);

    // Update cursor position
    const handlePointerMove = (event: PointerEvent) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    };

    // Hide cursor when pointer leaves window
    const handlePointerLeave = () => {
      cursor.style.opacity = "0";
    };

    // Show cursor when pointer enters window
    const handlePointerEnter = () => {
      cursor.style.opacity = "1";
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove
    );

    document.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    document.addEventListener(
      "pointerenter",
      handlePointerEnter
    );

    // Cleanup
    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      document.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );

      document.removeEventListener(
        "pointerenter",
        handlePointerEnter
      );

      cursor.remove();
    };
  }, []);

  return null;
};


/* ========================================
   APP WRAPPER
======================================== */

const Root = () => {
  useEffect(() => {
    const loader = document.getElementById("loader");

    if (!loader) {
      return;
    }

    // Small delay so the transition feels smooth
    const timer = window.setTimeout(() => {
      loader.classList.add("hidden");

      // Remove loader completely after transition
      const removeTimer = window.setTimeout(() => {
        loader.remove();
      }, 500);

      return () => {
        window.clearTimeout(removeTimer);
      };
    }, 500);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <CursorGlow />
      <App />
    </>
  );
};


/* ========================================
   RENDER REACT APP
======================================== */

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    'Root element with id "root" was not found.'
  );
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);