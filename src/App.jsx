import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <div className="App">
        <AppRoutes />
      </div>
    </QueryClientProvider>
  );
}

export default App;
