/** @format */

// ~/components/ClientSelectorDrawer.tsx
import {
  Component,
  createMemo,
  Show,
  onMount,
  createEffect,
  createSignal,
} from 'solid-js';
import { createVirtualizer } from '@tanstack/solid-virtual';
import { Client, ClientSelectorDrawerProps } from '~/types/types';
import {
  DrawerHeader,
  SearchInput,
  LetterIndex,
  ClientListDisplay,
} from './ClientSelectorUI';

import { useDataSelectorState, useDrawer } from '~/hooks/hooks';
import { useData } from '~/store/store';

const CLIENT_DRAWER_ID = 'main-client-drawer';

export const ClientSelectorDrawer: Component<ClientSelectorDrawerProps> = (
  props
) => {
  const {
    searchTerm,
    setSearchTerm,
    selectedIndexLetter,
    setSelectedIndexLetter,
    filteredData,
    indexLetters,
  } = useDataSelectorState();

  const { isOpen: isClientDrawerOpen, closeDrawer: closeClientDrawer } =
    useDrawer(true);

  let scrollContainerRef: HTMLDivElement | undefined;
  let searchInputRef: HTMLInputElement | undefined;

  createEffect(() => {
    if (isClientDrawerOpen() && searchInputRef) {
      setTimeout(() => searchInputRef?.focus(), 50);
    } else if (!isClientDrawerOpen()) {
      setSearchTerm('');
      setSelectedIndexLetter(null);
    }
  });

  const rowVirtualizer = createVirtualizer({
    get count() {
      return filteredData().length;
    },
    getScrollElement: () => scrollContainerRef ?? null,
    estimateSize: (_index: number) => 36,
    overscan: 5,
  });

  const handleLetterClick = (letter: string | null) => {
    setSelectedIndexLetter(letter);
    setSearchTerm('');
    scrollContainerRef?.scrollTo({ top: 0 });
  };

  const handleSearchInput = (event: Event) => {
    const newSearchTerm = (event.target as HTMLInputElement).value;
    setSearchTerm(newSearchTerm);
    if (newSearchTerm.trim()) {
      setSelectedIndexLetter(null);
    }
  };

  const handleSearchFocus = () => setSelectedIndexLetter(null);

  const handleClientSelect = (client: Client) => {
    props.setSelectedClient(client);
  };

  return (
    <Show when={isClientDrawerOpen()}>
      {/* Outer container: Full height, vertical flex, handles overall boundaries */}
      <div class="bg-base-200 text-base-content h-screen w-80 flex flex-col overflow-hidden z-50">
        {/* Sticky Header: Takes its natural height, stays at top */}
        <div class="sticky top-0 z-10 p-4 flex flex-col gap-4 bg-base-200">
          <DrawerHeader title="Select Client" onClose={closeClientDrawer} />
          <SearchInput
            value={searchTerm()}
            placeholder="Search clients..."
            onInput={handleSearchInput}
            onFocus={handleSearchFocus}
            setRef={(el) => (searchInputRef = el)}
          />
        </div>

        {/* Middle Content Wrapper: Grows vertically, contains index + scrollable list */}
        {/* - flex-grow: Takes all available vertical space between header and footer.
      - min-h-0: Crucial for flex children containing scrollable/shrinking content.
      - flex: Lays out LetterIndex and List Container in a row (default flex direction).
      - gap-2: Space between LetterIndex and List Container.
      - overflow-hidden: Prevents this container itself from overflowing if children misbehave.
      - p-4: Apply horizontal/top padding here if desired around both elements, or keep specific padding below. Removed bottom padding (pb-4) to avoid double padding with the list area.
    */}
        <div class="flex-grow min-h-0 flex gap-2 overflow-hidden px-4 pt-4">
          {/* LetterIndex: Fixed width (implicitly), does not scroll itself */}
          {/* Add pt-4 if you want padding consistent with the scrollable list's top padding */}
          <div class="pt-4">
            {' '}
            {/* Optional wrapper for styling/padding */}
            <LetterIndex
              letters={indexLetters()}
              selectedLetter={selectedIndexLetter()}
              onLetterSelect={handleLetterClick}
            />
          </div>

          {/* List Scroll Container: Takes remaining horizontal space AND full available height */}
          {/* - flex-grow: Takes remaining horizontal space in the row.
        - h-full: Takes the full height of the parent (Middle Content Wrapper). Crucial for defining the scroll boundary.
        - overflow-y-auto: Enables vertical scrolling ONLY for the list.
        - overscroll-contain: Keeps scroll chaining behavior.
        - min-h-0: Good practice.
        - p-4: Padding *inside* the scrollable list area. Removed mb-2, footer handles gap now.
        - scrollContainerRef: Should be on the element that actually scrolls.
      */}
          <div
            ref={scrollContainerRef!}
            class="flex-grow h-full overflow-y-auto overscroll-contain min-h-0 p-4"
          >
            {/* ClientListDisplay component */}
            {/* Removed the extra inner div wrapper unless specifically needed */}
            <ClientListDisplay
              clients={filteredData()}
              onClientSelect={handleClientSelect}
              noResultsMessage={
                searchTerm()
                  ? `No results for "${searchTerm()}"`
                  : selectedIndexLetter()
                  ? `No clients found starting with "${selectedIndexLetter()}"`
                  : 'No clients match the current filters.'
              }
            />
          </div>
        </div>

        {/* Fixed Footer: Doesn't grow or shrink, fixed height */}
        {/* Add mt-2 here for gap *above* the footer if needed */}
        <div class="flex-shrink-0 h-10 bg-base-200 mt-2">
          {' '}
          {/* Added bg for consistency */}
          <div class="flex items-center justify-center h-full">
            <label class="cursor-pointer label">Footer Content</label>
          </div>
        </div>
      </div>
    </Show>
  );
};

export default function Sidebar() {
  const [selectedClient, setSelectedClient] = createSignal<Client | null>(null);
  const [data, dataLength] = useData(); // Updated to use useData() correctly
  const {
    isOpen: isClientDrawerOpen,
    setIsOpen: setIsClientDrawerOpen,
    closeDrawer: closeClientDrawer,
    openDrawer: openClientDrawer,
    toggleDrawer,
  } = useDrawer(true);

  const handleClientSelect = (client: Client | null) => {
    setSelectedClient(client);
  };

  const handleCheckboxChange = (event: Event) => {
    setIsClientDrawerOpen((event.target as HTMLInputElement).checked);
  };

  return (
    <ClientSelectorDrawer
      id={CLIENT_DRAWER_ID}
      isOpen={isClientDrawerOpen()}
      onClose={closeClientDrawer}
      onToggle={toggleDrawer}
      selectedClient={selectedClient()}
      setSelectedClient={handleClientSelect}
      allClients={data()} // Updated to use props.data() correctly
    />
  );
}
