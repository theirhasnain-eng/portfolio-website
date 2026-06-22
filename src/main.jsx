import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Analytics } from "@vercel/analytics/react";  // add this

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Analytics />  {/* add this */}
  </StrictMode>
);