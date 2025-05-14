import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./font.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nProvider } from "./locales";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 0,
      retry: 1,
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
  serialize: (data) => JSON.stringify(data),
  deserialize: (data) => JSON.parse(data),
});
persistQueryClient({
  queryClient,
  persister: localStoragePersister,
  maxAge: 1000 * 60 * 60 * 2,
  dehydrateOptions: {
    shouldDehydrateQuery: (query) => {
      return query.meta?.persist === true;
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <App />
      </I18nProvider>
    </QueryClientProvider>
  </StrictMode>
);
