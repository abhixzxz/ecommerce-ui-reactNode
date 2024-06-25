import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import AppRoutes from "./routes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <AppRoutes />
      </div>
    </QueryClientProvider>
  );
}

export default App;
