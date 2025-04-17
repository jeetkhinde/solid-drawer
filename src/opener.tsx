/** @format */

// // ~/opner.tsx

import { createSignal, Show } from 'solid-js';
import { ClientSelectorDrawer } from '~/components/ClientSelectorDrawer';
import { Client } from '~/types/types';
import { dummyClients } from '~/data/clients';
import { useDrawer } from '~/hooks/hooks';
import { useData } from './store/store';

const CLIENT_DRAWER_ID = 'main-client-drawer';

export default function Layout(props: { children: any }) {
  const [selectedClient, setSelectedClient] = createSignal<Client | null>(null);
  const [data, dataLength] = useData();
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
    <div class="bg-base-5 shadow-sm drawer z-50">
      <input
        id={CLIENT_DRAWER_ID}
        type="checkbox"
        class="drawer-toggle"
        checked={isClientDrawerOpen()}
        onChange={handleCheckboxChange}
      />
      <div class="drawer-content flex flex-col h-screen">
        <div class="navbar bg-base-100 shadow-sm">
          <div class="flex-1">
            {/* Using label as trigger */}
            <label
              for={CLIENT_DRAWER_ID} // Connects to checkbox
              class="btn btn-link text-xl no-underline font-bold normal-case opacity-70 text-black hover:opacity-100" // Style as needed
            >
              {selectedClient()?.name ?? 'Select Client'}
            </label>
          </div>
          {/* Other navbar content */}
        </div>
      </div>
      <div
        class={`drawer-side z-50 transition-transform duration-300 ease-in-out ${
          isClientDrawerOpen() ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <label
          for={CLIENT_DRAWER_ID}
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <ClientSelectorDrawer
          id={CLIENT_DRAWER_ID}
          isOpen={isClientDrawerOpen()}
          onClose={closeClientDrawer}
          onToggle={() => setIsClientDrawerOpen((prev) => !prev)}
          selectedClient={selectedClient()}
          setSelectedClient={handleClientSelect}
          allClients={data()}
        />
      </div>
    </div>
  );
}
