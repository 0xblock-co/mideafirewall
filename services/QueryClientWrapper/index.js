import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export function useQueryClient() {
  return queryClient;
}

export function QueryClientWrapper({ children }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
