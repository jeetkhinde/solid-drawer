/** @format */

// // ~/opner.tsx

import { createSignal, Show } from "solid-js";
import { ClientSelectorDrawer } from "~/components/ClientSelectorDrawer";
import { Client } from "~/types/types";
import { dummyClients } from "~/data/clients";
import { useDrawer } from "~/hooks/hooks";

const CLIENT_DRAWER_ID = "main-client-drawer";

export default function OnlyBar() {
  const [selectedClient, setSelectedClient] = createSignal<Client | null>(null);

  const {
    isOpen: isClientDrawerOpen,
    setIsOpen: setIsClientDrawerOpen,
    openDrawer: openClientDrawer,
    closeDrawer: closeClientDrawer,
  } = useDrawer(true);

  const handleClientSelect = (client: Client | null) => {
    setSelectedClient(client);
    // closeClientDrawer(); // Closing is handled by ClientSelectorDrawer via onClose
  };

  const handleCheckboxChange = (event: Event) => {
    setIsClientDrawerOpen((event.target as HTMLInputElement).checked);
  };

  return (
        <ClientSelectorDrawer
          id={CLIENT_DRAWER_ID}
          isOpen={isClientDrawerOpen()}
          onClose={closeClientDrawer}
          onToggle={() => setIsClientDrawerOpen((prev) => !prev)}
          selectedClient={selectedClient()}
          setSelectedClient={handleClientSelect}
          allClients={dummyClients}
        />
      
  );
}