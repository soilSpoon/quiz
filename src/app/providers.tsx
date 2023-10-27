"use client";

import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import {
  PersistQueryClientProvider,
  persistQueryClientRestore,
} from "@tanstack/react-query-persist-client";
import { queryClient } from "./utils/query-client";

export const persister = createSyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
});

persistQueryClientRestore({
  queryClient,
  persister,
});

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
