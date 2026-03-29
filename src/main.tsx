import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

/* ===== CURSOR GLOW COMPONENT ===== */
const CursorGlow = () => {
  React.useEffect(() => {
    const cursor = document.createElement("div");
    cursor.className = "cursor";
    document.body.appendChild(cursor);

    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      cursor.remove();
    };
  }, []);

  return null;
};

/* ===== APP WRAPPER ===== */
const Root = () => {
  React.useEffect(() => {
    // Remove loader after React mounts
    const loader = document.getElementById("loader");
    if (loader) {
      setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";
      }, 500);
    }
  }, []);

  return (
    <>
      <CursorGlow />
      <App />
    </>
  );
};

/* ===== RENDER ===== */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);