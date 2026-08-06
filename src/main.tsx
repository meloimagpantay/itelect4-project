import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";      // <-- NEW
import "./index.css";
import App from "./App.tsx";
 
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>                {/* <-- NEW */}
      <App />
    </BrowserRouter>               {/* <-- NEW */}
  </StrictMode>,
);
