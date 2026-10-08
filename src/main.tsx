// ===== SESSION 6: the whole file, before today =========================
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router";      // <-- NEW
// import "./index.css";
// import App from "./App.tsx";
//
// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <BrowserRouter>                {/* <-- NEW */}
//       <App />
//     </BrowserRouter>               {/* <-- NEW */}
//   </StrictMode>,
// );
// ===== SESSION 7: QueryClient + provider + devtools added ==============
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import App from "./App.tsx";
 
// ONE client for the whole app. It owns the cache every useQuery reads.
const queryClient = new QueryClient({
  // Default is 3 retries: a failure takes ~7s to appear. 1 retry: ~1s.
  defaultOptions: { queries: { retry: 1 } },
});
 
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>     {/* <-- NEW */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} /> {/* <-- NEW */}
    </QueryClientProvider>                         {/* <-- NEW */}
  </StrictMode>,
);
