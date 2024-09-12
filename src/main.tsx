import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductListProvider } from "./context/ProductListContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={new QueryClient()}>
    <ChakraProvider>
      <ProductListProvider>
        <App />
      </ProductListProvider>
    </ChakraProvider>
  </QueryClientProvider>
);
